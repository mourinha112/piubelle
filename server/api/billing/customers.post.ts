import { supabaseAdmin, isSupabaseConfigured } from '../../utils/supabase'

const ASAAS_BASE = 'https://www.asaas.com/api/v3'
const ASAAS_KEY = process.env.ASAAS_API_KEY || ''

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) throw createError({ statusCode: 401, message: 'Token necessário' })

    const body = await readBody(event)
    const { salonId } = body
    if (!salonId) throw createError({ statusCode: 400, message: 'salonId é obrigatório' })

    const { data: salon } = await supabaseAdmin.from('salons').select('*').eq('id', salonId).single()
    if (!salon) throw createError({ statusCode: 404, message: 'Salão não encontrado' })

    if (!isSupabaseConfigured() || !ASAAS_KEY) {
      throw createError({ statusCode: 503, message: 'Asaas não configurado. Defina ASAAS_API_KEY no .env' })
    }

    // create customer at Asaas
    const custRes = await $fetch(`${ASAAS_BASE}/customers`, {
      method: 'POST',
      headers: { access_token: ASAAS_KEY, 'Content-Type': 'application/json' },
      body: {
        name: salon.name,
        email: salon.email || undefined,
        phone: salon.phone || undefined
      }
    })

    // store provider customer id in salons table metadata (logo_url used for other purposes)
    await supabaseAdmin.from('salons').update({ metadata: { ...(salon.metadata || {}), asaas_customer_id: custRes.id } }).eq('id', salonId)

    return { success: true, data: custRes }
  } catch (err: any) {
    console.error('customers.post error:', err)
    throw createError({ statusCode: err.statusCode || 500, message: err.message || 'Internal error' })
  }
})

