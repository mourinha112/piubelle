import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localSalons } from './index.post'

export default defineEventHandler(async (event) => {
  try {
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

      // Buscar salões do usuário
      const { data: salons, error: salonsError } = await supabaseAdmin
        .from('salons')
        .select('*')
        .eq('owner_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (salonsError) {
        throw createError({
          statusCode: 500,
          message: 'Erro ao buscar salões'
        })
      }

      return {
        success: true,
        data: salons.map(s => ({
          id: s.id,
          name: s.name,
          slug: s.slug,
          logoUrl: s.logo_url,
          phone: s.phone,
          description: s.description
        }))
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

    // Buscar salões locais do usuário
    const userSalons: any[] = []
    localSalons.forEach((salon, id) => {
      if (salon.ownerId === userId) {
        userSalons.push({
          id: salon.id,
          name: salon.name,
          slug: salon.slug,
          logoUrl: null,
          phone: salon.phone,
          description: salon.description
        })
      }
    })

    return {
      success: true,
      data: userSalons
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
