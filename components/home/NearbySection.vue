<template>
  <section class="py-6">
    <div class="container-app">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="font-display text-2xl font-semibold text-gray-800">
            📍 Perto de você
          </h2>
          <p class="text-sm text-gray-500 mt-1">Salões na sua região</p>
        </div>
        <NuxtLink to="/buscar?nearby=true" class="text-sm text-lilac-600 font-medium hover:text-lilac-700 flex items-center gap-1">
          Ver mapa
          <Icon name="lucide:map" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="h-28 rounded-2xl bg-gray-100 animate-pulse"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="displaySalons.length === 0" class="text-center py-12">
        <Icon name="lucide:map-pin" class="w-12 h-12 text-lilac-300 mx-auto mb-3" />
        <p class="text-gray-500">Nenhum salão encontrado</p>
      </div>

      <!-- Salons List -->
      <div v-else class="space-y-4">
        <div 
          v-for="salon in displaySalons" 
          :key="salon.id"
          class="flex gap-4 p-4 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 hover:shadow-soft transition-all cursor-pointer group"
          @click="navigateTo(`/salao/${salon.slug}`)"
        >
          <!-- Image -->
          <div class="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <img 
              v-if="salon.logo || salon.coverImage" 
              :src="salon.logo || salon.coverImage" 
              :alt="salon.name" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              <div class="text-center">
                <Icon name="lucide:image-off" class="w-6 h-6 mx-auto opacity-60" />
                <span class="text-[10px] font-medium leading-tight block mt-0.5">Sem foto</span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-semibold text-gray-800 group-hover:text-lilac-600 transition-colors truncate">
                  {{ salon.name }}
                </h3>
                <p class="text-sm text-gray-500 truncate">{{ salon.category || 'Salão de Beleza' }}</p>
              </div>
              <span v-if="salon.distance" class="distance-badge">
                <Icon name="lucide:navigation" class="w-3 h-3" />
                {{ salon.distance }}
              </span>
            </div>

            <div class="flex items-center gap-3 mt-2">
              <div class="flex items-center gap-1">
                <Icon name="lucide:star" class="w-4 h-4 text-rose-400 fill-current" />
                <span class="font-medium text-gray-800">{{ salon.rating || 0 }}</span>
                <span class="text-xs text-gray-400">({{ salon.reviewCount || 0 }})</span>
              </div>
              <span class="w-1 h-1 rounded-full bg-gray-300" />
              <span class="badge-status text-xs" :class="salon.isOpen ? 'open' : 'closed'">
                {{ salon.isOpen ? 'Aberto' : 'Fechado' }}
              </span>
            </div>

            <div v-if="salon.tags?.length || salon.services?.length" class="flex items-center gap-2 mt-2">
              <span 
                v-for="tag in (salon.tags || salon.services || []).slice(0, 2)" 
                :key="tag"
                class="px-2 py-0.5 rounded-md bg-lilac-50 text-xs text-lilac-600"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <NuxtLink 
        to="/buscar"
        class="block w-full mt-6 py-4 rounded-xl border-2 border-dashed border-lilac-200 text-lilac-600 font-medium hover:border-lilac-300 hover:bg-lilac-50 transition-all text-center"
      >
        Ver mais salões
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  salons?: any[]
}>()

const loading = computed(() => !props.salons)
const displaySalons = computed(() => props.salons || [])
</script>
