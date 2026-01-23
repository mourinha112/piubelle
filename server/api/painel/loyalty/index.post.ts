import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localLoyalty } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const body = await readBody(event)
    const { salonId, name, description, pointsRequired, rewardName, rewardValue, isActive } = body

    if (!salonId) {
      throw createError({ statusCode: 400, message: 'salonId é obrigatório' })
    }

    if (isSupabaseConfigured()) {
      // Check if program exists
      const { data: existing } = await supabaseAdmin
        .from('loyalty_programs')
        .select('id')
        .eq('salon_id', salonId)
        .single()

      const programData = {
        salon_id: salonId,
        name: name || 'Programa de Fidelidade',
        description: description || '',
        points_required: pointsRequired || 10,
        reward_name: rewardName || 'Serviço Grátis',
        reward_value: rewardValue || 0,
        is_active: isActive !== false,
        updated_at: new Date().toISOString()
      }

      let result
      if (existing) {
        const { data, error } = await supabaseAdmin
          .from('loyalty_programs')
          .update(programData)
          .eq('id', existing.id)
          .select()
          .single()

        if (error) throw createError({ statusCode: 500, message: error.message })
        result = data
      } else {
        const { data, error } = await supabaseAdmin
          .from('loyalty_programs')
          .insert(programData)
          .select()
          .single()

        if (error) throw createError({ statusCode: 500, message: error.message })
        result = data
      }

      return {
        success: true,
        data: {
          isActive: result.is_active,
          name: result.name,
          description: result.description,
          pointsRequired: result.points_required,
          rewardName: result.reward_name,
          rewardValue: parseFloat(result.reward_value) || 0
        }
      }
    }

    // Local fallback
    const program = {
      isActive: isActive !== false,
      name: name || 'Programa de Fidelidade',
      description: description || '',
      pointsRequired: pointsRequired || 10,
      rewardName: rewardName || 'Serviço Grátis',
      rewardValue: rewardValue || 0
    }

    localLoyalty.set(salonId, { program })

    return { success: true, data: program }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
