import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localClients } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const body = await readBody(event)
    const { salonId, name, phone, email, birthDate, gender, notes, isVip } = body

    if (!salonId || !name) {
      throw createError({ statusCode: 400, message: 'salonId e name são obrigatórios' })
    }

    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin
        .from('clients')
        .insert({
          salon_id: salonId,
          full_name: name,
          phone: phone || null,
          email: email || null,
          birth_date: birthDate || null,
          gender: gender || null,
          notes: notes || null,
          is_vip: isVip || false,
          visit_count: 0,
          total_spent: 0
        })
        .select()
        .single()

      if (error) throw createError({ statusCode: 500, message: error.message })

      return {
        success: true,
        data: {
          id: data.id,
          name: data.full_name,
          phone: data.phone,
          email: data.email,
          birthDate: data.birth_date,
          gender: data.gender,
          notes: data.notes,
          isVip: data.is_vip,
          visitCount: 0,
          totalSpent: 0,
          createdAt: data.created_at
        }
      }
    }

    // Local fallback
    const id = `client-${Date.now()}`
    const newClient = {
      id,
      salonId,
      name,
      phone,
      email,
      birthDate,
      gender,
      notes,
      isVip: isVip || false,
      visitCount: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString()
    }

    localClients.set(id, newClient)

    return { success: true, data: newClient }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
