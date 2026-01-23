import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

// Local queue storage
export const localQueue = new Map<string, any>()

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

    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin
        .from('queue')
        .select(`
          id,
          client_name,
          client_phone,
          status,
          position,
          created_at,
          called_at,
          started_at,
          service:services(name),
          professional:professionals(name)
        `)
        .eq('salon_id', salonId)
        .in('status', ['waiting', 'called', 'in_service'])
        .order('position', { ascending: true })

      if (error) throw createError({ statusCode: 500, message: error.message })

      const queueItems = (data || []).map((item: any) => {
        const enteredAt = new Date(item.created_at)
        const now = new Date()
        const waitMinutes = Math.round((now.getTime() - enteredAt.getTime()) / 60000)

        return {
          id: item.id,
          clientName: item.client_name,
          phone: item.client_phone,
          serviceName: item.service?.name || null,
          professionalName: item.professional?.name || null,
          status: item.status,
          enteredAt: item.created_at,
          waitTime: `${waitMinutes} min`
        }
      })

      return { success: true, data: queueItems }
    }

    // Local fallback
    const queueItems: any[] = []
    localQueue.forEach((item, id) => {
      if (item.salonId === salonId && ['waiting', 'called', 'in_service'].includes(item.status)) {
        const enteredAt = new Date(item.enteredAt)
        const now = new Date()
        const waitMinutes = Math.round((now.getTime() - enteredAt.getTime()) / 60000)
        queueItems.push({
          ...item,
          waitTime: `${waitMinutes} min`
        })
      }
    })

    // Sort by entered_at
    queueItems.sort((a, b) => new Date(a.enteredAt).getTime() - new Date(b.enteredAt).getTime())

    return { success: true, data: queueItems }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno'
    })
  }
})
