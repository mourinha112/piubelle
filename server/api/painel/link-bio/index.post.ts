import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localLinkBio } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const body = await readBody(event)
    const { salonId, title, bio, avatarUrl, instagram, facebook, tiktok, whatsapp, links } = body

    if (!salonId) {
      throw createError({ statusCode: 400, message: 'salonId é obrigatório' })
    }

    if (isSupabaseConfigured()) {
      // Update salon social links
      const { error: salonError } = await supabaseAdmin
        .from('salons')
        .update({
          description: bio || null,
          instagram: instagram || null,
          facebook: facebook || null,
          tiktok: tiktok || null,
          whatsapp: whatsapp || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', salonId)

      if (salonError) {
        throw createError({ statusCode: 500, message: salonError.message })
      }

      // Update custom links if provided
      if (links && Array.isArray(links)) {
        // Delete existing links
        await supabaseAdmin
          .from('link_bio_links')
          .delete()
          .eq('salon_id', salonId)

        // Insert new links
        if (links.length > 0) {
          const linksToInsert = links.map((link: any, index: number) => ({
            salon_id: salonId,
            title: link.title || '',
            url: link.url || '',
            icon: link.icon || null,
            sort_order: index,
            is_active: true
          }))

          const { error: linksError } = await supabaseAdmin
            .from('link_bio_links')
            .insert(linksToInsert)

          if (linksError) {
            console.error('Error saving links:', linksError)
          }
        }
      }

      return {
        success: true,
        data: {
          title,
          bio,
          avatarUrl,
          instagram,
          facebook,
          tiktok,
          whatsapp,
          links: links || []
        }
      }
    }

    // Local fallback
    const linkBioData = {
      salonId,
      title,
      bio,
      avatarUrl,
      instagram,
      facebook,
      tiktok,
      whatsapp,
      links: links || [],
      viewCount: 0,
      clickCount: 0
    }

    localLinkBio.set(salonId, linkBioData)

    return { success: true, data: linkBioData }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno'
    })
  }
})
