import { supabaseAdmin, isSupabaseConfigured } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'E-mail e senha são obrigatórios'
      })
    }

    // Se Supabase está configurado, usa ele
    if (isSupabaseConfigured()) {
      // Login com Supabase Auth
      const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password
      })

      if (authError) {
        throw createError({
          statusCode: 401,
          message: 'E-mail ou senha incorretos'
        })
      }

      // Buscar dados do usuário na tabela public.users
      const { data: userData, error: userError } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (userError || !userData) {
        // Se não existe na tabela users, criar
        const { data: newUser, error: createError } = await supabaseAdmin
          .from('users')
          .insert({
            id: authData.user.id,
            email: authData.user.email,
            full_name: authData.user.user_metadata?.full_name || email.split('@')[0],
            role: authData.user.user_metadata?.role || 'client'
          })
          .select()
          .single()

        if (createError) {
          console.error('Erro ao criar usuário:', createError)
        }

        return {
          success: true,
          data: {
            user: {
              id: authData.user.id,
              email: authData.user.email,
              fullName: newUser?.full_name || email.split('@')[0],
              phone: newUser?.phone || null,
              role: newUser?.role || 'client',
              avatarUrl: newUser?.avatar_url || null
            },
            token: authData.session?.access_token
          }
        }
      }

      return {
        success: true,
        data: {
          user: {
            id: userData.id,
            email: userData.email,
            fullName: userData.full_name,
            phone: userData.phone,
            role: userData.role,
            avatarUrl: userData.avatar_url
          },
          token: authData.session?.access_token
        }
      }
    }

    // Fallback para modo local (sem Supabase)
    // Usuários de demonstração
    const demoUsers: Record<string, any> = {
      'demo@piubelle.com': {
        id: 'demo-user-id',
        email: 'demo@piubelle.com',
        password: '123456',
        fullName: 'Gestora Demo',
        phone: '(79) 99999-9999',
        role: 'manager'
      },
      'admin@mockup.piubelle.com': {
        id: 'mockup-user-id',
        email: 'admin@mockup.piubelle.com',
        password: 'Mockup@2024',
        fullName: 'Administradora Mockup',
        phone: '(79) 99999-0000',
        role: 'manager'
      }
    }

    const user = demoUsers[email.toLowerCase()]

    if (!user || user.password !== password) {
      throw createError({
        statusCode: 401,
        message: 'E-mail ou senha incorretos'
      })
    }

    // Gerar token simples
    const token = Buffer.from(JSON.stringify({
      userId: user.id,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000
    })).toString('base64')

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          role: user.role,
          avatarUrl: null
        },
        token
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
