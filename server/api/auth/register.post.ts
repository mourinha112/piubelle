import { supabaseAdmin, isSupabaseConfigured } from '../../utils/supabase'

// Armazenamento local para modo sem Supabase
const localUsers = new Map<string, any>()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, fullName, phone, role = 'client' } = body

    if (!email || !password || !fullName) {
      throw createError({
        statusCode: 400,
        message: 'E-mail, senha e nome são obrigatórios'
      })
    }

    if (password.length < 6) {
      throw createError({
        statusCode: 400,
        message: 'Senha deve ter pelo menos 6 caracteres'
      })
    }

    // Se Supabase está configurado, usa ele
    if (isSupabaseConfigured()) {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto confirmar e-mail
        user_metadata: {
          full_name: fullName,
          role: role
        }
      })

      if (authError) {
        if (authError.message.includes('already registered')) {
          throw createError({
            statusCode: 400,
            message: 'Este e-mail já está cadastrado'
          })
        }
        throw createError({
          statusCode: 400,
          message: authError.message
        })
      }

      // O trigger handle_new_user deve criar o registro em public.users
      // Mas vamos garantir que existe
      const { data: userData, error: userError } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (userError) {
        // Criar manualmente se o trigger falhou
        await supabaseAdmin.from('users').insert({
          id: authData.user.id,
          email: email,
          full_name: fullName,
          phone: phone,
          role: role
        })
      }

      // Fazer login para obter token
      const { data: loginData } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password
      })

      return {
        success: true,
        data: {
          user: {
            id: authData.user.id,
            email: email,
            fullName: fullName,
            phone: phone,
            role: role,
            avatarUrl: null
          },
          token: loginData?.session?.access_token || ''
        }
      }
    }

    // Fallback para modo local (sem Supabase)
    if (localUsers.has(email.toLowerCase())) {
      throw createError({
        statusCode: 400,
        message: 'Este e-mail já está cadastrado'
      })
    }

    const userId = `local-${Date.now()}`
    const user = {
      id: userId,
      email: email.toLowerCase(),
      password,
      fullName,
      phone,
      role,
      avatarUrl: null,
      createdAt: new Date().toISOString()
    }

    localUsers.set(email.toLowerCase(), user)

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

// Exportar para uso em login local
export { localUsers }
