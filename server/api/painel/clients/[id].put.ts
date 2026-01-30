import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localClients } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token de autenticação necessário' })
    }

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID do cliente é obrigatório'
      })
    }

    if (isSupabaseConfigured()) {
      // Build update object with only provided fields
      const updateData: any = {
        updated_at: new Date().toISOString()
      }

      if (body.name !== undefined) updateData.full_name = body.name
      if (body.phone !== undefined) updateData.phone = body.phone
      if (body.email !== undefined) updateData.email = body.email
      if (body.birthDate !== undefined) updateData.birth_date = body.birthDate || null
      if (body.gender !== undefined) updateData.gender = body.gender || null
      if (body.notes !== undefined) updateData.notes = body.notes || null
      if (body.isVip !== undefined) updateData.is_vip = body.isVip

      const { data, error } = await supabaseAdmin
        .from('clients')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Supabase error updating client:', error)
        throw createError({ statusCode: 500, message: error.message })
      }

      if (!data) {
        throw createError({ statusCode: 404, message: 'Cliente não encontrado' })
      }

      return {
        success: true,
        message: 'Cliente atualizado com sucesso!',
        data: {
          id: data.id,
          name: data.full_name,
          phone: data.phone,
          email: data.email,
          birthDate: data.birth_date,
          gender: data.gender,
          notes: data.notes,
          isVip: data.is_vip,
          visitCount: data.visit_count || 0,
          totalSpent: parseFloat(data.total_spent) || 0,
          lastVisit: data.last_visit,
          updatedAt: data.updated_at
        }
      }
    }

    // Local fallback
    const client = localClients.get(id)

    if (!client) {
      throw createError({
        statusCode: 404,
        message: 'Cliente não encontrado'
      })
    }

    const updatedClient = {
      ...client,
      ...body,
      id: client.id,
      salonId: client.salonId,
      updatedAt: new Date().toISOString()
    }

    localClients.set(id, updatedClient)

    return {
      success: true,
      message: 'Cliente atualizado com sucesso!',
      data: updatedClient
    }
  } catch (error: any) {
    console.error('Error updating client:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
