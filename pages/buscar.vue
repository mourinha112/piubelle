<template>
  <div class="min-h-screen py-6">
    <div class="container-app">
      <!-- Search Header -->
      <div class="mb-8">
        <h1 class="font-display text-3xl font-semibold text-gray-800 mb-2">
          Buscar Saloes
        </h1>
        <p class="text-gray-500">Encontre o servico perfeito para voce</p>
      </div>

      <!-- Search & Filters -->
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <!-- Search Input -->
        <div class="relative flex-1">
          <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar saloes, servicos..."
            class="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-300 outline-none transition-all shadow-soft"
          />
        </div>

        <!-- Filter Buttons -->
        <div class="flex gap-2">
          <button
            class="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-lilac-100 text-gray-600 hover:border-lilac-200 transition-all shadow-soft"
            @click="showFilters = !showFilters"
          >
            <Icon name="lucide:sliders-horizontal" class="w-5 h-5" />
            <span>Filtros</span>
            <span v-if="activeFiltersCount" class="w-5 h-5 rounded-full bg-lilac-500 text-white text-xs flex items-center justify-center">
              {{ activeFiltersCount }}
            </span>
          </button>
          <button
            class="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-lilac-100 text-gray-600 hover:border-lilac-200 transition-all shadow-soft"
          >
            <Icon name="lucide:map" class="w-5 h-5" />
            <span>Mapa</span>
          </button>
        </div>
      </div>

      <!-- Filters Panel -->
      <Transition name="slide-down">
        <div v-if="showFilters" class="mb-8 p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Category Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Categoria</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="cat in categories"
                  :key="cat.id"
                  :class="[
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    filters.category === cat.id
                      ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white'
                      : 'bg-lilac-50 text-gray-600 hover:bg-lilac-100'
                  ]"
                  @click="filters.category = filters.category === cat.id ? '' : cat.id"
                >
                  {{ cat.name }}
                </button>
              </div>
            </div>

            <!-- Rating Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Avaliacao minima</label>
              <div class="flex gap-2">
                <button
                  v-for="rating in [4, 4.5, 5]"
                  :key="rating"
                  :class="[
                    'flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    filters.minRating === rating
                      ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white'
                      : 'bg-lilac-50 text-gray-600 hover:bg-lilac-100'
                  ]"
                  @click="filters.minRating = filters.minRating === rating ? 0 : rating"
                >
                  <Icon name="lucide:star" class="w-4 h-4" />
                  {{ rating }}+
                </button>
              </div>
            </div>

            <!-- Status Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Status</label>
              <div class="flex gap-2">
                <button
                  :class="[
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    filters.openNow
                      ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white'
                      : 'bg-lilac-50 text-gray-600 hover:bg-lilac-100'
                  ]"
                  @click="filters.openNow = !filters.openNow"
                >
                  Aberto agora
                </button>
                <button
                  :class="[
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                    filters.hasPromo
                      ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white'
                      : 'bg-lilac-50 text-gray-600 hover:bg-lilac-100'
                  ]"
                  @click="filters.hasPromo = !filters.hasPromo"
                >
                  Com promocao
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-6 pt-4 border-t border-lilac-100">
            <button
              class="text-sm text-gray-500 hover:text-gray-700 mr-4"
              @click="clearFilters"
            >
              Limpar filtros
            </button>
            <button
              class="px-6 py-2 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium"
              @click="showFilters = false"
            >
              Aplicar
            </button>
          </div>
        </div>
      </Transition>

      <!-- Results Count & Sort -->
      <div class="flex items-center justify-between mb-6">
        <p class="text-gray-600">
          <span class="font-semibold text-gray-800">{{ filteredSalons.length }}</span> saloes encontrados
        </p>
        <select
          v-model="sortBy"
          class="px-4 py-2 rounded-xl bg-white border border-lilac-100 text-gray-600 text-sm focus:border-lilac-300 outline-none"
        >
          <option value="relevance">Mais relevantes</option>
          <option value="rating">Melhor avaliados</option>
          <option value="name">Nome A-Z</option>
        </select>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="rounded-2xl bg-white border border-lilac-100 shadow-soft overflow-hidden animate-pulse">
          <div class="h-48 bg-lilac-100" />
          <div class="p-5 pt-10 space-y-3">
            <div class="h-5 bg-lilac-100 rounded w-2/3" />
            <div class="h-4 bg-lilac-50 rounded w-1/2" />
            <div class="flex justify-between">
              <div class="h-4 bg-lilac-50 rounded w-20" />
              <div class="h-4 bg-lilac-50 rounded w-16" />
            </div>
            <div class="h-4 bg-lilac-50 rounded w-24" />
            <div class="pt-4 border-t border-lilac-100 flex gap-2">
              <div class="h-6 bg-lilac-50 rounded-lg w-16" />
              <div class="h-6 bg-lilac-50 rounded-lg w-16" />
              <div class="h-6 bg-lilac-50 rounded-lg w-16" />
            </div>
          </div>
        </div>
      </div>

      <!-- Results Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SalonCard
          v-for="salon in filteredSalons"
          :key="salon.id"
          :salon="salon"
          @favorite="handleFavorite"
        />
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredSalons.length === 0" class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-lilac-50 flex items-center justify-center">
          <Icon name="lucide:search-x" class="w-10 h-10 text-lilac-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Nenhum resultado</h3>
        <p class="text-gray-500 max-w-md mx-auto">
          Nao encontramos saloes com esses filtros. Tente ajustar sua busca.
        </p>
        <button
          class="mt-6 px-6 py-3 rounded-xl bg-lilac-50 text-lilac-600 font-medium hover:bg-lilac-100 transition-all"
          @click="clearFilters"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { api } = useApi()

