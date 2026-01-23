import { supabaseAdmin, isSupabaseConfigured } from '../../utils/supabase'

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

      // Buscar dados do usuário
      const { data: userData } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      // Buscar salões do usuário
      const { data: salons } = await supabaseAdmin
        .from('salons')
        .select('id, name, slug, logo_url')
        .eq('owner_id', user.id)
        .eq('is_active', true)

      return {
        success: true,
        user: userData ? {
          id: userData.id,
          email: userData.email,
          fullName: userData.full_name,
          phone: userData.phone,
          role: userData.role,
          avatarUrl: userData.avatar_url
        } : {
          id: user.id,
          email: user.email,
          fullName: user.user_metadata?.full_name || user.email?.split('@')[0],
          phone: null,
          role: user.user_metadata?.role || 'client',
          avatarUrl: null
        },
        salons: salons?.map(s => ({
          id: s.id,
          name: s.name,
          slug: s.slug,
          logoUrl: s.logo_url
        })) || []
      }
    }

    // Fallback para modo local
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
      
      // Verificar expiração
      if (decoded.exp < Date.now()) {
        throw createError({
          statusCode: 401,
          message: 'Token expirado'
        })
      }

      // Retornar dados básicos para modo local
      return {
        success: true,
        user: {
          id: decoded.userId,
          email: 'local@demo.com',
          fullName: 'Usuário Local',
          phone: null,
          role: 'manager',
          avatarUrl: null
        },
        salons: []
      }
    } catch {
      throw createError({
        statusCode: 401,
        message: 'Token inválido'
      })
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
