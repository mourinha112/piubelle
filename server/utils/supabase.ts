import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || ''

// Cliente para operações do servidor (com service role key)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Cliente para operações públicas
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Verificar se está configurado
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseServiceKey)
}
