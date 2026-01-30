import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

const localServices = new Map<string, any>()

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token de autenticação necessário' })
    }

    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID do serviço é obrigatório'
      })
    }

    if (isSupabaseConfigured()) {
      // First check if service exists
      const { data: existing, error: findError } = await supabaseAdmin
        .from('services')
        .select('id')
        .eq('id', id)
        .single()

      if (findError || !existing) {
        throw createError({ statusCode: 404, message: 'Serviço não encontrado' })
      }

      // Delete the service
      const { error } = await supabaseAdmin
        .from('services')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Supabase error deleting service:', error)
        throw createError({ statusCode: 500, message: error.message })
      }

      return {
        success: true,
        message: 'Serviço removido com sucesso!'
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

    localServices.delete(id)

    return {
      success: true,
      message: 'Serviço removido com sucesso!'
    }
  } catch (error: any) {
    console.error('Error deleting service:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
