<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">Link Bio</h1>
        <p class="text-gray-500">Sua página personalizada para redes sociais</p>
      </div>
      <div class="flex gap-3">
        <NuxtLink 
          v-if="currentSalon?.slug"
          :to="`/lp/${currentSalon.slug}`"
          target="_blank"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-lilac-100 text-gray-600 hover:border-lilac-200 transition-all shadow-soft"
        >
          <Icon name="lucide:external-link" class="w-5 h-5" />
          Visualizar
        </NuxtLink>
        <button 
          @click="copyLink"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-lilac-100 text-gray-600 hover:border-lilac-200 transition-all shadow-soft"
        >
          <Icon name="lucide:copy" class="w-5 h-5" />
          {{ copied ? 'Copiado!' : 'Copiar Link' }}
        </button>
        <button 
          @click="saveLinkBio"
          :disabled="saving"
          class="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow disabled:opacity-50"
        >
          <Icon v-if="saving" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
          <Icon v-else name="lucide:save" class="w-5 h-5" />
          {{ saving ? 'Salvando...' : (saved ? 'Salvo!' : 'Salvar') }}
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-lilac-200 border-t-lilac-500 rounded-full animate-spin"></div>
    </div>

    <!-- No Salon State -->
    <div v-else-if="!currentSalon" class="text-center py-12">
      <Icon name="lucide:store" class="w-12 h-12 text-lilac-300 mx-auto mb-3" />
      <p class="text-gray-500">Crie um salão para configurar seu Link Bio</p>
    </div>

    <template v-else>
      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4">
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <p class="text-3xl font-bold text-lilac-600">{{ stats.views }}</p>
          <p class="text-sm text-gray-500">Visualizações</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <p class="text-3xl font-bold text-rose-600">{{ stats.clicks }}</p>
          <p class="text-sm text-gray-500">Cliques em links</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <p class="text-3xl font-bold text-emerald-600">{{ stats.conversionRate }}%</p>
          <p class="text-sm text-gray-500">Taxa de conversão</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Editor -->
        <div class="space-y-6">
          <!-- Profile -->
          <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
            <h2 class="font-display text-xl font-semibold text-gray-800 mb-4">Perfil</h2>
            
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-lilac-200 to-rose-200 flex items-center justify-center overflow-hidden">
                  <img 
                    v-if="linkBio.avatarUrl" 
                    :src="linkBio.avatarUrl" 
                    class="w-full h-full object-cover"
                  />
                  <Icon v-else name="lucide:camera" class="w-8 h-8 text-lilac-500" />
                </div>
                <button class="px-4 py-2 rounded-xl bg-lilac-50 text-lilac-600 font-medium hover:bg-lilac-100 transition-all">
                  Alterar foto
                </button>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <input 
                  type="text" 
                  v-model="linkBio.title"
                  class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea 
                  v-model="linkBio.bio"
                  rows="3"
                  class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <!-- Links -->
          <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-display text-xl font-semibold text-gray-800">Links</h2>
              <button 
                @click="addLink"
                class="px-4 py-2 rounded-xl bg-lilac-50 text-lilac-600 font-medium hover:bg-lilac-100 transition-all"
              >
                + Adicionar
              </button>
            </div>
            
            <div class="space-y-3">
              <div 
                v-for="(link, index) in linkBio.links"
                :key="index"
                class="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
              >
                <Icon name="lucide:grip-vertical" class="w-5 h-5 text-gray-400 cursor-grab" />
                <div class="flex-1">
                  <input 
                    type="text" 
                    v-model="link.title"
                    placeholder="Título do link"
                    class="w-full bg-transparent font-medium text-gray-800 outline-none"
                  />
                  <input 
                    type="url" 
                    v-model="link.url"
                    placeholder="https://..."
                    class="w-full text-sm text-gray-500 bg-transparent outline-none"
                  />
                </div>
                <button 
                  @click="removeLink(index)"
                  class="p-2 rounded-lg hover:bg-white transition-colors"
                >
                  <Icon name="lucide:trash-2" class="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <!-- Empty links state -->
              <div v-if="linkBio.links.length === 0" class="text-center py-6 text-gray-400">
                <Icon name="lucide:link" class="w-8 h-8 mx-auto mb-2" />
                <p class="text-sm">Adicione links para exibir no seu Link Bio</p>
              </div>
            </div>
          </div>

          <!-- Social -->
          <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
            <h2 class="font-display text-xl font-semibold text-gray-800 mb-4">Redes Sociais</h2>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input 
                  type="text" 
                  v-model="linkBio.instagram"
                  placeholder="@seuinstagram"
                  class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input 
                  type="text" 
                  v-model="linkBio.facebook"
                  placeholder="facebook.com/..."
                  class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">TikTok</label>
                <input 
                  type="text" 
                  v-model="linkBio.tiktok"
                  placeholder="@seutiktok"
                  class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                <input 
                  type="text" 
                  v-model="linkBio.whatsapp"
                  placeholder="(00) 00000-0000"
                  class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Preview -->
        <div class="lg:sticky lg:top-24 h-fit">
          <div class="p-4 rounded-2xl bg-gray-100">
            <p class="text-sm text-gray-500 text-center mb-3">Pré-visualização</p>
            
            <!-- Phone Frame -->
            <div class="mx-auto w-72 bg-white rounded-[3rem] p-3 shadow-xl">
              <div class="bg-gradient-to-b from-rose-50 to-lilac-50 rounded-[2.5rem] overflow-hidden min-h-[500px]">
                <!-- Status Bar -->
                <div class="flex justify-between items-center px-6 py-2 text-xs text-gray-500">
                  <span>9:41</span>
                  <div class="flex gap-1">
                    <Icon name="lucide:signal" class="w-3 h-3" />
                    <Icon name="lucide:wifi" class="w-3 h-3" />
                    <Icon name="lucide:battery-full" class="w-3 h-3" />
                  </div>
                </div>

                <!-- Content -->
                <div class="px-6 py-8 text-center">
                  <!-- Avatar -->
                  <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-lilac-400 to-rose-400 flex items-center justify-center overflow-hidden">
                    <img 
                      v-if="linkBio.avatarUrl" 
                      :src="linkBio.avatarUrl" 
                      class="w-full h-full object-cover"
                    />
                    <span v-else class="text-3xl font-bold text-white">{{ getInitials }}</span>
                  </div>

                  <!-- Title -->
                  <h3 class="font-display text-xl font-semibold text-gray-800 mb-1">{{ linkBio.title || 'Seu Salão' }}</h3>
                  <p class="text-sm text-gray-500 mb-6">{{ linkBio.bio || 'Descrição do seu salão' }}</p>

                  <!-- Links -->
                  <div class="space-y-3">
                    <button 
                      v-for="(link, index) in linkBio.links"
                      :key="index"
                      class="w-full py-3 px-4 rounded-xl bg-white border border-lilac-200 text-gray-800 font-medium hover:bg-lilac-50 transition-all shadow-sm"
                    >
                      {{ link.title || 'Link sem título' }}
                    </button>
                  </div>

                  <!-- Social Icons -->
                  <div v-if="hasSocialLinks" class="flex justify-center gap-3 mt-6">
                    <div v-if="linkBio.instagram" class="w-10 h-10 rounded-full bg-gradient-to-br from-lilac-500 to-rose-500 flex items-center justify-center">
                      <Icon name="mdi:instagram" class="w-5 h-5 text-white" />
                    </div>
                    <div v-if="linkBio.whatsapp" class="w-10 h-10 rounded-full bg-gradient-to-br from-lilac-500 to-rose-500 flex items-center justify-center">
                      <Icon name="mdi:whatsapp" class="w-5 h-5 text-white" />
                    </div>
                    <div v-if="linkBio.facebook" class="w-10 h-10 rounded-full bg-gradient-to-br from-lilac-500 to-rose-500 flex items-center justify-center">
                      <Icon name="mdi:facebook" class="w-5 h-5 text-white" />
                    </div>
                    <div v-if="linkBio.tiktok" class="w-10 h-10 rounded-full bg-gradient-to-br from-lilac-500 to-rose-500 flex items-center justify-center">
                      <Icon name="mdi:music-note" class="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <!-- Branding -->
                  <p class="text-xs text-gray-400 mt-8">Feito com 💜 no PiuBelle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'painel'
})

