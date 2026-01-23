import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

// Local loyalty storage
export const localLoyalty = new Map<string, any>()

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const query = getQuery(event)
    const salonId = query.salonId as string

    if (!salonId) {
      throw createError({ statusCode: 400, message: 'salonId é obrigatório' })
    }

    if (isSupabaseConfigured()) {
      // Get loyalty program
      const { data: program, error: programError } = await supabaseAdmin
        .from('loyalty_programs')
        .select('*')
        .eq('salon_id', salonId)
        .single()

      // Get top clients by visit count
      const { data: topClients, error: clientsError } = await supabaseAdmin
        .from('clients')
        .select('id, full_name, visit_count, loyalty_points')
        .eq('salon_id', salonId)
        .order('loyalty_points', { ascending: false })
        .limit(5)

      // Calculate stats
      const { data: allClients } = await supabaseAdmin
        .from('clients')
        .select('loyalty_points')
        .eq('salon_id', salonId)
        .gt('loyalty_points', 0)

      const participants = (allClients || []).length
      const totalPoints = (allClients || []).reduce((sum: number, c: any) => sum + (c.loyalty_points || 0), 0)

      return {
        success: true,
        data: {
          program: program ? {
            isActive: program.is_active,
            name: program.name,
            description: program.description,
            pointsRequired: program.points_required,
            rewardName: program.reward_name,
            rewardValue: parseFloat(program.reward_value) || 0
          } : null,
          stats: {
            participants,
            totalPoints,
            rewardsRedeemed: 0,
            closeToReward: 0
          },
          topClients: (topClients || []).map((c: any) => ({
            id: c.id,
            name: c.full_name,
            visits: c.visit_count || 0,
            points: c.loyalty_points || 0,
            rewards: 0
          }))
        }
      }
    }

    // Local fallback
    const loyalty = localLoyalty.get(salonId)
    
    return {
      success: true,
      data: {
        program: loyalty?.program || null,
        stats: {
          participants: 0,
          totalPoints: 0,
          rewardsRedeemed: 0,
          closeToReward: 0
        },
        topClients: []
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
