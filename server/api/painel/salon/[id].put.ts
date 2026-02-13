import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

const localSalons = new Map<string, any>()

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
        message: 'ID do salão é obrigatório'
      })
    }

    if (isSupabaseConfigured()) {
      // Build update object with only provided fields
      const updateData: any = {
        updated_at: new Date().toISOString()
      }

      // Basic info
      if (body.name !== undefined) updateData.name = body.name
      if (body.slug !== undefined) updateData.slug = body.slug
      if (body.description !== undefined) updateData.description = body.description
      if (body.phone !== undefined) updateData.phone = body.phone
      if (body.whatsapp !== undefined) updateData.whatsapp = body.whatsapp
      if (body.email !== undefined) updateData.email = body.email
      if (body.website !== undefined) updateData.website = body.website
      if (body.instagram !== undefined) updateData.instagram = body.instagram
      if (body.facebook !== undefined) updateData.facebook = body.facebook
      if (body.logoUrl !== undefined) updateData.logo_url = body.logoUrl
      if (body.coverUrl !== undefined) updateData.cover_url = body.coverUrl

      // Address
      if (body.addressStreet !== undefined) updateData.address_street = body.addressStreet
      if (body.addressNumber !== undefined) updateData.address_number = body.addressNumber
      if (body.addressComplement !== undefined) updateData.address_complement = body.addressComplement
      if (body.addressNeighborhood !== undefined) updateData.address_neighborhood = body.addressNeighborhood
      if (body.addressCity !== undefined) updateData.address_city = body.addressCity
      if (body.addressState !== undefined) updateData.address_state = body.addressState
      if (body.addressZipcode !== undefined) updateData.address_zipcode = body.addressZipcode

      // Settings
      if (body.autoConfirmBooking !== undefined) updateData.auto_confirm_booking = body.autoConfirmBooking
      if (body.bookingAdvanceDays !== undefined) updateData.booking_advance_days = body.bookingAdvanceDays
      if (body.bookingCancelHours !== undefined) updateData.booking_cancel_hours = body.bookingCancelHours
      if (body.requireDeposit !== undefined) updateData.require_deposit = body.requireDeposit
      if (body.depositPercentage !== undefined) updateData.deposit_percentage = body.depositPercentage
      if (body.isActive !== undefined) updateData.is_active = body.isActive
      // Metadata (free-form JSON) - e.g., { document: '123...' }
      if (body.metadata !== undefined) updateData.metadata = body.metadata

      const { data, error } = await supabaseAdmin
        .from('salons')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Supabase error updating salon:', error)
        throw createError({ statusCode: 500, message: error.message })
      }

      if (!data) {
        throw createError({ statusCode: 404, message: 'Salão não encontrado' })
      }

      return {
        success: true,
        message: 'Salão atualizado com sucesso!',
        data: {
          id: data.id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          website: data.website,
          instagram: data.instagram,
          facebook: data.facebook,
          logoUrl: data.logo_url,
          coverUrl: data.cover_url,
          metadata: data.metadata,
          addressStreet: data.address_street,
          addressNumber: data.address_number,
          addressComplement: data.address_complement,
          addressNeighborhood: data.address_neighborhood,
          addressCity: data.address_city,
          addressState: data.address_state,
          addressZipcode: data.address_zipcode,
          autoConfirmBooking: data.auto_confirm_booking,
          bookingAdvanceDays: data.booking_advance_days,
          bookingCancelHours: data.booking_cancel_hours,
          requireDeposit: data.require_deposit,
          depositPercentage: data.deposit_percentage,
          isActive: data.is_active,
          updatedAt: data.updated_at
        }
      }
    }

    // Local fallback
    const salon = localSalons.get(id)

    if (!salon) {
      throw createError({
        statusCode: 404,
        message: 'Salão não encontrado'
      })
    }

    const updatedSalon = {
      ...salon,
      ...body,
      id: salon.id,
      ownerId: salon.ownerId,
      updatedAt: new Date().toISOString()
    }

    localSalons.set(id, updatedSalon)

    return {
      success: true,
      message: 'Salão atualizado com sucesso!',
      data: updatedSalon
    }
  } catch (error: any) {
    console.error('Error updating salon:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
