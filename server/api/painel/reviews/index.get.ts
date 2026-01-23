import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

// Local reviews storage
export const localReviews = new Map<string, any>()

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
        .from('reviews')
        .select(`
          id,
          rating,
          comment,
          owner_response,
          responded_at,
          created_at,
          client:clients(id, full_name),
          professional:professionals(id, name),
          service:services(id, name)
        `)
        .eq('salon_id', salonId)
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      if (error) throw createError({ statusCode: 500, message: error.message })

      const reviews = (data || []).map((r: any) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        ownerResponse: r.owner_response,
        respondedAt: r.responded_at,
        createdAt: r.created_at,
        clientId: r.client?.id,
        clientName: r.client?.full_name || 'Cliente',
        professionalId: r.professional?.id,
        professionalName: r.professional?.name,
        serviceId: r.service?.id,
        serviceName: r.service?.name
      }))

      return {
        success: true,
        data: reviews,
        total: reviews.length
      }
    }

    // Local fallback
    let result = Array.from(localReviews.values())
    result = result.filter(r => r.salonId === salonId)

    return {
      success: true,
      data: result,
      total: result.length
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