const searchQuery = ref(route.query.q as string || '')
const showFilters = ref(false)
const loading = ref(true)
const sortBy = ref('relevance')

const filters = ref({
  category: route.query.categoria as string || '',
  minRating: 0,
  openNow: false,
  hasPromo: false
})

const categories = [
  { id: 'hair', name: 'Cabelo' },
  { id: 'nails', name: 'Unhas' },
  { id: 'makeup', name: 'Maquiagem' },
  { id: 'skincare', name: 'Estetica' },
  { id: 'spa', name: 'Spa' }
]

interface SalonItem {
  id: string
  slug: string
  name: string
  logo: string | null
  coverImage: string | null
  address: string
  rating: number
  reviewCount: number
  distance: string
  isOpen: boolean
  isFavorite: boolean
  featured: boolean
  category: string
  services: string[]
}

const salons = ref<SalonItem[]>([])

// Favorites persisted in localStorage
const favoriteIds = ref<Set<string>>(new Set())

const loadFavorites = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('piubelle_favorites')
      if (saved) {
        favoriteIds.value = new Set(JSON.parse(saved))
      }
    } catch {
      // ignore
    }
  }
}

const saveFavorites = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('piubelle_favorites', JSON.stringify([...favoriteIds.value]))
  }
}

// Mock data as fallback
const mockSalons: SalonItem[] = [
  {
    id: '1',
    slug: 'studio-belle-hair',
    name: 'Studio Belle Hair',
    logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop',
    address: 'Av. Beira Mar, 1500',
    rating: 4.9,
    reviewCount: 256,
    distance: '1.2km',
    isOpen: true,
    isFavorite: false,
    featured: true,
    category: 'hair',
    services: ['Corte', 'Coloracao', 'Hidratacao']
  },
  {
    id: '2',
    slug: 'nail-art-studio',
    name: 'Nail Art Studio',
    logo: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop',
    address: 'Rua das Flores, 230',
    rating: 4.8,
    reviewCount: 189,
    distance: '2.5km',
    isOpen: true,
    isFavorite: false,
    featured: false,
    category: 'nails',
    services: ['Manicure', 'Pedicure', 'Nail Art']
  },
  {
    id: '3',
    slug: 'spa-serenidade',
    name: 'Spa Serenidade',
    logo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop',
    address: 'Praca Central, 45',
    rating: 4.9,
    reviewCount: 312,
    distance: '3.1km',
    isOpen: false,
    isFavorite: false,
    featured: false,
    category: 'spa',
    services: ['Massagem', 'Day Spa', 'Relaxamento']
  },
  {
    id: '4',
    slug: 'clinica-estetica-prime',
    name: 'Clinica Estetica Prime',
    logo: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop',
    address: 'Rua dos Medicos, 456',
    rating: 4.9,
    reviewCount: 423,
    distance: '1.9km',
    isOpen: true,
    isFavorite: false,
    featured: false,
    category: 'skincare',
    services: ['Limpeza de Pele', 'Peeling', 'Botox']
  },
  {
    id: '5',
    slug: 'make-up-studio',
    name: 'Make Up Studio',
    logo: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop',
    address: 'Shopping Center, Loja 42',
    rating: 4.6,
    reviewCount: 134,
    distance: '2.2km',
    isOpen: true,
    isFavorite: false,
    featured: false,
    category: 'makeup',
    services: ['Maquiagem Social', 'Noivas', 'Curso']
  }
]

