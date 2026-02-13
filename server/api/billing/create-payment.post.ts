import { supabaseAdmin, isSupabaseConfigured } from '../../utils/supabase'

const ASAAS_BASE = 'https://www.asaas.com/api/v3'
const ASAAS_KEY = process.env.ASAAS_API_KEY || ''

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) throw createError({ statusCode: 401, message: 'Token necessário' })

    if (!isSupabaseConfigured() || !ASAAS_KEY) {
      throw createError({ statusCode: 503, message: 'Asaas não configurado. Defina ASAAS_API_KEY no .env' })
    }

    const body = await readBody(event)
    const { salonId, planKey, amount_cents } = body
    if (!salonId || !planKey || !amount_cents) throw createError({ statusCode: 400, message: 'salonId, planKey e amount_cents são obrigatórios' })

    // get or create customer
    const { data: salon } = await supabaseAdmin.from('salons').select('*').eq('id', salonId).single()
    if (!salon) throw createError({ statusCode: 404, message: 'Salão não encontrado' })

    let asaasCustomerId = salon.metadata?.asaas_customer_id
    if (!asaasCustomerId) {
      // Ensure we have a CPF or CNPJ for Asaas
      const document = salon.metadata?.document || salon.metadata?.cpf || salon.metadata?.cnpj || salon.cpf || salon.cnpj
      if (!document) {
        throw createError({ statusCode: 400, message: 'Asaas requer CPF ou CNPJ do cliente. Adicione CPF/CNPJ nas configurações do salão antes de gerar o PIX.' })
      }
      // create customer with document
      const custRes = await $fetch(`${ASAAS_BASE}/customers`, {
        method: 'POST',
        headers: { access_token: ASAAS_KEY, 'Content-Type': 'application/json' },
        body: {
          name: salon.name,
          email: salon.email || undefined,
          phone: salon.phone || undefined,
          cpfCnpj: document
        }
      })
      asaasCustomerId = custRes?.id
      // persist
      await supabaseAdmin.from('salons').update({ metadata: { ...(salon.metadata || {}), asaas_customer_id: asaasCustomerId, document } }).eq('id', salonId)
    }

    // Create payment (PIX)
    const value = (Number(amount_cents) / 100).toFixed(2)
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 1) // due tomorrow

    const paymentPayload: any = {
      customer: asaasCustomerId,
      billingType: 'PIX',
      dueDate: dueDate.toISOString().split('T')[0],
      value: value,
      description: `Pagamento assinatura ${planKey} - ${salon.name}`,
      externalReference: `salon_${salonId}_${Date.now()}`
    }

    try {
      const payRes: any = await $fetch(`${ASAAS_BASE}/payments`, {
        method: 'POST',
        headers: { access_token: ASAAS_KEY, 'Content-Type': 'application/json' },
        body: paymentPayload
      })

      // Attempt to fetch payment details (PIX QR) — Asaas may not include PIX fields immediately
      const paymentId = payRes?.id
      let details: any = payRes
      if (paymentId) {
        const maxAttempts = 4
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          try {
            details = await $fetch(`${ASAAS_BASE}/payments/${paymentId}`, {
              method: 'GET',
              headers: { access_token: ASAAS_KEY }
            })
            // If pixTransaction or pixQrCodeBase64 present, break early
            if (details?.pixTransaction || details?.pixQrCodeBase64 || details?.pixQrCode || details?.pixQrCodeImage) {
              break
            }
          } catch (e) {
            // ignore transient errors and retry
            console.warn('Asaas payment details fetch error (attempt ' + attempt + '):', e)
          }
          // small delay before retrying
          await new Promise(res => setTimeout(res, 800))
        }
      }

      // Return enriched payment info (including pix fields if present)
      return {
        success: true,
        data: details,
        invoiceUrl: details?.invoiceUrl || details?.bankSlipUrl || details?.invoice_url || null,
        pixString: details?.pixQrCode || details?.pixQrCodeString || null,
        pixBase64: details?.pixQrCodeBase64 || null,
        pixTransaction: details?.pixTransaction || null
      }
    } catch (err: any) {
      console.error('Asaas payment error:', err?.data ?? err?.response ?? err)
      const detail = err?.data || err?.response || err?.message || 'Erro desconhecido da Asaas'
      throw createError({ statusCode: err?.status || 502, message: `Asaas create payment failed: ${JSON.stringify(detail)}` })
    }
  } catch (err: any) {
    console.error('create-payment error:', err)
    throw createError({ statusCode: err.statusCode || 500, message: err.message || 'Erro ao criar pagamento' })
  }
})

