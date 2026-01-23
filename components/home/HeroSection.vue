<template>
  <section class="relative py-8 overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-lilac-300/20 rounded-full blur-[120px]" />
      <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-rose-300/15 rounded-full blur-[100px]" />
    </div>

    <div class="container-app relative">
      <!-- Greeting -->
      <div class="mb-6 fade-in-up">
        <p class="text-gray-500 text-sm mb-1">{{ greeting }} ✨</p>
        <h1 class="font-display text-4xl md:text-5xl font-semibold text-gray-800 leading-tight">
          Realce sua <span class="text-lilac-gradient">beleza</span><span class="text-rose-400">.</span>
        </h1>
        <p class="text-gray-500 mt-3">{{ formattedDate }}</p>
      </div>

      <!-- Search Bar -->
      <div class="relative mb-8 fade-in-up stagger-1 animate-hidden">
        <div class="relative">
          <Icon name="lucide:search" class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Encontre seu salão perfeito..."
            class="w-full pl-14 pr-28 py-5 rounded-2xl bg-white border-2 border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-300 focus:ring-4 focus:ring-lilac-100 outline-none transition-all shadow-soft text-base"
            @focus="showSearchSuggestions = true"
          />
          <button 
            class="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold text-sm hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
          >
            Buscar
          </button>
        </div>

        <!-- Search Suggestions -->
        <Transition name="slide-down">
          <div 
            v-if="showSearchSuggestions && searchQuery"
            class="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-white border border-lilac-100 shadow-soft-lg z-10"
          >
            <button 
              v-for="suggestion in filteredSuggestions" 
              :key="suggestion"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-lilac-50 hover:to-rose-50 transition-colors text-left"
              @click="selectSuggestion(suggestion)"
            >
              <Icon name="lucide:search" class="w-4 h-4 text-lilac-500" />
              <span class="text-sm text-gray-600">{{ suggestion }}</span>
            </button>
          </div>
        </Transition>
      </div>

      <!-- Quick Filters -->
      <div class="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2 fade-in-up stagger-2 animate-hidden">
        <button 
          v-for="filter in quickFilters" 
          :key="filter.id"
          :class="[
            'flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap transition-all font-medium',
            activeFilter === filter.id 
              ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white shadow-glow' 
              : 'bg-white border border-lilac-100 text-gray-600 hover:border-lilac-200 hover:bg-lilac-50 shadow-soft'
          ]"
          @click="activeFilter = filter.id"
        >
          <Icon :name="filter.icon" class="w-4 h-4" />
          {{ filter.label }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const searchQuery = ref('')
const showSearchSuggestions = ref(false)
const activeFilter = ref('all')

const suggestions = [
  'Corte feminino',
  'Manicure e pedicure',
  'Hidratação capilar',
  'Design de sobrancelhas',
  'Massagem relaxante',
  'Maquiagem profissional'
]

const quickFilters = [
  { id: 'all', icon: 'lucide:sparkles', label: 'Todos' },
  { id: 'nearby', icon: 'lucide:map-pin', label: 'Próximos' },
  { id: 'open', icon: 'lucide:clock', label: 'Abertos agora' },
  { id: 'top-rated', icon: 'lucide:star', label: 'Melhores' },
  { id: 'promo', icon: 'lucide:percent', label: 'Promoções' }
]

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
})

const formattedDate = computed(() => {
  return format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })
})

const filteredSuggestions = computed(() => {
  return suggestions.filter(s => 
    s.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion
  showSearchSuggestions.value = false
}

// Close suggestions when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      showSearchSuggestions.value = false
    }
  })
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
