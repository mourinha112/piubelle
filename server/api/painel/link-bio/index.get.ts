import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

// Local link bio storage
export const localLinkBio = new Map<string, any>()

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const query = getQuery(event)
    const salonId = query.salonId as string

    if (!salonId) {
      throw createError({ statusCode: 400, message: 'salonId é obrigatório' })
    }

    if (isSupabaseConfigured()) {
      // Get salon data (includes social links)
      const { data: salon, error: salonError } = await supabaseAdmin
        .from('salons')
        .select('name, description, logo_url, instagram, facebook, tiktok, whatsapp')
        .eq('id', salonId)
        .single()

      if (salonError) {
        throw createError({ statusCode: 500, message: salonError.message })
      }

      // Get custom links
      const { data: links, error: linksError } = await supabaseAdmin
        .from('link_bio_links')
        .select('id, title, url, icon, sort_order, clicks')
        .eq('salon_id', salonId)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (linksError) {
        console.error('Error fetching links:', linksError)
      }

      return {
        success: true,
        data: {
          title: salon?.name || '',
          bio: salon?.description || '',
          avatarUrl: salon?.logo_url || '',
          instagram: salon?.instagram || '',
          facebook: salon?.facebook || '',
          tiktok: salon?.tiktok || '',
          whatsapp: salon?.whatsapp || '',
          links: (links || []).map(l => ({
            id: l.id,
            title: l.title,
            url: l.url,
            icon: l.icon,
            clicks: l.clicks
          })),
          viewCount: 0,
          clickCount: (links || []).reduce((sum, l) => sum + (l.clicks || 0), 0)
        }
      }
    }

    // Local fallback
    const linkBio = localLinkBio.get(salonId)
    
    return {
      success: true,
      data: linkBio || null
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno'
    })
  }
})
