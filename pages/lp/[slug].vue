<template>
  <div 
    class="min-h-screen flex items-center justify-center p-4"
    :style="{ background: linkBio.background }"
  >
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 text-center">
        <!-- Avatar -->
        <div class="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-lilac-400 to-rose-400 flex items-center justify-center shadow-lg">
          <img 
            v-if="linkBio.avatarUrl" 
            :src="linkBio.avatarUrl" 
            class="w-full h-full rounded-full object-cover"
          />
          <span v-else class="text-4xl font-bold text-white">{{ getInitials(linkBio.title) }}</span>
        </div>

        <!-- Title -->
        <h1 class="font-display text-2xl font-bold text-gray-800 mb-2">{{ linkBio.title }}</h1>
        <p class="text-gray-500 mb-8">{{ linkBio.bio }}</p>

        <!-- Links -->
        <div class="space-y-3 mb-8">
          <a 
            v-for="link in linkBio.links"
            :key="link.id"
            :href="link.url"
            target="_blank"
            class="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-lilac-50 to-rose-50 border-2 border-lilac-200 text-gray-800 font-semibold hover:from-lilac-100 hover:to-rose-100 hover:border-lilac-300 transition-all group"
            @click="trackClick(link)"
          >
            <Icon v-if="link.icon" :name="link.icon" class="w-5 h-5 text-lilac-600 group-hover:scale-110 transition-transform" />
            {{ link.title }}
          </a>
        </div>

        <!-- Services (Preview) -->
        <div v-if="linkBio.showServices && services.length > 0" class="mb-8">
          <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Nossos Serviços</h2>
          <div class="grid grid-cols-2 gap-2">
            <div 
              v-for="service in services.slice(0, 4)"
              :key="service.id"
              class="p-3 rounded-xl bg-gray-50 text-center"
            >
              <p class="font-medium text-gray-700 text-sm">{{ service.name }}</p>
              <p class="text-xs text-lilac-600 font-semibold">R$ {{ service.price.toFixed(0) }}</p>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex justify-center gap-4 mb-6">
          <a 
            v-if="linkBio.instagram"
            :href="`https://instagram.com/${linkBio.instagram.replace('@', '')}`"
            target="_blank"
            class="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
          >
            <Icon name="mdi:instagram" class="w-6 h-6" />
          </a>
          <a 
            v-if="linkBio.whatsapp"
            :href="`https://wa.me/55${linkBio.whatsapp.replace(/\D/g, '')}`"
            target="_blank"
            class="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
          >
            <Icon name="mdi:whatsapp" class="w-6 h-6" />
          </a>
          <a 
            v-if="linkBio.facebook"
            :href="`https://facebook.com/${linkBio.facebook}`"
            target="_blank"
            class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white hover:scale-110 transition-transform"
          >
            <Icon name="mdi:facebook" class="w-6 h-6" />
          </a>
          <a 
            v-if="linkBio.tiktok"
            :href="`https://tiktok.com/${linkBio.tiktok}`"
            target="_blank"
            class="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white hover:scale-110 transition-transform"
          >
            <Icon name="mdi:music-note" class="w-6 h-6" />
          </a>
        </div>

        <!-- Location -->
        <div v-if="linkBio.showLocation && linkBio.address" class="p-4 rounded-xl bg-gray-50 text-left mb-6">
          <div class="flex items-start gap-3">
            <Icon name="lucide:map-pin" class="w-5 h-5 text-lilac-500 mt-0.5" />
            <div>
              <p class="font-medium text-gray-700">{{ linkBio.address }}</p>
              <p class="text-sm text-gray-500">{{ linkBio.city }}</p>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <NuxtLink 
          :to="`/salao/${route.params.slug}`"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-bold text-lg hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
        >
          <Icon name="lucide:calendar" class="w-5 h-5" />
          Agendar Agora
        </NuxtLink>

        <!-- Branding -->
        <p class="text-xs text-gray-400 mt-8">
          Feito com 💜 no 
          <NuxtLink to="/" class="text-lilac-500 hover:text-lilac-600">PiuBelle</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const slug = route.params.slug as string

// Busca dados do salão pela API
const { data: salonData } = await useAsyncData(`lp-${slug}`, () =>
  $fetch(`/api/salao/${slug}`).catch(() => null)
)

// Dados do Link Bio (usa dados da API ou fallback)
const linkBio = computed(() => {
  if (salonData.value) {
    return {
      title: salonData.value.title || salonData.value.name,
      bio: salonData.value.bio || salonData.value.description,
      avatarUrl: salonData.value.avatarUrl || salonData.value.logo,
      background: salonData.value.background || 'linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #fff1f2 100%)',
      showServices: salonData.value.showServices ?? true,
      showLocation: salonData.value.showLocation ?? true,
      showReviews: salonData.value.showReviews ?? true,
      instagram: salonData.value.instagram,
      facebook: salonData.value.facebook,
      whatsapp: salonData.value.whatsapp,
      tiktok: salonData.value.tiktok,
      address: salonData.value.address,
      city: salonData.value.city,
      links: salonData.value.links || []
    }
  }
  // Fallback se não encontrar
  return {
    title: 'Salão não encontrado',
    bio: '',
    avatarUrl: null,
    background: 'linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #fff1f2 100%)',
    showServices: false,
    showLocation: false,
    showReviews: false,
    instagram: '',
    facebook: '',
    whatsapp: '',
    tiktok: '',
    address: '',
    city: '',
    links: []
  }
})

const services = computed(() => salonData.value?.services?.slice(0, 4) || [])

const getInitials = (name: string) => {
  const words = name.split(' ')
  if (words.length >= 2) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
  }
  return words[0].substring(0, 2).toUpperCase()
}

const trackClick = (link: any) => {
  // Registrar clique para analytics
  console.log('Link clicked:', link.title)
}

// SEO
useSeoMeta({
  title: () => `${linkBio.value.title} - PiuBelle`,
  description: () => linkBio.value.bio,
  ogTitle: () => linkBio.value.title,
  ogDescription: () => linkBio.value.bio
})
</script>