const fetchSalons = async () => {
  loading.value = true
  try {
    const { data, error } = await api<any>('/api/salons', { method: 'GET' })

    if (data && Array.isArray(data) && data.length > 0) {
      salons.value = data.map((s: any) => ({
        id: s.id || s._id || String(Math.random()),
        slug: s.slug || '',
        name: s.name || 'Salao',
        logo: s.logoUrl || s.logo || null,
        coverImage: s.coverImage || s.coverUrl || s.bannerUrl || null,
        address: s.address || s.location?.address || '',
        rating: s.rating || s.avgRating || 0,
        reviewCount: s.reviewCount || s.totalReviews || 0,
        distance: s.distance || '',
        isOpen: s.isOpen ?? true,
        isFavorite: favoriteIds.value.has(s.id || s._id),
        featured: s.featured || s.isFeatured || false,
        category: s.category || '',
        services: s.services?.map((svc: any) => typeof svc === 'string' ? svc : svc.name) || []
      }))
    } else {
      // Fallback to mock data
      salons.value = mockSalons.map(s => ({
        ...s,
        isFavorite: favoriteIds.value.has(s.id)
      }))
    }
  } catch {
    // Fallback to mock data on error
    salons.value = mockSalons.map(s => ({
      ...s,
      isFavorite: favoriteIds.value.has(s.id)
    }))
  } finally {
    loading.value = false
  }
}

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.category) count++
  if (filters.value.minRating) count++
  if (filters.value.openNow) count++
  if (filters.value.hasPromo) count++
  return count
})

const filteredSalons = computed(() => {
  let result = salons.value.filter(salon => {
    // Text search: match name, address, or services
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      const matchesName = salon.name.toLowerCase().includes(q)
      const matchesAddress = salon.address.toLowerCase().includes(q)
      const matchesServices = salon.services.some(s => s.toLowerCase().includes(q))
      if (!matchesName && !matchesAddress && !matchesServices) return false
    }
    if (filters.value.category && salon.category !== filters.value.category) {
      return false
    }
    if (filters.value.minRating && salon.rating < filters.value.minRating) {
      return false
    }
    if (filters.value.openNow && !salon.isOpen) {
      return false
    }
    return true
  })

  // Sort
  if (sortBy.value === 'rating') {
    result = [...result].sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'name') {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name))
  }
  // 'relevance' keeps original order (featured first)
  if (sortBy.value === 'relevance') {
    result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  }

  return result
})

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {
    category: '',
    minRating: 0,
    openNow: false,
    hasPromo: false
  }
}

const handleFavorite = (salonId: string) => {
  const salon = salons.value.find(s => s.id === salonId)
  if (salon) {
    salon.isFavorite = !salon.isFavorite
    if (salon.isFavorite) {
      favoriteIds.value.add(salonId)
    } else {
      favoriteIds.value.delete(salonId)
    }
    saveFavorites()
  }
}

onMounted(() => {
  loadFavorites()
  fetchSalons()
})

useSeoMeta({
  title: 'Buscar Saloes - PiuBelle',
  description: 'Encontre saloes de beleza, manicure, spa e estetica perto de voce'
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
