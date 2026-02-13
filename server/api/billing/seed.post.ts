import { supabaseAdmin } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    // Only for local/dev use: idempotent seed for plans
    const existing = await supabaseAdmin.from('plans').select('id').eq('key', 'free').limit(1)
    if (existing.error) throw existing.error
    if (existing.data && existing.data.length > 0) {
      return { success: true, message: 'Plan free already exists' }
    }

    const { data, error } = await supabaseAdmin.from('plans').insert([{
      key: 'free',
      name: 'Gratuito',
      price_cents: 0,
      currency: 'BRL',
      billing_interval: 'monthly',
      max_employees: 1,
      features: { description: 'Plano Gratuito - recursos básicos' }
    }]).select().single()

    if (error) throw error
    return { success: true, data }
  } catch (err: any) {
    console.error('seed.post error:', err)
    throw createError({ statusCode: 500, message: err.message || 'Seed failed' })
  }
})

