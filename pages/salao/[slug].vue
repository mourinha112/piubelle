<template>
  <div class="min-h-screen">
    <!-- Cover Image -->
    <div class="relative h-64 md:h-80">
      <img 
        :src="salon.coverImage" 
        :alt="salon.name"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-rose-50 via-transparent to-transparent" />
      
      <!-- Back Button -->
      <button 
        @click="$router.back()"
        class="absolute top-20 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-all"
      >
        <Icon name="lucide:arrow-left" class="w-5 h-5 text-gray-700" />
      </button>

      <!-- Actions -->
      <div class="absolute top-20 right-4 flex gap-2">
        <button class="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-all">
          <Icon name="lucide:share-2" class="w-5 h-5 text-gray-700" />
        </button>
        <button 
          class="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-all"
          @click="toggleFavorite"
        >
          <Icon 
            name="lucide:heart" 
            class="w-5 h-5"
            :class="isFavorite ? 'text-rose-500 fill-rose-500' : 'text-gray-700'"
          />
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="container-app -mt-16 relative z-10 pb-44">
      <!-- Header Card -->
      <div class="p-6 rounded-3xl bg-white border border-lilac-100 shadow-soft mb-6">
        <div class="flex items-start gap-4 mb-4">
          <div class="w-20 h-20 rounded-2xl border-4 border-white shadow-soft overflow-hidden bg-white">
            <img :src="salon.logo" :alt="salon.name" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1">
            <h1 class="font-display text-2xl font-semibold text-gray-800">{{ salon.name }}</h1>
            <p class="text-gray-500 text-sm">{{ salon.category }}</p>
            <div class="flex items-center gap-3 mt-2">
              <div class="flex items-center gap-1">
                <Icon name="lucide:star" class="w-4 h-4 text-rose-400 fill-current" />
                <span class="font-semibold text-gray-800">{{ salon.rating }}</span>
                <span class="text-xs text-gray-400">({{ salon.reviewCount }} avaliações)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-4">
          <span class="badge-status" :class="salon.isOpen ? 'open' : 'closed'">
            <span class="w-1.5 h-1.5 rounded-full" :class="salon.isOpen ? 'bg-emerald-400' : 'bg-red-400'" />
            {{ salon.isOpen ? 'Aberto agora' : 'Fechado' }}
          </span>
          <span class="distance-badge">
            <Icon name="lucide:navigation" class="w-3 h-3" />
            {{ salon.distance }}
          </span>
        </div>

        <p class="text-gray-600 text-sm mb-4">{{ salon.description }}</p>

        <div class="flex items-center gap-2 text-sm text-gray-500">
          <Icon name="lucide:map-pin" class="w-4 h-4" />
          <span>{{ salon.address }}</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-4 gap-3 mb-6">
        <button class="p-4 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft flex flex-col items-center gap-2">
          <div class="w-10 h-10 rounded-xl bg-lilac-100 flex items-center justify-center">
            <Icon name="lucide:phone" class="w-5 h-5 text-lilac-600" />
          </div>
          <span class="text-xs text-gray-600">Ligar</span>
        </button>
        <button class="p-4 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft flex flex-col items-center gap-2">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Icon name="mdi:whatsapp" class="w-5 h-5 text-emerald-600" />
          </div>
          <span class="text-xs text-gray-600">WhatsApp</span>
        </button>
        <button class="p-4 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft flex flex-col items-center gap-2">
          <div class="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
            <Icon name="lucide:map" class="w-5 h-5 text-rose-600" />
          </div>
          <span class="text-xs text-gray-600">Mapa</span>
        </button>
        <button class="p-4 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft flex flex-col items-center gap-2">
          <div class="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <Icon name="mdi:instagram" class="w-5 h-5 text-amber-600" />
          </div>
          <span class="text-xs text-gray-600">Instagram</span>
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        <button 
          v-for="tab in tabs"
          :key="tab.id"
          :class="[
            'px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all text-sm',
            activeTab === tab.id 
              ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white' 
              : 'bg-white border border-lilac-100 text-gray-600 hover:border-lilac-200'
          ]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Services Tab -->
      <div v-if="activeTab === 'services'" class="space-y-4">
        <div 
          v-for="service in salon.services"
          :key="service.id"
          class="p-4 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center"
                :style="{ background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}10 100%)` }"
              >
                <Icon :name="service.icon" class="w-6 h-6" :style="{ color: service.color }" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">{{ service.name }}</h3>
                <p class="text-sm text-gray-500">{{ service.duration }} min</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-lilac-600">R$ {{ service.price.toFixed(2) }}</p>
              <button 
                class="mt-1 px-3 py-1 rounded-lg bg-lilac-50 text-lilac-600 text-xs font-medium hover:bg-lilac-100 transition-all"
                @click="selectService(service)"
              >
                Selecionar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Tab -->
      <div v-if="activeTab === 'team'" class="grid grid-cols-2 gap-4">
        <div 
          v-for="professional in salon.team"
          :key="professional.id"
          class="p-4 rounded-2xl bg-white border border-lilac-100 shadow-soft text-center"
        >
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-lilac-200 to-rose-200 flex items-center justify-center mb-3">
            <span class="text-xl font-bold text-lilac-700">{{ professional.name.charAt(0) }}</span>
          </div>
          <h3 class="font-semibold text-gray-800">{{ professional.name }}</h3>
          <p class="text-sm text-gray-500">{{ professional.role }}</p>
          <div class="flex items-center justify-center gap-1 mt-2">
            <Icon name="lucide:star" class="w-4 h-4 text-rose-400 fill-current" />
            <span class="font-medium text-gray-700">{{ professional.rating }}</span>
          </div>
        </div>
      </div>

      <!-- Reviews Tab -->
      <div v-if="activeTab === 'reviews'" class="space-y-4">
        <div 
          v-for="review in salon.reviews"
          :key="review.id"
          class="p-4 rounded-2xl bg-white border border-lilac-100 shadow-soft"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-lilac-200 to-rose-200 flex items-center justify-center">
              <span class="font-bold text-lilac-700">{{ review.client.charAt(0) }}</span>
            </div>
            <div>
              <p class="font-medium text-gray-800">{{ review.client }}</p>
              <div class="flex items-center gap-1">
                <Icon 
                  v-for="i in 5" 
                  :key="i"
                  name="lucide:star" 
                  class="w-3 h-3"
                  :class="i <= review.rating ? 'text-rose-400 fill-current' : 'text-gray-200'"
                />
                <span class="text-xs text-gray-400 ml-1">{{ review.date }}</span>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600">{{ review.comment }}</p>
        </div>
      </div>

      <!-- Info Tab -->
      <div v-if="activeTab === 'info'" class="space-y-4">
        <div class="p-4 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h3 class="font-semibold text-gray-800 mb-3">Horário de Funcionamento</h3>
          <div class="space-y-2">
            <div v-for="day in salon.workingHours" :key="day.day" class="flex justify-between text-sm">
              <span class="text-gray-600">{{ day.label }}</span>
              <span class="font-medium text-gray-800">{{ day.hours }}</span>
            </div>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h3 class="font-semibold text-gray-800 mb-3">Formas de Pagamento</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-lg bg-gray-100 text-sm text-gray-600">Dinheiro</span>
            <span class="px-3 py-1 rounded-lg bg-gray-100 text-sm text-gray-600">PIX</span>
            <span class="px-3 py-1 rounded-lg bg-gray-100 text-sm text-gray-600">Cartão de Crédito</span>
            <span class="px-3 py-1 rounded-lg bg-gray-100 text-sm text-gray-600">Cartão de Débito</span>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h3 class="font-semibold text-gray-800 mb-3">Comodidades</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-lg bg-lilac-50 text-sm text-lilac-600">Wi-Fi</span>
            <span class="px-3 py-1 rounded-lg bg-lilac-50 text-sm text-lilac-600">Ar Condicionado</span>
            <span class="px-3 py-1 rounded-lg bg-lilac-50 text-sm text-lilac-600">Estacionamento</span>
            <span class="px-3 py-1 rounded-lg bg-lilac-50 text-sm text-lilac-600">Café</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Action -->
    <div class="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-lilac-100 safe-bottom z-40">
      <div class="container-app">
        <button 
          @click="openBookingModal"
          class="w-full py-4 rounded-2xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow flex items-center justify-center gap-2"
        >
          <Icon name="lucide:calendar" class="w-5 h-5" />
          Agendar Horário
        </button>
      </div>
    </div>

    <!-- Booking Modal -->
    <UModal v-model="showBookingModal" :ui="{ width: 'max-w-lg' }">
      <div class="p-6">
        <h2 class="text-xl font-display font-semibold text-gray-800 mb-6">Agendar Horário</h2>
        
        <div class="space-y-4">
          <!-- Selected Services -->
          <div v-if="selectedServices.length > 0">
            <label class="block text-sm font-medium text-gray-700 mb-2">Serviços selecionados</label>
            <div class="space-y-2">
              <div 
                v-for="service in selectedServices"
                :key="service.id"
                class="flex items-center justify-between p-3 rounded-xl bg-lilac-50"
              >
                <span class="text-gray-800">{{ service.name }}</span>
                <span class="font-medium text-lilac-600">R$ {{ service.price.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Data</label>
            <input 
              type="date" 
              v-model="bookingDate"
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none transition-all"
            />
          </div>

          <!-- Time -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Horário</label>
            <div class="grid grid-cols-4 gap-2">
              <button 
                v-for="time in availableTimes"
                :key="time"
                :class="[
                  'py-2 rounded-xl text-sm font-medium transition-all',
                  selectedTime === time 
                    ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-lilac-50'
                ]"
                @click="selectedTime = time"
              >
                {{ time }}
              </button>
            </div>
          </div>

          <!-- Professional -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Profissional</label>
            <select class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none">
              <option>Qualquer profissional disponível</option>
              <option v-for="pro in salon.team" :key="pro.id">{{ pro.name }}</option>
            </select>
          </div>

          <!-- Total -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-lilac-50 to-rose-50">
            <span class="font-medium text-gray-700">Total</span>
            <span class="text-xl font-bold text-lilac-600">R$ {{ totalPrice.toFixed(2) }}</span>
          </div>

          <!-- Submit -->
          <button 
            class="w-full py-4 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 transition-all"
          >
            Confirmar Agendamento
          </button>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const activeTab = ref('services')
const showBookingModal = ref(false)
const selectedServices = ref<any[]>([])
const selectedTime = ref('')
const bookingDate = ref('')

const tabs = [
  { id: 'services', label: 'Serviços' },
  { id: 'team', label: 'Equipe' },
  { id: 'reviews', label: 'Avaliações' },
  { id: 'info', label: 'Informações' }
]

const availableTimes = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

// Busca dados do salão pela API
const { data: salonData } = await useAsyncData(`salon-${slug}`, () =>
  $fetch(`/api/salao/${slug}`).catch(() => null)
)

// Dados do salão (usa dados da API ou fallback)
const salon = computed(() => {
  if (salonData.value) {
    return {
      id: salonData.value.id,
      slug: salonData.value.slug,
      name: salonData.value.name,
      category: salonData.value.category || 'Salão de Beleza',
      logo: salonData.value.logo,
      coverImage: salonData.value.coverImage,
      description: salonData.value.description,
      address: salonData.value.address,
      rating: salonData.value.rating,
      reviewCount: salonData.value.reviewCount,
      distance: salonData.value.distance || '---',
      isOpen: salonData.value.isOpen,
      isFavorite: false,
      phone: salonData.value.phone,
      whatsapp: salonData.value.whatsapp,
      services: salonData.value.services || [],
      team: salonData.value.team || [],
      reviews: salonData.value.reviews || [],
      workingHours: salonData.value.workingHours || []
    }
  }
  
  // Fallback se não encontrar
  return {
    id: '',
    slug: slug,
    name: 'Salão não encontrado',
    category: '',
    logo: '',
    coverImage: '',
    description: 'Este salão não foi encontrado.',
    address: '',
    rating: 0,
    reviewCount: 0,
    distance: '',
    isOpen: false,
    isFavorite: false,
    phone: '',
    whatsapp: '',
    services: [],
    team: [],
    reviews: [],
    workingHours: []
  }
})

// Favorito (estado local)
const isFavorite = ref(false)
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const totalPrice = computed(() => {
  return selectedServices.value.reduce((sum, s) => sum + s.price, 0)
})

const selectService = (service: any) => {
  const index = selectedServices.value.findIndex(s => s.id === service.id)
  if (index > -1) {
    selectedServices.value.splice(index, 1)
  } else {
    selectedServices.value.push(service)
  }
}

const openBookingModal = () => {
  showBookingModal.value = true
}

useSeoMeta({
  title: () => `${salon.value.name} - PiuBelle`,
  description: () => salon.value.description
})
</script>
