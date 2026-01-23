const appointments = new Map<string, any>()

function generateId(): string {
  return 'apt-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { 
      salonId, clientId, professionalId, 
      date, startTime, endTime,
      services, total, notes, source
    } = body

    if (!salonId || !clientId || !date || !startTime) {
      throw createError({
        statusCode: 400,
        message: 'Campos obrigatórios: salonId, clientId, date, startTime'
      })
    }

    const appointmentId = generateId()

    const newAppointment = {
      id: appointmentId,
      salonId,
      clientId,
      professionalId: professionalId || null,
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

    appointments.set(appointmentId, newAppointment)

    return {
      success: true,
      message: 'Agendamento criado com sucesso!',
      data: newAppointment
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
