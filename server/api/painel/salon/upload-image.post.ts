import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

const BUCKET = 'salon-images'
const MAX_SIZE_BYTES = 3 * 1024 * 1024 // 3 MB (fica abaixo do limite de payload do Vercel)

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({ statusCode: 401, message: 'Token de autenticação necessário' })
  }

  if (!isSupabaseConfigured()) {
    throw createError({
      statusCode: 503,
      message: 'Upload de imagens requer Supabase configurado. Use uma URL de imagem por enquanto.'
    })
  }

  const form = await readMultipartFormData(event)
  if (!form?.length) {
    throw createError({ statusCode: 400, message: 'Envie um arquivo (campo "file")' })
  }

  const file = form.find(f => f.name === 'file' && f.data)
  if (!file || !file.data) {
    throw createError({ statusCode: 400, message: 'Arquivo não encontrado' })
  }

  if (file.data.length > MAX_SIZE_BYTES) {
    throw createError({
      statusCode: 413,
      message: 'Imagem muito grande. Use até 3 MB ou cole uma URL de imagem.'
    })
  }

  const ext = file.filename?.split('.').pop() || 'jpg'
  const contentType = file.type || `image/${ext}`
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, file.data, {
      contentType,
      upsert: false
    })

  if (error) {
    if (error.message?.includes('Bucket not found') || error.message?.includes('not found')) {
      throw createError({
        statusCode: 503,
        message: 'Bucket de imagens não configurado. Crie o bucket "salon-images" no Supabase Storage (público).'
      })
    }
    console.error('Supabase Storage upload error:', error)
    throw createError({ statusCode: 500, message: error.message || 'Erro ao enviar imagem' })
  }

  const { data: urlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(data.path)
  return { success: true, url: urlData.publicUrl }
})
