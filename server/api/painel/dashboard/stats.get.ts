import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const query = getQuery(event)
    const salonId = query.salonId as string

    if (!salonId) {
      throw createError({ statusCode: 400, message: 'salonId é obrigatório' })
    }

    const today = new Date().toISOString().split('T')[0]

    if (isSupabaseConfigured()) {
      // Fetch today's appointments count
      const { data: todayAppointments, error: aptError } = await supabaseAdmin
        .from('appointments')
        .select('id, status, final_price')
        .eq('salon_id', salonId)
        .eq('date', today)

      // Fetch queue count
      const { data: queueData, error: queueError } = await supabaseAdmin
        .from('queue')
        .select('id')
        .eq('salon_id', salonId)
        .in('status', ['waiting', 'called', 'in_service'])

      // Fetch salon rating
      const { data: salonData, error: salonError } = await supabaseAdmin
        .from('salons')
        .select('rating')
        .eq('id', salonId)
        .single()

      // Calculate today's revenue
      const todayRevenue = (todayAppointments || [])
        .filter((a: any) => a.status === 'completed')
        .reduce((sum: number, a: any) => sum + (parseFloat(a.final_price) || 0), 0)

      return {
        success: true,
        data: {
          todayAppointments: (todayAppointments || []).length,
          todayRevenue,
          queueCount: (queueData || []).length,
          rating: salonData?.rating || 0
        }
      }
    }

    // Local fallback - return empty stats for non-mockup salons
    return {
      success: true,
      data: {
        todayAppointments: 0,
        todayRevenue: 0,
        queueCount: 0,
        rating: 0
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
