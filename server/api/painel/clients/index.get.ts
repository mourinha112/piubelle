import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

// Local clients storage
export const localClients = new Map<string, any>()

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const query = getQuery(event)
    const salonId = query.salonId as string
    const search = query.search as string

    if (!salonId) {
      throw createError({ statusCode: 400, message: 'salonId é obrigatório' })
    }

    if (isSupabaseConfigured()) {
      let queryBuilder = supabaseAdmin
        .from('clients')
        .select('*')
        .eq('salon_id', salonId)
        .order('created_at', { ascending: false })

      if (search) {
        queryBuilder = queryBuilder.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`)
      }

      const { data, error } = await queryBuilder

      if (error) throw createError({ statusCode: 500, message: error.message })

      const clients = (data || []).map((c: any) => ({
        id: c.id,
        name: c.full_name,
        phone: c.phone,
        email: c.email,
        birthDate: c.birth_date,
        gender: c.gender,
        notes: c.notes,
        isVip: c.is_vip,
        visitCount: c.visit_count || 0,
        totalSpent: parseFloat(c.total_spent) || 0,
        lastVisit: c.last_visit,
        createdAt: c.created_at
      }))

      return {
        success: true,
        data: clients,
        total: clients.length
      }
    }

    // Local fallback
    let result = Array.from(localClients.values())
    result = result.filter(c => c.salonId === salonId)

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(c =>
        c.name?.toLowerCase().includes(searchLower) ||
        c.phone?.includes(search) ||
        c.email?.toLowerCase().includes(searchLower)
      )
    }

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
