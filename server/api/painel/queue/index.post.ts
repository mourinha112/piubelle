import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localQueue } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const body = await readBody(event)
    const { salonId, clientName, phone, serviceName, professionalName } = body

    if (!salonId || !clientName) {
      throw createError({ statusCode: 400, message: 'salonId e clientName são obrigatórios' })
    }

    if (isSupabaseConfigured()) {
      // Get next position
      const { data: lastItem } = await supabaseAdmin
        .from('queue')
        .select('position')
        .eq('salon_id', salonId)
        .order('position', { ascending: false })
        .limit(1)
        .single()

      const nextPosition = (lastItem?.position || 0) + 1

      const { data, error } = await supabaseAdmin
        .from('queue')
        .insert({
          salon_id: salonId,
          client_name: clientName,
          client_phone: phone || null,
          position: nextPosition,
          status: 'waiting'
        })
        .select()
        .single()

      if (error) throw createError({ statusCode: 500, message: error.message })

      return {
        success: true,
        data: {
          id: data.id,
          clientName: data.client_name,
          phone: data.client_phone,
          serviceName: serviceName || null,
          professionalName: professionalName || null,
          status: data.status,
          enteredAt: data.created_at,
          waitTime: '0 min'
        }
      }
    }

    // Local fallback
    const id = `queue-${Date.now()}`
    const newItem = {
      id,
      salonId,
      clientName,
      phone,
      serviceName,
      professionalName,
      status: 'waiting',
      enteredAt: new Date().toISOString()
    }

    localQueue.set(id, newItem)

    return {
      success: true,
      data: {
        ...newItem,
        waitTime: '0 min'
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno'
    })
  }
})
