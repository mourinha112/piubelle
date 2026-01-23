import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localProfessionals } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { name, email, phone, role, isActive } = body

    if (!id) {
      throw createError({ statusCode: 400, message: 'id é obrigatório' })
    }

    if (isSupabaseConfigured()) {
      const updateData: any = { updated_at: new Date().toISOString() }
      if (name !== undefined) updateData.name = name
      if (email !== undefined) updateData.email = email
      if (phone !== undefined) updateData.phone = phone
      if (role !== undefined) updateData.bio = role // Using bio for role
      if (isActive !== undefined) updateData.is_active = isActive

      const { data, error } = await supabaseAdmin
        .from('professionals')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw createError({ statusCode: 500, message: error.message })

      return {
        success: true,
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.bio, // Return bio as role
          isActive: data.is_active,
          rating: data.rating
        }
      }
    }

    // Local fallback
    const professional = localProfessionals.get(id)
    if (!professional) {
      throw createError({ statusCode: 404, message: 'Profissional não encontrado' })
    }

    if (name !== undefined) professional.name = name
    if (email !== undefined) professional.email = email
    if (phone !== undefined) professional.phone = phone
    if (role !== undefined) professional.role = role
    if (isActive !== undefined) professional.isActive = isActive

    localProfessionals.set(id, professional)

    return { success: true, data: professional }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
