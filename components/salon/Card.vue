<template>
  <div 
    class="card-premium overflow-hidden group cursor-pointer"
    @click="navigateTo(`/salao/${salon.slug}`)"
  >
    <!-- Cover Image -->
    <div class="relative h-48 overflow-hidden">
      <img 
        :src="salon.coverImage" 
        :alt="salon.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      <!-- Favorite Button -->
      <button 
        class="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-soft"
        @click.stop="$emit('favorite', salon.id)"
      >
        <Icon 
          name="lucide:heart" 
          class="w-5 h-5"
          :class="salon.isFavorite ? 'text-rose-500 fill-rose-500' : 'text-gray-400'"
        />
      </button>

      <!-- Featured Badge -->
      <div v-if="salon.featured" class="absolute top-3 left-3">
        <span class="badge-lilac flex items-center gap-1">
          <Icon name="lucide:crown" class="w-3 h-3" />
          Destaque
        </span>
      </div>

      <!-- Logo -->
      <div class="absolute -bottom-6 left-4 w-14 h-14 rounded-2xl border-4 border-white overflow-hidden shadow-soft bg-white">
        <img :src="salon.logo" :alt="salon.name" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 pt-10">
      <h3 class="font-semibold text-gray-800 group-hover:text-lilac-600 transition-colors mb-1">
        {{ salon.name }}
      </h3>
      
      <p class="text-sm text-gray-500 flex items-center gap-1 mb-3">
        <Icon name="lucide:map-pin" class="w-4 h-4" />
        {{ salon.address }}
      </p>

      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <Icon name="lucide:star" class="w-4 h-4 text-rose-400 fill-current" />
            <span class="font-semibold text-gray-800">{{ salon.rating }}</span>
          </div>
          <span class="text-xs text-gray-400">({{ salon.reviewCount }} avaliações)</span>
        </div>
        
        <span class="distance-badge">
          <Icon name="lucide:navigation" class="w-3 h-3" />
          {{ salon.distance }}
        </span>
      </div>

      <div class="flex items-center justify-between">
        <span class="badge-status" :class="salon.isOpen ? 'open' : 'closed'">
          <span class="w-1.5 h-1.5 rounded-full" :class="salon.isOpen ? 'bg-emerald-400' : 'bg-red-400'" />
          {{ salon.isOpen ? 'Aberto agora' : 'Fechado' }}
        </span>
      </div>

      <!-- Services Preview -->
      <div class="mt-4 pt-4 border-t border-lilac-100">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="service in salon.services.slice(0, 3)" 
            :key="service"
            class="px-2.5 py-1 rounded-lg bg-lilac-50 text-xs text-lilac-600 font-medium"
          >
            {{ service }}
          </span>
          <span v-if="salon.services.length > 3" class="px-2.5 py-1 rounded-lg bg-gray-50 text-xs text-gray-500">
            +{{ salon.services.length - 3 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Salon {
  id: string
  slug: string
  name: string
  logo: string
  coverImage: string
  address: string
  rating: number
  reviewCount: number
  distance: string
  isOpen: boolean
  isFavorite: boolean
  featured: boolean
  services: string[]
}

defineProps<{
  salon: Salon
}>()

defineEmits<{
  (e: 'favorite', id: string): void
}>()
</script>
