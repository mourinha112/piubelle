import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

const localAppointments = new Map<string, any>()

function generateId(): string {
  return 'apt-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
}

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token de autenticação necessário' })
    }

    const body = await readBody(event)
    const { 
      salonId, clientId, professionalId, serviceId,
      date, startTime, endTime,
      total, notes, source
    } = body

    if (!salonId || !clientId || !date || !startTime) {
      throw createError({
        statusCode: 400,
        message: 'Campos obrigatórios: salonId, clientId, date, startTime'
      })
    }

    if (isSupabaseConfigured()) {
      // Get client and service info for denormalized fields
      let clientName = 'Cliente'
      let clientPhone = null
      let serviceName = 'Serviço'
      let professionalName = null
      let duration = 60

      // Fetch client info
      const { data: clientData } = await supabaseAdmin
        .from('clients')
        .select('full_name, phone')
        .eq('id', clientId)
        .single()

      if (clientData) {
        clientName = clientData.full_name
        clientPhone = clientData.phone
      }

      // Fetch service info if provided
      if (serviceId) {
        const { data: serviceData } = await supabaseAdmin
          .from('services')
          .select('name, duration')
          .eq('id', serviceId)
          .single()

        if (serviceData) {
          serviceName = serviceData.name
          duration = serviceData.duration || 60
        }
      }

      // Fetch professional info if provided
      if (professionalId) {
        const { data: profData } = await supabaseAdmin
          .from('professionals')
          .select('name')
          .eq('id', professionalId)
          .single()

        if (profData) {
          professionalName = profData.name
        }
      }

      const appointmentData = {
        salon_id: salonId,
        client_id: clientId,
        professional_id: professionalId || null,
        date: date,
        start_time: startTime,
        end_time: endTime || startTime,
        status: 'pending',
        subtotal: total || 0,
        discount_amount: 0,
        total: total || 0,
        deposit_amount: 0,
        deposit_paid: false,
        notes: notes || null,
        client_notes: null,
        source: source || 'app'
      }

      const { data, error } = await supabaseAdmin
        .from('appointments')
        .insert(appointmentData)
        .select()
        .single()

      if (error) {
        console.error('Supabase error creating appointment:', error)
        throw createError({ statusCode: 500, message: error.message })
      }

      return {
        success: true,
        message: 'Agendamento criado com sucesso!',
        data: {
          id: data.id,
          salonId: data.salon_id,
          clientId: data.client_id,
          clientName,
          clientPhone,
          professionalId: data.professional_id,
          professionalName,
          serviceId,
          serviceName,
          date: data.date,
          startTime: data.start_time,
          endTime: data.end_time,
          duration,
          status: data.status,
          total: parseFloat(data.total) || 0,
          notes: data.notes,
          createdAt: data.created_at
        }
      }
    }

    // Local fallback
    const appointmentId = generateId()

    const newAppointment = {
      id: appointmentId,
      salonId,
      clientId,
      professionalId: professionalId || null,
      serviceId: serviceId || null,
      date,
      startTime,
      endTime: endTime || startTime,
      status: 'pending',
      subtotal: total || 0,
      discountAmount: 0,
      total: total || 0,
      depositAmount: 0,
      depositPaid: false,
      notes: notes || null,
      clientNotes: null,
      source: source || 'app',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    localAppointments.set(appointmentId, newAppointment)

    return {
      success: true,
      message: 'Agendamento criado com sucesso!',
      data: newAppointment
    }
  } catch (error: any) {
    console.error('Error creating appointment:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
