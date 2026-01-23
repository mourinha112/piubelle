import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

// Armazenamento local para modo sem Supabase
const localSalons = new Map<string, any>()

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, phone, description } = body

    if (!name) {
      throw createError({
        statusCode: 400,
        message: 'Nome do salão é obrigatório'
      })
    }

    // Extrair token do header
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({
        statusCode: 401,
        message: 'Token de autenticação necessário'
      })
    }

    const token = authHeader.replace('Bearer ', '')
    let userId = ''

    // Se Supabase está configurado
    if (isSupabaseConfigured()) {
      // Verificar token e obter usuário
      const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
      
      if (authError || !user) {
        throw createError({
          statusCode: 401,
          message: 'Token inválido'
        })
      }

      userId = user.id
      const slug = generateSlug(name) + '-' + Date.now().toString(36)

      // Criar salão no Supabase
      const { data: salon, error: salonError } = await supabaseAdmin
        .from('salons')
        .insert({
          owner_id: userId,
          name,
          slug,
          phone,
          description,
          is_active: true
        })
        .select()
        .single()

      if (salonError) {
        console.error('Erro ao criar salão:', salonError)
        throw createError({
          statusCode: 500,
          message: 'Erro ao criar salão: ' + salonError.message
        })
      }

      // Atualizar role do usuário para manager se necessário
      await supabaseAdmin
        .from('users')
        .update({ role: 'manager' })
        .eq('id', userId)

      return {
        success: true,
        data: {
          id: salon.id,
          name: salon.name,
          slug: salon.slug,
          phone: salon.phone,
          description: salon.description
        }
      }
    }

    // Fallback para modo local
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
      userId = decoded.userId
    } catch {
      throw createError({
        statusCode: 401,
        message: 'Token inválido'
      })
    }

    const salonId = `local-salon-${Date.now()}`
    const slug = generateSlug(name) + '-' + Date.now().toString(36)

    const salon = {
      id: salonId,
      ownerId: userId,
      name,
      slug,
      phone,
      description,
      isActive: true,
      createdAt: new Date().toISOString()
    }

    localSalons.set(salonId, salon)

    return {
      success: true,
      data: {
        id: salon.id,
        name: salon.name,
        slug: salon.slug,
        phone: salon.phone,
        description: salon.description
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})

export { localSalons }
