<template>
  <section class="py-6">
    <div class="container-app">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="font-display text-2xl font-semibold text-gray-800">
            ✨ Destaques
          </h2>
          <p class="text-sm text-gray-500 mt-1">Salões em evidência</p>
        </div>
        <NuxtLink to="/buscar?featured=true" class="text-sm text-lilac-600 font-medium hover:text-lilac-700 flex items-center gap-1">
          Ver todos
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
        <div v-for="i in 3" :key="i" class="flex-shrink-0 w-80 h-80 rounded-2xl bg-gray-100 animate-pulse"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="displaySalons.length === 0" class="text-center py-12">
        <Icon name="lucide:crown" class="w-12 h-12 text-lilac-300 mx-auto mb-3" />
        <p class="text-gray-500">Nenhum salão em destaque</p>
      </div>

      <!-- Carousel -->
      <div v-else class="flex gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5">
        <div 
          v-for="salon in displaySalons" 
          :key="salon.id"
          class="flex-shrink-0 w-80 card-premium overflow-hidden group cursor-pointer"
          @click="navigateTo(`/salao/${salon.slug}`)"
        >
          <!-- Image -->
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="salon.coverImage || 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=600&fit=crop'" 
              :alt="salon.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <!-- Featured Badge -->
            <div class="absolute top-4 left-4">
              <span class="badge-lilac flex items-center gap-1">
                <Icon name="lucide:crown" class="w-3 h-3" />
                Destaque
              </span>
            </div>

            <!-- Logo -->
            <div class="absolute -bottom-6 left-4 w-14 h-14 rounded-2xl border-4 border-white overflow-hidden shadow-soft bg-white">
              <img 
                :src="salon.logo || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop'" 
                :alt="salon.name" 
                class="w-full h-full object-cover" 
              />
            </div>
          </div>

          <!-- Content -->
          <div class="p-5 pt-10">
            <div class="flex items-start justify-between mb-2">
              <h3 class="font-semibold text-gray-800 group-hover:text-lilac-600 transition-colors">
                {{ salon.name }}
              </h3>
              <button 
                class="p-1.5 rounded-full hover:bg-rose-50 transition-colors"
                @click.stop="toggleFavorite(salon.id)"
              >
                <Icon 
                  :name="salon.isFavorite ? 'lucide:heart' : 'lucide:heart'" 
                  class="w-5 h-5"
                  :class="salon.isFavorite ? 'text-rose-500 fill-rose-500' : 'text-gray-300'"
                />
              </button>
            </div>

            <p class="text-sm text-gray-500 mb-3 flex items-center gap-1">
              <Icon name="lucide:map-pin" class="w-4 h-4" />
              {{ salon.address || 'Endereço não informado' }}
            </p>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1 text-rose-400">
                  <Icon name="lucide:star" class="w-4 h-4 fill-current" />
                  <span class="font-semibold text-gray-800">{{ salon.rating || 0 }}</span>
                </div>
                <span class="text-xs text-gray-400">({{ salon.reviewCount || 0 }})</span>
              </div>
              
              <span class="badge-status" :class="salon.isOpen ? 'open' : 'closed'">
                <span class="w-1.5 h-1.5 rounded-full" :class="salon.isOpen ? 'bg-emerald-400' : 'bg-red-400'" />
                {{ salon.isOpen ? 'Aberto' : 'Fechado' }}
              </span>
            </div>

            <!-- Services Preview -->
            <div v-if="salon.services?.length" class="mt-4 pt-4 border-t border-lilac-100">
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="service in (salon.services || []).slice(0, 3)" 
                  :key="service"
                  class="px-2.5 py-1 rounded-lg bg-lilac-50 text-xs text-lilac-600 font-medium"
                >
                  {{ service }}
                </span>
                <span v-if="(salon.services || []).length > 3" class="px-2.5 py-1 rounded-lg bg-gray-50 text-xs text-gray-500">
                  +{{ salon.services.length - 3 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  salons?: any[]
}>()

const loading = computed(() => !props.salons)
const displaySalons = computed(() => props.salons || [])

const toggleFavorite = (salonId: string) => {
  const salon = displaySalons.value.find(s => s.id === salonId)
  if (salon) {
    salon.isFavorite = !salon.isFavorite
  }
}
</script>
