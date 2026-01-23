<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">Avaliações</h1>
        <p class="text-gray-500">Veja o que seus clientes estão dizendo</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-lilac-200 border-t-lilac-500 rounded-full animate-spin"></div>
    </div>

    <template v-else>
      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-lilac-500 to-rose-500 text-white">
          <p class="text-lilac-100 mb-2">Avaliação média</p>
          <div class="flex items-center gap-2">
            <span class="text-5xl font-bold">{{ stats.average.toFixed(1) }}</span>
            <Icon name="lucide:star" class="w-8 h-8 fill-current" />
          </div>
          <p class="text-sm text-lilac-100 mt-2">{{ stats.total }} avaliações</p>
        </div>

        <div class="md:col-span-3 p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="space-y-3">
            <div v-for="rating in ratingDistribution" :key="rating.stars" class="flex items-center gap-3">
              <div class="flex items-center gap-1 w-16">
                <span class="text-gray-600">{{ rating.stars }}</span>
                <Icon name="lucide:star" class="w-4 h-4 text-amber-400 fill-current" />
              </div>
              <div class="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                <div 
                  class="h-full rounded-full bg-gradient-to-r from-lilac-400 to-rose-400"
                  :style="{ width: `${rating.percentage}%` }"
                />
              </div>
              <span class="text-sm text-gray-500 w-12 text-right">{{ rating.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="reviews.length === 0" class="text-center py-12">
        <Icon name="lucide:star" class="w-12 h-12 text-lilac-300 mx-auto mb-3" />
        <p class="text-gray-500">Nenhuma avaliação ainda</p>
        <p class="text-sm text-gray-400 mt-1">As avaliações dos seus clientes aparecerão aqui</p>
      </div>

      <!-- Reviews List -->
      <div v-else class="space-y-4">
        <div 
          v-for="review in reviews"
          :key="review.id"
          class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-lilac-200 to-rose-200 flex items-center justify-center">
                <span class="font-bold text-lilac-700">{{ review.clientName?.charAt(0) || '?' }}</span>
              </div>
              <div>
                <p class="font-semibold text-gray-800">{{ review.clientName }}</p>
                <div class="flex items-center gap-2">
                  <div class="flex">
                    <Icon 
                      v-for="i in 5" 
                      :key="i"
                      name="lucide:star" 
                      class="w-4 h-4"
                      :class="i <= review.rating ? 'text-amber-400 fill-current' : 'text-gray-200'"
                    />
                  </div>
                  <span class="text-sm text-gray-500">{{ formatDate(review.createdAt) }}</span>
                </div>
              </div>
            </div>
            <span class="text-sm text-gray-500">{{ review.serviceName }}</span>
          </div>

          <p class="text-gray-600 mb-4">{{ review.comment }}</p>

          <div v-if="review.ownerResponse" class="p-4 rounded-xl bg-lilac-50 ml-8">
            <p class="text-sm text-gray-500 mb-1">Sua resposta:</p>
            <p class="text-gray-700">{{ review.ownerResponse }}</p>
          </div>

          <div v-else class="flex gap-2 mt-4">
            <button 
              @click="openReplyModal(review)"
              class="px-4 py-2 rounded-xl bg-lilac-50 text-lilac-600 text-sm font-medium hover:bg-lilac-100 transition-all"
            >
              Responder
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- Reply Modal -->
    <div v-if="showReplyModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-xl font-display font-semibold text-gray-800">Responder Avaliação</h3>
        </div>
        
        <div class="p-6">
          <div class="mb-4 p-4 rounded-xl bg-gray-50">
            <p class="text-sm text-gray-500 mb-1">{{ selectedReview?.clientName }}</p>
            <p class="text-gray-700">{{ selectedReview?.comment }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sua resposta</label>
            <textarea 
              v-model="replyText"
              rows="4"
              placeholder="Escreva sua resposta..."
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none resize-none"
            />
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <button 
            @click="showReplyModal = false"
            class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button 
            @click="sendReply"
            :disabled="!replyText.trim()"
            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

definePageMeta({
  layout: 'painel'
})

const { authHeaders } = useAuth()
const currentSalon = inject('currentSalon') as Ref<any>

const loading = ref(true)
const reviews = ref<any[]>([])
const showReplyModal = ref(false)
const selectedReview = ref<any>(null)
const replyText = ref('')

const stats = ref({
  average: 0,
  total: 0
})

const ratingDistribution = ref([
  { stars: 5, count: 0, percentage: 0 },
  { stars: 4, count: 0, percentage: 0 },
  { stars: 3, count: 0, percentage: 0 },
  { stars: 2, count: 0, percentage: 0 },
  { stars: 1, count: 0, percentage: 0 }
])

const formatDate = (dateStr: string) => {
  try {
    return format(new Date(dateStr), "dd/MM/yyyy", { locale: ptBR })
  } catch {
    return dateStr
  }
}

const loadReviews = async () => {
  if (!currentSalon.value?.id) {
    loading.value = false
    return
  }

  loading.value = true
  try {
    const res = await $fetch(`/api/painel/reviews?salonId=${currentSalon.value.id}`, {
      headers: authHeaders.value
    })
    
    if ((res as any).success) {
      reviews.value = (res as any).data || []
      calculateStats()
    }
  } catch (error) {
    console.error('Erro ao carregar avaliações:', error)
  } finally {
    loading.value = false
  }
}

const calculateStats = () => {
  if (reviews.value.length === 0) {
    stats.value = { average: 0, total: 0 }
    return
  }

  const total = reviews.value.length
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
  const average = sum / total

  // Calculate distribution
  const distribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.value.filter(r => r.rating === stars).length
    return {
      stars,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }
  })

  stats.value = { average, total }
  ratingDistribution.value = distribution
}

const openReplyModal = (review: any) => {
  selectedReview.value = review
  replyText.value = ''
  showReplyModal.value = true
}

const sendReply = async () => {
  if (!selectedReview.value || !replyText.value.trim()) return

  try {
    await $fetch(`/api/painel/reviews/${selectedReview.value.id}`, {
      method: 'PUT',
      headers: authHeaders.value,
      body: { ownerResponse: replyText.value }
    })

    // Update local
    const review = reviews.value.find(r => r.id === selectedReview.value.id)
    if (review) {
      review.ownerResponse = replyText.value
    }

    showReplyModal.value = false
  } catch (error) {
    console.error('Erro ao enviar resposta:', error)
  }
}

watch(() => currentSalon.value?.id, () => {
  loadReviews()
}, { immediate: true })

onMounted(() => {
  loadReviews()
})
</script>
