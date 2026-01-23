const appointments = new Map<string, any>()

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID do agendamento é obrigatório'
      })
    }

    const appointment = appointments.get(id)

    if (!appointment) {
      throw createError({
        statusCode: 404,
        message: 'Agendamento não encontrado'
      })
    }

    // Atualizar status
    const updatedAppointment = {
      ...appointment,
      ...body,
      id: appointment.id,
      salonId: appointment.salonId,
      updatedAt: new Date().toISOString()
    }

    // Registrar ações de status
    if (body.status === 'confirmed' && appointment.status !== 'confirmed') {
      updatedAppointment.confirmedAt = new Date().toISOString()
    }
    if (body.status === 'completed' && appointment.status !== 'completed') {
      updatedAppointment.completedAt = new Date().toISOString()
    }
    if (body.status === 'cancelled' && appointment.status !== 'cancelled') {
      updatedAppointment.cancelledAt = new Date().toISOString()
      updatedAppointment.cancellationReason = body.cancellationReason || null
    }

    appointments.set(id, updatedAppointment)

    return {
      success: true,
      message: 'Agendamento atualizado com sucesso!',
      data: updatedAppointment
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
