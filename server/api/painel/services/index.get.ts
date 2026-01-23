import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

// Local services storage
export const localServices = new Map<string, any>()

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const query = getQuery(event)
    const salonId = query.salonId as string
    const categoryId = query.categoryId as string

    if (!salonId) {
      throw createError({ statusCode: 400, message: 'salonId é obrigatório' })
    }

    if (isSupabaseConfigured()) {
      // Busca serviços sem join para evitar erro de categoria inexistente
      let queryBuilder = supabaseAdmin
        .from('services')
        .select('*')
        .eq('salon_id', salonId)
        .order('name', { ascending: true })

      if (categoryId) {
        queryBuilder = queryBuilder.eq('category_id', categoryId)
      }

      const { data, error } = await queryBuilder

      if (error) {
        console.error('Error fetching services:', error)
        throw createError({ statusCode: 500, message: error.message })
      }

      const services = (data || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        categoryId: s.category_id,
        price: parseFloat(s.price) || 0,
        duration: s.duration,
        icon: s.icon || 'lucide:sparkles',
        color: s.color || '#a855f7',
        isActive: s.is_active,
        isPopular: s.is_popular
      }))

      return {
        success: true,
        data: services,
        total: services.length
      }
    }

    // Local fallback
    let result = Array.from(localServices.values())
    result = result.filter(s => s.salonId === salonId)

    if (categoryId) {
      result = result.filter(s => s.categoryId === categoryId)
    }

    return {
      success: true,
      data: result,
      total: result.length
    }
  } catch (error: any) {
    console.error('Services GET error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
