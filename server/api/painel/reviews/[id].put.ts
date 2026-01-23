import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localReviews } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { ownerResponse } = body

    if (!id) {
      throw createError({ statusCode: 400, message: 'id é obrigatório' })
    }

    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin
        .from('reviews')
        .update({
          owner_response: ownerResponse,
          responded_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw createError({ statusCode: 500, message: error.message })

      return { success: true, data }
    }

    // Local fallback
    const review = localReviews.get(id)
    if (!review) {
      throw createError({ statusCode: 404, message: 'Avaliação não encontrada' })
    }

    review.ownerResponse = ownerResponse
    review.respondedAt = new Date().toISOString()
    localReviews.set(id, review)

    return { success: true, data: review }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
