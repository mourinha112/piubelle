import { supabaseAdmin } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('plans')
      .select('*')
      .order('price_cents', { ascending: true })

    if (error) {
      console.error('Error fetching plans:', error)
      throw createError({ statusCode: 500, message: error.message })
    }

    return { success: true, data: data || [] }
  } catch (err: any) {
    console.error('plans.get error:', err)
    throw createError({ statusCode: err.statusCode || 500, message: err.message || 'Internal error' })
  }
})

