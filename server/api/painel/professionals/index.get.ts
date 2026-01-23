import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

// Local professionals storage
export const localProfessionals = new Map<string, any>()

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
        .from('professionals')
        .select('*')
        .eq('salon_id', salonId)
        .eq('is_active', true)
        .order('name', { ascending: true })

      if (error) throw createError({ statusCode: 500, message: error.message })

      const professionals = (data || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        email: p.email,
        phone: p.phone,
        photo: p.avatar_url,
        role: p.bio, // Using bio as role
        specialties: p.specialties,
        isActive: p.is_active,
        rating: p.rating,
        createdAt: p.created_at
      }))

      return {
        success: true,
        data: professionals,
        total: professionals.length
      }
    }

    // Local fallback
    let result = Array.from(localProfessionals.values())
    result = result.filter(p => p.salonId === salonId)

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
