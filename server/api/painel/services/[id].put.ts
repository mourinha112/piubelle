import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

const localServices = new Map<string, any>()

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
        message: 'ID do serviço é obrigatório'
      })
    }

    if (isSupabaseConfigured()) {
      // Build update object with only provided fields
      const updateData: any = {
        updated_at: new Date().toISOString()
      }

      if (body.name !== undefined) updateData.name = body.name
      if (body.description !== undefined) updateData.description = body.description
      if (body.price !== undefined) updateData.price = body.price
      if (body.duration !== undefined) updateData.duration = body.duration
      if (body.isActive !== undefined) updateData.is_active = body.isActive
      if (body.icon !== undefined) updateData.icon = body.icon
      if (body.color !== undefined) updateData.color = body.color
      if (body.categoryId !== undefined) updateData.category_id = body.categoryId || null

      const { data, error } = await supabaseAdmin
        .from('services')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Supabase error updating service:', error)
        throw createError({ statusCode: 500, message: error.message })
      }

      if (!data) {
        throw createError({ statusCode: 404, message: 'Serviço não encontrado' })
      }

      return {
        success: true,
        message: 'Serviço atualizado com sucesso!',
        data: {
          id: data.id,
          name: data.name,
          description: data.description,
          price: parseFloat(data.price) || 0,
          duration: data.duration,
          isActive: data.is_active,
          icon: data.icon || 'lucide:sparkles',
          color: data.color || '#a855f7',
          categoryId: data.category_id,
          updatedAt: data.updated_at
        }
      }
    }

    // Local fallback
    const service = localServices.get(id)

    if (!service) {
      throw createError({
        statusCode: 404,
        message: 'Serviço não encontrado'
      })
    }

    const updatedService = {
      ...service,
      ...body,
      id: service.id,
      salonId: service.salonId,
      updatedAt: new Date().toISOString()
    }

    localServices.set(id, updatedService)

    return {
      success: true,
      message: 'Serviço atualizado com sucesso!',
      data: updatedService
    }
  } catch (error: any) {
    console.error('Error updating service:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
