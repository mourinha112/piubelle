import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localQueue } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({ statusCode: 400, message: 'id é obrigatório' })
    }

    if (isSupabaseConfigured()) {
      const { error } = await supabaseAdmin
        .from('queue')
        .delete()
        .eq('id', id)

      if (error) throw createError({ statusCode: 500, message: error.message })

      return { success: true }
    }

    // Local fallback
    if (!localQueue.has(id)) {
      throw createError({ statusCode: 404, message: 'Item não encontrado' })
    }

    localQueue.delete(id)

    return { success: true }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno'
    })
  }
})
