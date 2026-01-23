<template>
  <div 
    class="flex gap-4 p-4 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 hover:shadow-soft transition-all cursor-pointer group"
    @click="navigateTo(`/salao/${salon.slug}`)"
  >
    <!-- Image -->
    <div class="flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden">
      <img :src="salon.coverImage" :alt="salon.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-semibold text-gray-800 group-hover:text-lilac-600 transition-colors">
            {{ salon.name }}
          </h3>
          <p class="text-sm text-gray-500 truncate">{{ salon.address }}</p>
        </div>
        <button 
          class="p-1.5 rounded-full hover:bg-rose-50 transition-colors"
          @click.stop="$emit('favorite', salon.id)"
        >
          <Icon 
            name="lucide:heart" 
            class="w-5 h-5"
            :class="salon.isFavorite ? 'text-rose-500 fill-rose-500' : 'text-gray-300'"
          />
        </button>
      </div>

      <div class="flex items-center gap-3 mt-2">
        <div class="flex items-center gap-1">
          <Icon name="lucide:star" class="w-4 h-4 text-rose-400 fill-current" />
          <span class="font-medium text-gray-800">{{ salon.rating }}</span>
          <span class="text-xs text-gray-400">({{ salon.reviewCount }})</span>
        </div>
        <span class="w-1 h-1 rounded-full bg-gray-300" />
        <span class="distance-badge text-xs">
          <Icon name="lucide:navigation" class="w-3 h-3" />
          {{ salon.distance }}
        </span>
      </div>

      <div class="flex items-center justify-between mt-3">
        <div class="flex flex-wrap gap-1.5">
          <span 
            v-for="service in salon.services.slice(0, 2)" 
            :key="service"
            class="px-2 py-0.5 rounded-md bg-lilac-50 text-xs text-lilac-600"
          >
            {{ service }}
          </span>
        </div>
        <span class="badge-status text-xs" :class="salon.isOpen ? 'open' : 'closed'">
          {{ salon.isOpen ? 'Aberto' : 'Fechado' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Salon {
  id: string
  slug: string
  name: string
  coverImage: string
  address: string
  rating: number
  reviewCount: number
  distance: string
  isOpen: boolean
  isFavorite: boolean
  services: string[]
}

defineProps<{
  salon: Salon
}>()

defineEmits<{
  (e: 'favorite', id: string): void
}>()
</script>
