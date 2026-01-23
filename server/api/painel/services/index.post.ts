import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localServices } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const body = await readBody(event)
    const { salonId, name, duration, price, description, icon, color, categoryId } = body

    if (!salonId || !name || !duration || price === undefined) {
      throw createError({
        statusCode: 400,
        message: 'Campos obrigatórios: salonId, name, duration, price'
      })
    }

    // Validar se categoryId é um UUID válido (36 caracteres com hífens)
    const isValidUUID = (str: string) => {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      return uuidRegex.test(str)
    }

    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin
        .from('services')
        .insert({
          salon_id: salonId,
          category_id: (categoryId && isValidUUID(categoryId)) ? categoryId : null,
          name,
          description: description || null,
          duration: parseInt(duration),
          price: parseFloat(price),
          icon: icon || 'lucide:sparkles',
          color: color || '#a855f7',
          is_active: true,
          is_featured: false
        })
        .select()
        .single()

      if (error) {
        console.error('Supabase error creating service:', error)
        throw createError({ statusCode: 500, message: error.message })
      }

      return {
        success: true,
        message: 'Serviço criado com sucesso!',
        data: {
          id: data.id,
          name: data.name,
          description: data.description,
          categoryId: data.category_id,
          price: parseFloat(data.price),
          duration: data.duration,
          icon: data.icon,
          color: data.color,
          isActive: data.is_active
        }
      }
    }

    // Local fallback
    const serviceId = 'srv-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)

    const newService = {
      id: serviceId,
      salonId,
      categoryId: categoryId || null,
      name,
      description: description || null,
      duration: parseInt(duration),
      price: parseFloat(price),
      icon: icon || 'lucide:sparkles',
      color: color || '#a855f7',
      isActive: true,
      createdAt: new Date().toISOString()
    }

    localServices.set(serviceId, newService)

    return {
      success: true,
      message: 'Serviço criado com sucesso!',
      data: newService
    }
  } catch (error: any) {
    console.error('Service POST error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