const { authHeaders } = useAuth()
const currentSalon = inject<Ref<any>>('currentSalon')

const loading = ref(true)
const copied = ref(false)
const saving = ref(false)
const saved = ref(false)

const stats = ref({
  views: 0,
  clicks: 0,
  conversionRate: 0
})

const linkBio = ref({
  title: '',
  bio: '',
  avatarUrl: '',
  instagram: '',
  facebook: '',
  tiktok: '',
  whatsapp: '',
  links: [] as { title: string; url: string }[]
})

const getInitials = computed(() => {
  if (!linkBio.value.title) return 'SB'
  const words = linkBio.value.title.split(' ')
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase()
  }
  return words[0].substring(0, 2).toUpperCase()
})

const hasSocialLinks = computed(() => {
  return linkBio.value.instagram || linkBio.value.whatsapp || linkBio.value.facebook || linkBio.value.tiktok
})

// Fetch link bio data
const fetchLinkBio = async () => {
  if (!currentSalon?.value?.id) {
    loading.value = false
    return
  }

  try {
    const { data } = await useFetch(`/api/painel/link-bio?salonId=${currentSalon.value.id}`, {
      headers: authHeaders.value
    })

    if (data.value?.success && data.value.data) {
      const d = data.value.data
      linkBio.value = {
        title: d.title || currentSalon.value.name || '',
        bio: d.bio || '',
        avatarUrl: d.avatarUrl || '',
        instagram: d.instagram || '',
        facebook: d.facebook || '',
        tiktok: d.tiktok || '',
        whatsapp: d.whatsapp || '',
        links: d.links || []
      }
      stats.value = {
        views: d.viewCount || 0,
        clicks: d.clickCount || 0,
        conversionRate: d.viewCount > 0 ? Math.round((d.clickCount / d.viewCount) * 100) : 0
      }
    } else {
      // Initialize with salon data
      linkBio.value.title = currentSalon.value.name || ''
    }
  } catch (error) {
    console.error('Erro ao buscar link bio:', error)
    // Initialize with salon data
    linkBio.value.title = currentSalon?.value?.name || ''
  } finally {
    loading.value = false
  }
}

const saveLinkBio = async () => {
  if (!currentSalon?.value?.id || saving.value) return

  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/painel/link-bio', {
      method: 'POST',
      headers: authHeaders.value,
      body: {
        salonId: currentSalon.value.id,
        ...linkBio.value
      }
    })
    saved.value = true
    setTimeout(() => { saved.value = false }, 2000)
  } catch (error) {
    console.error('Erro ao salvar link bio:', error)
    alert('Erro ao salvar. Tente novamente.')
  } finally {
    saving.value = false
  }
}

const addLink = () => {
  linkBio.value.links.push({ title: '', url: '' })
}

const removeLink = (index: number) => {
  linkBio.value.links.splice(index, 1)
  saveLinkBio()
}

const copyLink = async () => {
  if (!currentSalon?.value?.slug) return
  
  const link = `${window.location.origin}/lp/${currentSalon.value.slug}`
  try {
    await navigator.clipboard.writeText(link)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (error) {
    console.error('Erro ao copiar:', error)
  }
}

// Watch for salon changes
watch(() => currentSalon?.value?.id, () => {
  fetchLinkBio()
}, { immediate: true })

onMounted(() => {
  fetchLinkBio()
})
</script>
