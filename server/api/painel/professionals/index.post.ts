import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localProfessionals } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const body = await readBody(event)
    const { salonId, name, email, phone, role, isActive } = body

    if (!salonId || !name) {
      throw createError({ statusCode: 400, message: 'salonId e name são obrigatórios' })
    }

    if (isSupabaseConfigured()) {
      // Verify subscription and plan limits
      const { data: subs } = await supabaseAdmin
        .from('subscriptions')
        .select('*, plans(*)')
        .eq('salon_id', salonId)
        .order('created_at', { ascending: false })
        .limit(1)

      const subscription = subs?.[0] || null
      if (!subscription) {
        throw createError({ statusCode: 403, message: 'Sem plano ativo. Escolha um plano em /painel/plans para liberar funcionalidades.' })
      }

      const plan = subscription.plans || subscription.plan || null
      const maxEmployees = (plan?.max_employees ?? 0) + (subscription.extra_employees ?? 0)

      // Count active professionals
      const { count: profCount } = await supabaseAdmin
        .from('professionals')
        .select('id', { count: 'exact', head: true })
        .eq('salon_id', salonId)
        .eq('is_active', true)

      const currentCount = Number(profCount || 0)
      if (currentCount >= maxEmployees) {
        throw createError({
          statusCode: 403,
          message: `Limite de funcionários atingido para seu plano (limite: ${maxEmployees}). Faça upgrade ou compre add-on para liberar mais.` 
        })
      }

      const { data, error } = await supabaseAdmin
        .from('professionals')
        .insert({
          salon_id: salonId,
          name,
          email: email || null,
          phone: phone || null,
          bio: role || null, // Using bio field to store role/function
          is_active: isActive !== false,
          rating: 0,
          review_count: 0
        })
        .select()
        .single()

      if (error) {
        console.error('Supabase error creating professional:', error)
        throw createError({ statusCode: 500, message: error.message })
      }

      return {
        success: true,
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.bio, // Return bio as role
          isActive: data.is_active,
          rating: data.rating,
          createdAt: data.created_at
        }
      }
    }

    // Local fallback
    const id = `pro-${Date.now()}`
    const newProfessional = {
      id,
      salonId,
      name,
      email,
      phone,
      role,
      isActive: isActive !== false,
      rating: 0,
      createdAt: new Date().toISOString()
    }

    localProfessionals.set(id, newProfessional)

    return { success: true, data: newProfessional }
  } catch (error: any) {
    console.error('Error creating professional:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
