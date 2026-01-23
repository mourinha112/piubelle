import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localQueue } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { status } = body

    if (!id || !status) {
      throw createError({ statusCode: 400, message: 'id e status são obrigatórios' })
    }

    const updateData: any = { status }
    
    if (status === 'called') {
      updateData.called_at = new Date().toISOString()
    } else if (status === 'in_service') {
      updateData.started_at = new Date().toISOString()
    } else if (status === 'completed') {
      updateData.completed_at = new Date().toISOString()
    }

    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin
        .from('queue')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw createError({ statusCode: 500, message: error.message })

      return { success: true, data }
    }

    // Local fallback
    const item = localQueue.get(id)
    if (!item) {
      throw createError({ statusCode: 404, message: 'Item não encontrado' })
    }

    item.status = status
    if (status === 'called') item.calledAt = new Date().toISOString()
    if (status === 'in_service') item.startedAt = new Date().toISOString()
    if (status === 'completed') item.completedAt = new Date().toISOString()

    localQueue.set(id, item)

    return { success: true, data: item }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno'
    })
  }
})
