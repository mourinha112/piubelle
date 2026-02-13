import { supabaseAdmin, isSupabaseConfigured } from '../../utils/supabase'

const ASAAS_BASE = 'https://www.asaas.com/api/v3'
const ASAAS_KEY = process.env.ASAAS_API_KEY || ''

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) throw createError({ statusCode: 401, message: 'Token necessário' })

    const body = await readBody(event)
    const { salonId, planKey } = body
    if (!salonId || !planKey) throw createError({ statusCode: 400, message: 'salonId e planKey são obrigatórios' })

    // fetch plan
    const { data: plans } = await supabaseAdmin.from('plans').select('*').eq('key', planKey).limit(1)
    const plan = plans?.[0]
    if (!plan) throw createError({ statusCode: 404, message: 'Plano não encontrado' })

    // create subscription record (trial or active if purchaseNow)
    const purchaseNow = !!body.purchaseNow
    let subPayload: any = {
      salon_id: salonId,
      plan_id: plan.id,
      status: purchaseNow ? 'active' : 'trialing'
    }
    if (!purchaseNow) {
      const trialEnd = new Date()
      trialEnd.setDate(trialEnd.getDate() + 14)
      subPayload.trial_end = trialEnd.toISOString()
    }

    const { data: subData, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .insert([subPayload])
      .select()
      .single()

    if (subError) {
      console.error('Error creating subscription record:', subError)
      throw createError({ statusCode: 500, message: subError.message })
    }

    // If Asaas configured, attempt to create customer + subscription (best-effort)
    if (isSupabaseConfigured() && ASAAS_KEY) {
      try {
        // fetch salon data
        const { data: salon } = await supabaseAdmin.from('salons').select('*').eq('id', salonId).single()
        if (salon) {
          // create customer in Asaas
          const custRes = await $fetch(`${ASAAS_BASE}/customers`, {
            method: 'POST',
            headers: { access_token: ASAAS_KEY, 'Content-Type': 'application/json' },
            body: {
              name: salon.name,
              email: salon.email || undefined,
              phone: salon.phone || undefined
            }
          }).catch(e => { throw e })

          const asaasCustomerId = custRes?.id
          // create subscription in Asaas (if supported). Here we attempt a generic creation of a recurring charge
          const subscriptionPayload = {
            customer: asaasCustomerId,
            billingType: 'CREDIT_CARD', // default, client must supply payment method later
            description: `Assinatura ${plan.key}`,
            // value in local currency and format depends on Asaas API (best-effort)
            value: (plan.price_cents / 100).toFixed(2)
          }

          const subRes = await $fetch(`${ASAAS_BASE}/subscriptions`, {
            method: 'POST',
            headers: { access_token: ASAAS_KEY, 'Content-Type': 'application/json' },
            body: subscriptionPayload
          }).catch(e => { throw e })

          // update subscription record with provider id
          await supabaseAdmin
            .from('subscriptions')
            .update({ provider_subscription_id: subRes?.id, status: subRes?.status || 'active' })
            .eq('id', subData.id)
        }
      } catch (err) {
        console.error('Warning: Asaas integration failed (non-blocking):', err)
        // continue return subscription created locally
      }
    }

    return { success: true, data: subData }
  } catch (err: any) {
    console.error('subscribe.post error:', err)
    throw createError({ statusCode: err.statusCode || 500, message: err.message || 'Internal error' })
  }
})

