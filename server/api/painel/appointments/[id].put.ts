import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localAppointments } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token de autenticação necessário' })
    }

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID do agendamento é obrigatório'
      })
    }

    if (isSupabaseConfigured()) {
      // Build update object
      const updateData: any = {
        updated_at: new Date().toISOString()
      }

      if (body.status !== undefined) updateData.status = body.status
      if (body.professionalId !== undefined) updateData.professional_id = body.professionalId
      if (body.date !== undefined) updateData.date = body.date
      if (body.startTime !== undefined) updateData.start_time = body.startTime
      if (body.endTime !== undefined) updateData.end_time = body.endTime
      if (body.total !== undefined) updateData.total = body.total
      if (body.notes !== undefined) updateData.notes = body.notes
      if (body.cancellationReason !== undefined) updateData.cancellation_reason = body.cancellationReason

      // Handle status-specific timestamps
      if (body.status === 'confirmed') {
        updateData.confirmed_at = new Date().toISOString()
      }
      if (body.status === 'completed') {
        updateData.completed_at = new Date().toISOString()
      }
      if (body.status === 'cancelled') {
        updateData.cancelled_at = new Date().toISOString()
      }

      const { data, error } = await supabaseAdmin
        .from('appointments')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Supabase error updating appointment:', error)
        throw createError({ statusCode: 500, message: error.message })
      }

      if (!data) {
        throw createError({ statusCode: 404, message: 'Agendamento não encontrado' })
      }

      return {
        success: true,
        message: 'Agendamento atualizado com sucesso!',
        data: {
          id: data.id,
          status: data.status,
          date: data.date,
          startTime: data.start_time,
          endTime: data.end_time,
          total: parseFloat(data.total) || 0,
          notes: data.notes,
          updatedAt: data.updated_at
        }
      }
    }

    // Local fallback
    const appointment = localAppointments.get(id)

    if (!appointment) {
      throw createError({
        statusCode: 404,
        message: 'Agendamento não encontrado'
      })
    }

    const updatedAppointment = {
      ...appointment,
      ...body,
      id: appointment.id,
      salonId: appointment.salonId,
      updatedAt: new Date().toISOString()
    }

    // Status-specific timestamps
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

    localAppointments.set(id, updatedAppointment)

    return {
      success: true,
      message: 'Agendamento atualizado com sucesso!',
      data: updatedAppointment
    }
  } catch (error: any) {
    console.error('Error updating appointment:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
