import { supabaseAdmin, isSupabaseConfigured } from '../../utils/supabase'

// ID do mockup para evitar duplicação
const MOCKUP_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

// Mockup salon (só usado se Supabase não estiver configurado)
const mockupSalon = {
  id: MOCKUP_ID,
  slug: 'studio-belle-hair-mockup',
  name: 'Studio Belle Hair [MOCKUP]',
  logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=600&fit=crop',
  address: 'Av. Beira Mar, 1500 - Atalaia, Aracaju/SE',
  category: 'Salão de Beleza Completo',
  rating: 4.8,
  reviewCount: 127,
  distance: '0.5 km',
  isOpen: true,
  isFavorite: false,
  featured: true,
  services: ['Corte', 'Coloração', 'Manicure', 'Maquiagem', 'Estética', 'Sobrancelha'],
  tags: ['Cabelo', 'Unhas', 'Maquiagem', 'Estética']
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const featured = query.featured === 'true'
    const limit = parseInt(query.limit as string) || 20

    // Se Supabase está configurado, busca apenas do banco
    if (isSupabaseConfigured()) {
      let queryBuilder = supabaseAdmin
        .from('salons')
        .select(`
          id,
          slug,
          name,
          description,
          logo_url,
          cover_url,
          address_street,
          address_number,
          address_neighborhood,
          address_city,
          address_state,
          rating,
          review_count,
          is_featured,
          is_active
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (featured) {
        queryBuilder = queryBuilder.eq('is_featured', true)
      }

      const { data, error } = await queryBuilder

      if (error) {
        console.error('Error fetching salons:', error)
        throw createError({ statusCode: 500, message: error.message })
      }

      const salons = []

      for (const salon of (data || [])) {
        // Busca serviços para cada salão
        const { data: services } = await supabaseAdmin
          .from('services')
          .select('name')
          .eq('salon_id', salon.id)
          .eq('is_active', true)
          .limit(6)

        const address = [
          salon.address_street,
          salon.address_number,
          salon.address_neighborhood,
          salon.address_city,
          salon.address_state
        ].filter(Boolean).join(', ') || 'Endereço não informado'

        salons.push({
          id: salon.id,
          slug: salon.slug,
          name: salon.name,
          logo: salon.logo_url || null,
          coverImage: salon.cover_url || null,
          address: address,
          category: 'Salão de Beleza',
          rating: salon.rating || 0,
          reviewCount: salon.review_count || 0,
          distance: '-',
          isOpen: true,
          isFavorite: false,
          featured: salon.is_featured,
          services: (services || []).map(s => s.name),
          tags: (services || []).slice(0, 4).map(s => s.name)
        })
      }

      return {
        success: true,
        data: salons,
        total: salons.length
      }
    }

    // Se Supabase NÃO está configurado, retorna apenas o mockup local
    return {
      success: true,
      data: [mockupSalon],
      total: 1
    }
  } catch (error: any) {
    console.error('Salons GET error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
