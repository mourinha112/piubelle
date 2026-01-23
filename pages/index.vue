<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <HomeHeroSection />

    <!-- Featured Carousel -->
    <HomeFeaturedCarousel :salons="featuredSalons" />

    <!-- Categories -->
    <HomeCategoriesSection @select="handleCategorySelect" />

    <!-- Promo Section -->
    <HomePromoSection />

    <!-- Nearby Section -->
    <HomeNearbySection :salons="allSalons" />

    <!-- All Salons Grid (Desktop) -->
    <section class="py-8 hidden lg:block">
      <div class="container-app">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="font-display text-2xl font-semibold text-gray-800">
              Todos os Salões
            </h2>
            <p class="text-sm text-gray-500 mt-1">{{ allSalons.length }} salões disponíveis</p>
          </div>
          
          <!-- View Toggle -->
          <div class="flex items-center gap-2 p-1.5 rounded-xl bg-lilac-50 border border-lilac-100">
            <button 
              :class="['p-2 rounded-lg transition-all', viewMode === 'grid' ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white shadow-glow' : 'text-gray-500 hover:text-gray-700']"
              @click="viewMode = 'grid'"
            >
              <Icon name="lucide:layout-grid" class="w-4 h-4" />
            </button>
            <button 
              :class="['p-2 rounded-lg transition-all', viewMode === 'list' ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white shadow-glow' : 'text-gray-500 hover:text-gray-700']"
              @click="viewMode = 'list'"
            >
              <Icon name="lucide:list" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="w-8 h-8 border-4 border-lilac-200 border-t-lilac-500 rounded-full animate-spin"></div>
        </div>

        <!-- Grid View -->
        <div v-else-if="viewMode === 'grid'" class="grid grid-cols-2 xl:grid-cols-3 gap-6">
          <SalonCard 
            v-for="salon in allSalons" 
            :key="salon.id"
            :salon="salon"
            @favorite="handleFavorite"
          />
        </div>

        <!-- List View -->
        <div v-else class="space-y-4">
          <SalonCardCompact 
            v-for="salon in allSalons" 
            :key="salon.id"
            :salon="salon"
            @favorite="handleFavorite"
          />
        </div>

        <!-- Empty State -->
        <div v-if="!loading && allSalons.length === 0" class="text-center py-12">
          <Icon name="lucide:store" class="w-12 h-12 text-lilac-300 mx-auto mb-3" />
          <p class="text-gray-500">Nenhum salão encontrado</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const viewMode = ref<'grid' | 'list'>('grid')
const loading = ref(true)
const allSalons = ref<any[]>([])

const featuredSalons = computed(() => 
  allSalons.value.filter(s => s.featured)
)

// Fetch salons
const fetchSalons = async () => {
  loading.value = true
  try {
    const res = await $fetch('/api/salons')
    if ((res as any).success) {
      allSalons.value = (res as any).data || []
    }
  } catch (error) {
    console.error('Erro ao buscar salões:', error)
  } finally {
    loading.value = false
  }
}

const handleCategorySelect = (categoryId: string) => {
  navigateTo(`/buscar?categoria=${categoryId}`)
}

const handleFavorite = (salonId: string) => {
  const salon = allSalons.value.find(s => s.id === salonId)
  if (salon) {
    salon.isFavorite = !salon.isFavorite
  }
}

onMounted(() => {
  fetchSalons()
})
</script>
