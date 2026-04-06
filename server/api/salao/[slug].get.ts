import { supabaseAdmin, isSupabaseConfigured } from '../../utils/supabase'

/**
 * Checks if a salon is currently open based on:
 * 1. If manually_closed is true -> always closed
 * 2. If no working_hours rows exist -> open by default
 * 3. Otherwise checks current time against today's working hours
 */
async function checkIfOpen(salon: any): Promise<boolean> {
  // If manually closed via dashboard toggle, always return false
  if (salon.manually_closed) {
    return false
  }

  // Only check working hours if Supabase is configured
  if (!isSupabaseConfigured()) {
    return true
  }

  const now = new Date()
  // Use the salon timezone (default: America/Sao_Paulo)
  const tz = salon.timezone || 'America/Sao_Paulo'

  // Get current day of week (0=Sunday ... 6=Saturday)
  const formatter = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' })
  const dayStr = formatter.format(now).toLowerCase() // e.g. 'mon', 'tue'

  const dayMap: Record<string, number> = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 }
  const dayNumber = dayMap[dayStr] ?? now.getDay()

  // Fetch working hours for this salon
  const { data: hours, error } = await supabaseAdmin
    .from('salon_working_hours')
    .select('*')
    .eq('salon_id', salon.id)

  // If no working_hours table/rows exist, default to open
  if (error || !hours || hours.length === 0) {
    return true
  }

  // Find today's entry
  const todayHours = hours.find((h: any) => h.day_of_week === dayNumber)

  // If no entry for today or closed today
  if (!todayHours || todayHours.is_closed) {
    return false
  }

  // Compare current time with open/close times
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  const currentTime = timeFormatter.format(now).replace(/\u200E/g, '') // e.g. "14:30"

  const openTime = todayHours.open_time   // e.g. "09:00"
  const closeTime = todayHours.close_time  // e.g. "18:00"

  if (openTime && closeTime) {
    return currentTime >= openTime && currentTime <= closeTime
  }

  return true
}

// Mockup para demonstração
const mockupSalon = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  slug: 'studio-belle-hair-mockup',
  name: 'Studio Belle Hair [MOCKUP]',
  category: 'Salão de Beleza Completo',
  description: 'Salão de beleza completo especializado em cortes modernos, coloração, tratamentos capilares, manicure, pedicure e design de sobrancelhas.',
  logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&h=600&fit=crop',
  phone: '(79) 3333-4444',
  whatsapp: '79999998888',
  email: 'contato@studiobellehair.com.br',
  instagram: 'studiobellehair',
  facebook: 'studiobellehair',
  address: 'Av. Beira Mar, 1500 - Atalaia, Aracaju/SE',
  city: 'Aracaju - SE',
  rating: 4.8,
  reviewCount: 127,
  isOpen: true,
  services: [
    { id: 'serv-001', name: 'Corte Feminino', price: 80, duration: 45 },
    { id: 'serv-002', name: 'Escova', price: 50, duration: 40 },
    { id: 'serv-003', name: 'Coloração', price: 180, duration: 120 },
    { id: 'serv-007', name: 'Manicure', price: 35, duration: 45 }
  ],
  team: [
    { id: 'prof-ana-001', name: 'Ana Paula', role: 'Especialista em Coloração', rating: 4.9 },
    { id: 'prof-maria-001', name: 'Maria Clara', role: 'Nail Designer', rating: 4.8 }
  ],
  title: 'Studio Belle Hair [MOCKUP]',
  bio: '✨ Salão de beleza completo • Cabelo, unhas e maquiagem • 📍 Aracaju/SE',
  avatarUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop',
  background: 'linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #fff1f2 100%)',
  showServices: true,
  showLocation: true,
  links: [
    { id: '1', title: '📅 Agendar Horário', url: '/salao/studio-belle-hair-mockup' },
    { id: '2', title: '💅 Nossos Serviços', url: '/salao/studio-belle-hair-mockup#servicos' },
    { id: '3', title: '📍 Como Chegar', url: 'https://maps.google.com' }
  ]
}

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
      throw createError({
        statusCode: 400,
        message: 'Slug é obrigatório'
      })
    }

    // Se for o mockup, retorna dados mockup
    if (slug === 'studio-belle-hair-mockup') {
      return mockupSalon
    }

    // Buscar salão real do Supabase
    if (isSupabaseConfigured()) {
      // Buscar salão pelo slug
      const { data: salon, error: salonError } = await supabaseAdmin
        .from('salons')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (salonError || !salon) {
        throw createError({
          statusCode: 404,
          message: 'Salão não encontrado'
        })
      }

      // Buscar serviços do salão
      const { data: services } = await supabaseAdmin
        .from('services')
        .select('id, name, price, duration, icon, color')
        .eq('salon_id', salon.id)
        .eq('is_active', true)
        .order('name', { ascending: true })
        .limit(10)

      // Buscar profissionais
      const { data: professionals } = await supabaseAdmin
        .from('professionals')
        .select('id, name, bio, rating, avatar_url')
        .eq('salon_id', salon.id)
        .eq('is_active', true)
        .limit(10)

      // Buscar links do Link Bio
      const { data: links } = await supabaseAdmin
        .from('link_bio_links')
        .select('id, title, url, icon')
        .eq('salon_id', salon.id)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      // Determine if salon is currently open
      const isOpen = await checkIfOpen(salon)

      // Montar resposta
      return {
        id: salon.id,
        slug: salon.slug,
        name: salon.name,
        description: salon.description,
        logo: salon.logo_url,
        coverImage: salon.cover_url,
        phone: salon.phone,
        whatsapp: salon.whatsapp,
        email: salon.email,
        instagram: salon.instagram,
        facebook: salon.facebook,
        tiktok: salon.tiktok,
        address: [salon.address_street, salon.address_number, salon.address_neighborhood].filter(Boolean).join(', '),
        city: [salon.address_city, salon.address_state].filter(Boolean).join(' - '),
        rating: salon.rating || 0,
        reviewCount: salon.review_count || 0,
        isOpen,
        services: (services || []).map(s => ({
          id: s.id,
          name: s.name,
          price: parseFloat(s.price) || 0,
          duration: s.duration,
          icon: s.icon || 'lucide:sparkles',
          color: s.color || '#a855f7'
        })),
        team: (professionals || []).map(p => ({
          id: p.id,
          name: p.name,
          role: p.bio, // bio is used as role
          rating: p.rating,
          avatar: p.avatar_url
        })),
        // Link Bio data
        title: salon.name,
        bio: salon.description || '',
        avatarUrl: salon.logo_url,
        background: 'linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #fff1f2 100%)',
        showServices: true,
        showLocation: !!salon.address_street,
        links: (links || []).map(l => ({
          id: l.id,
          title: l.title,
          url: l.url,
          icon: l.icon
        }))
      }
    }

    // Sem Supabase configurado e não é mockup
    throw createError({
      statusCode: 404,
      message: 'Salão não encontrado'
    })
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
