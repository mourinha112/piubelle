import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

// Local appointments storage
export const localAppointments = new Map<string, any>()

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const query = getQuery(event)
    const salonId = query.salonId as string
    const date = query.date as string
    const status = query.status as string
    const professionalId = query.professionalId as string

    if (!salonId) {
      throw createError({ statusCode: 400, message: 'salonId é obrigatório' })
    }

    if (isSupabaseConfigured()) {
      let queryBuilder = supabaseAdmin
        .from('appointments')
        .select(`
          id,
          date,
          start_time,
          end_time,
          status,
          final_price,
          notes,
          client:clients(id, full_name, phone),
          professional:professionals(id, name),
          service:services(id, name)
        `)
        .eq('salon_id', salonId)
        .order('start_time', { ascending: true })

      if (date) {
        queryBuilder = queryBuilder.eq('date', date)
      }

      if (status) {
        queryBuilder = queryBuilder.eq('status', status)
      }

      if (professionalId) {
        queryBuilder = queryBuilder.eq('professional_id', professionalId)
      }

      const { data, error } = await queryBuilder

      if (error) throw createError({ statusCode: 500, message: error.message })

      const appointments = (data || []).map((a: any) => ({
        id: a.id,
        date: a.date,
        startTime: a.start_time,
        endTime: a.end_time,
        status: a.status,
        total: parseFloat(a.final_price) || 0,
        notes: a.notes,
        clientId: a.client?.id,
        clientName: a.client?.full_name || 'Cliente',
        clientPhone: a.client?.phone,
        professionalId: a.professional?.id,
        professionalName: a.professional?.name || 'Profissional',
        serviceId: a.service?.id,
        serviceName: a.service?.name || 'Serviço',
        client: a.client?.full_name || 'Cliente',
        service: a.service?.name || 'Serviço',
        time: a.start_time,
        professional: a.professional?.name || 'Profissional'
      }))

      return {
        success: true,
        data: appointments,
        total: appointments.length
      }
    }

    // Local fallback
    let result = Array.from(localAppointments.values())

    result = result.filter(a => a.salonId === salonId)

    if (date) {
      result = result.filter(a => a.date === date)
    }

    if (status) {
      result = result.filter(a => a.status === status)
    }

    if (professionalId) {
      result = result.filter(a => a.professionalId === professionalId)
    }

    // Ordenar por horário
    result.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''))

    return {
      success: true,
      data: result,
      total: result.length
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
