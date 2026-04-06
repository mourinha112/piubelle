<template>
  <div class="min-h-screen py-6">
    <div class="container-app max-w-3xl">
      <!-- Back Button -->
      <NuxtLink
        to="/perfil"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-lilac-100 text-gray-600 font-medium hover:border-lilac-200 transition-all shadow-soft mb-6"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4" />
        Voltar ao perfil
      </NuxtLink>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-display font-semibold text-gray-800">Meus Favoritos</h1>
        <p class="text-gray-500 mt-1">Saloes que voce curtiu</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft animate-pulse">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-xl bg-gray-200" />
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-1/3" />
              <div class="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>

      <!-- Favorites List -->
      <div v-else-if="favorites.length > 0" class="space-y-4">
        <div
          v-for="salon in favorites"
          :key="salon.id"
          class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft hover:shadow-md transition-all"
        >
          <div class="flex items-center gap-4">
            <!-- Salon Image -->
            <NuxtLink :to="`/salao/${salon.slug}`" class="flex-shrink-0">
              <div class="w-16 h-16 rounded-xl overflow-hidden border border-lilac-100 bg-gray-50">
                <img
                  v-if="salon.logoUrl"
                  :src="salon.logoUrl"
                  :alt="salon.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gradient-to-br from-lilac-400 to-rose-400 flex items-center justify-center">
                  <Icon name="lucide:sparkles" class="w-6 h-6 text-white" />
                </div>
              </div>
            </NuxtLink>

            <!-- Salon Info -->
            <div class="flex-1 min-w-0">
              <NuxtLink :to="`/salao/${salon.slug}`" class="block">
                <h3 class="font-semibold text-gray-800 truncate hover:text-lilac-600 transition-colors">
                  {{ salon.name }}
                </h3>
              </NuxtLink>
              <p v-if="salon.address" class="text-sm text-gray-500 truncate mt-0.5">
                <Icon name="lucide:map-pin" class="w-3.5 h-3.5 inline" />
                {{ salon.address }}
              </p>
              <div v-if="salon.rating" class="flex items-center gap-1 mt-1">
                <Icon name="lucide:star" class="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span class="text-sm text-gray-600 font-medium">{{ salon.rating.toFixed(1) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <NuxtLink
                :to="`/salao/${salon.slug}`"
                class="px-4 py-2 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white text-sm font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
              >
                Agendar
              </NuxtLink>
              <button
                class="p-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-all"
                title="Remover dos favoritos"
                @click="removeFavorite(salon.id)"
              >
                <Icon name="lucide:heart-off" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 rounded-2xl bg-white border border-lilac-100 shadow-soft text-center">
        <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-lilac-100 to-rose-100 flex items-center justify-center">
          <Icon name="lucide:heart" class="w-10 h-10 text-lilac-400" />
        </div>
        <h2 class="text-xl font-display font-semibold text-gray-800 mb-2">Nenhum favorito ainda</h2>
        <p class="text-gray-500 mb-6">Explore saloes e marque seus favoritos para encontra-los facilmente.</p>
        <NuxtLink
          to="/buscar"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
        >
          <Icon name="lucide:search" class="w-5 h-5" />
          Buscar saloes
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { authHeaders } = useAuth()

interface FavoriteSalon {
  id: string
  name: string
  slug: string
  logoUrl?: string
  address?: string
  rating?: number
}

const favorites = ref<FavoriteSalon[]>([])
const loading = ref(true)

const fetchFavorites = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/favorites', {
      headers: authHeaders.value
    }) as any

    favorites.value = response.data || response.favorites || []
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error)
  } finally {
    loading.value = false
  }
}

const removeFavorite = async (salonId: string) => {
  try {
    await $fetch(`/api/favorites/${salonId}`, {
      method: 'DELETE',
      headers: authHeaders.value
    })

    favorites.value = favorites.value.filter(s => s.id !== salonId)
  } catch (error) {
    console.error('Erro ao remover favorito:', error)
    alert('Erro ao remover favorito')
  }
}

onMounted(() => {
  fetchFavorites()
})
</script>
