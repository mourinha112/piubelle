// Dados de salões
const salons = new Map<string, any>()

// Salão demo
salons.set('demo-salon-id', {
  id: 'demo-salon-id',
  ownerId: 'demo-user-id',
  name: 'Studio Belle Hair',
  slug: 'studio-belle-hair',
  description: 'Salão de beleza completo com profissionais especializados',
  logoUrl: null,
  coverUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200',
  phone: '(79) 99999-9999',
  whatsapp: '(79) 99999-9999',
  email: 'contato@studiobelle.com',
  website: 'https://studiobelle.com',
  instagram: '@studiobellehair',
  
  addressStreet: 'Av. Beira Mar',
  addressNumber: '1500',
  addressNeighborhood: 'Centro',
  addressCity: 'Aracaju',
  addressState: 'SE',
  addressZipcode: '49000-000',
  latitude: -10.9472,
  longitude: -37.0731,
  
  bookingAdvanceDays: 30,
  bookingCancelHours: 2,
  autoConfirmBooking: false,
  
  isActive: true,
  isVerified: true,
  isFeatured: true,
  rating: 4.9,
  reviewCount: 256,
  
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: new Date().toISOString()
})

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID do salão é obrigatório'
      })
    }

    const salon = salons.get(id)

    if (!salon) {
      throw createError({
        statusCode: 404,
        message: 'Salão não encontrado'
      })
    }

    return {
      success: true,
      data: salon
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
