import { supabaseAdmin } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const salonId = query.salonId as string
    if (!salonId) throw createError({ statusCode: 400, message: 'salonId é necessário' })

    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .select('*, plans(*)')
      .eq('salon_id', salonId)
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) {
      console.error('subscription.get error:', error)
      throw createError({ statusCode: 500, message: error.message })
    }

    return { success: true, data: data?.[0] ?? null }
  } catch (err: any) {
    console.error('subscription.get exception:', err)
    throw createError({ statusCode: err.statusCode || 500, message: err.message || 'Internal error' })
  }
})

