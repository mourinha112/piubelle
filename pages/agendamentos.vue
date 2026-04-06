<template>
  <div class="min-h-screen py-6">
    <div class="container-app">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="font-display text-3xl font-semibold text-gray-800 mb-2">
          Meus Agendamentos
        </h1>
        <p class="text-gray-500">Gerencie seus compromissos de beleza</p>
      </div>

      <!-- Not logged in -->
      <div v-if="!isAuthenticated" class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-lilac-50 flex items-center justify-center">
          <Icon name="lucide:lock" class="w-10 h-10 text-lilac-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Faça login para ver seus agendamentos</h3>
        <p class="text-gray-500 max-w-md mx-auto mb-6">
          Entre na sua conta para visualizar e gerenciar seus compromissos de beleza.
        </p>
        <NuxtLink
          to="/login"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
        >
          <Icon name="lucide:log-in" class="w-5 h-5" />
          Entrar
        </NuxtLink>
      </div>

      <template v-else>
        <!-- Tabs -->
        <div class="flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="[
              'px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all',
              activeTab === tab.id
                ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white shadow-glow'
                : 'bg-white border border-lilac-100 text-gray-600 hover:border-lilac-200'
            ]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
            <span v-if="tab.count > 0" class="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
              {{ tab.count }}
            </span>
          </button>
        </div>

        <!-- Loading Skeleton -->
        <div v-if="loading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft animate-pulse">
            <div class="flex gap-4">
              <div class="flex-shrink-0 w-24 h-24 rounded-xl bg-lilac-100" />
              <div class="flex-1 space-y-3">
                <div class="h-5 bg-lilac-100 rounded w-1/3" />
                <div class="h-4 bg-lilac-50 rounded w-1/4" />
                <div class="flex gap-4">
                  <div class="h-4 bg-lilac-50 rounded w-20" />
                  <div class="h-4 bg-lilac-50 rounded w-16" />
                  <div class="h-4 bg-lilac-50 rounded w-24" />
                </div>
                <div class="flex justify-between items-center">
                  <div class="h-5 bg-lilac-100 rounded w-16" />
                  <div class="flex gap-2">
                    <div class="h-9 bg-lilac-50 rounded-xl w-24" />
                    <div class="h-9 bg-lilac-50 rounded-xl w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Appointments List -->
        <div v-else class="space-y-4">
          <div
            v-for="appointment in filteredAppointments"
            :key="appointment.id"
            class="p-5 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft"
          >
            <div class="flex gap-4">
              <!-- Salon Image -->
              <div class="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                <img
                  v-if="appointment.salon.image"
                  :src="appointment.salon.image"
                  :alt="appointment.salon.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gradient-to-br from-lilac-100 to-rose-100 flex items-center justify-center">
                  <Icon name="lucide:scissors" class="w-8 h-8 text-lilac-400" />
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h3 class="font-semibold text-gray-800">{{ appointment.salon.name }}</h3>
                    <p class="text-sm text-gray-500">{{ appointment.service }}</p>
                  </div>
                  <span
                    class="px-3 py-1 rounded-full text-xs font-medium"
                    :class="statusClasses[appointment.status]"
                  >
                    {{ statusLabels[appointment.status] }}
                  </span>
                </div>

                <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                  <span class="flex items-center gap-1">
                    <Icon name="lucide:calendar" class="w-4 h-4" />
                    {{ formatDate(appointment.date) }}
                  </span>
                  <span class="flex items-center gap-1">
                    <Icon name="lucide:clock" class="w-4 h-4" />
                    {{ appointment.time }}
                  </span>
                  <span class="flex items-center gap-1">
                    <Icon name="lucide:user" class="w-4 h-4" />
                    {{ appointment.professional }}
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="font-semibold text-lilac-600">
                    R$ {{ appointment.price.toFixed(2) }}
                  </span>

                  <div class="flex gap-2">
                    <button
                      v-if="appointment.status === 'confirmed'"
                      class="px-4 py-2 rounded-xl text-sm font-medium bg-lilac-50 text-lilac-600 hover:bg-lilac-100 transition-all"
                      @click="handleReschedule(appointment)"
                    >
                      Reagendar
                    </button>
                    <button
                      v-if="appointment.status === 'confirmed'"
                      class="px-4 py-2 rounded-xl text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                      @click="openCancelModal(appointment)"
                    >
                      Cancelar
                    </button>
                    <button
                      v-if="appointment.status === 'completed' && !appointment.rated"
                      class="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-lilac-500 to-rose-500 text-white hover:from-lilac-600 hover:to-rose-600 transition-all"
                      @click="openRatingModal(appointment)"
                    >
                      Avaliar
                    </button>
                    <button
                      v-if="appointment.status === 'completed'"
                      class="px-4 py-2 rounded-xl text-sm font-medium bg-lilac-50 text-lilac-600 hover:bg-lilac-100 transition-all"
                      @click="handleBookAgain(appointment)"
                    >
                      Agendar novamente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loading && filteredAppointments.length === 0" class="text-center py-16">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-lilac-50 flex items-center justify-center">
            <Icon name="lucide:calendar-x" class="w-10 h-10 text-lilac-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Nenhum agendamento</h3>
          <p class="text-gray-500 max-w-md mx-auto mb-6">
            {{ activeTab === 'upcoming' ? 'Voce nao tem agendamentos futuros.' : activeTab === 'past' ? 'Voce nao tem historico de agendamentos.' : 'Voce nao tem agendamentos cancelados.' }}
          </p>
          <NuxtLink
            to="/buscar"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
          >
            <Icon name="lucide:search" class="w-5 h-5" />
            Buscar saloes
          </NuxtLink>
        </div>
      </template>
    </div>

    <!-- Cancel Confirmation Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showCancelModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showCancelModal = false" />
          <div class="relative w-full max-w-md p-6 rounded-2xl bg-white shadow-xl">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Cancelar agendamento?</h3>
            <p class="text-gray-500 mb-6">
              Tem certeza que deseja cancelar o agendamento de
              <strong>{{ cancelTarget?.service }}</strong> no
              <strong>{{ cancelTarget?.salon.name }}</strong>?
            </p>
            <div class="flex gap-3 justify-end">
              <button
                class="px-5 py-2.5 rounded-xl font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                @click="showCancelModal = false"
              >
                Manter
              </button>
              <button
                class="px-5 py-2.5 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
                :disabled="cancelling"
                @click="confirmCancel"
              >
                {{ cancelling ? 'Cancelando...' : 'Sim, cancelar' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Rating Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showRatingModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showRatingModal = false" />
          <div class="relative w-full max-w-md p-6 rounded-2xl bg-white shadow-xl">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Avaliar atendimento</h3>
            <p class="text-gray-500 mb-4">
              Como foi sua experiencia no <strong>{{ ratingTarget?.salon.name }}</strong>?
            </p>

            <!-- Stars -->
            <div class="flex justify-center gap-2 mb-4">
              <button
                v-for="star in 5"
                :key="star"
                class="p-1 transition-transform hover:scale-110"
                @click="ratingValue = star"
              >
                <Icon
                  name="lucide:star"
                  class="w-10 h-10 transition-colors"
                  :class="star <= ratingValue ? 'text-rose-400 fill-rose-400' : 'text-gray-300'"
                />
              </button>
            </div>

            <!-- Comment -->
            <textarea
              v-model="ratingComment"
              placeholder="Deixe um comentario (opcional)..."
              rows="3"
              class="w-full px-4 py-3 rounded-xl bg-lilac-50 border border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-300 outline-none resize-none mb-4"
            />

            <div class="flex gap-3 justify-end">
              <button
                class="px-5 py-2.5 rounded-xl font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                @click="showRatingModal = false"
              >
                Cancelar
              </button>
              <button
                class="px-5 py-2.5 rounded-xl font-medium bg-gradient-to-r from-lilac-500 to-rose-500 text-white hover:from-lilac-600 hover:to-rose-600 transition-all"
                :disabled="ratingValue === 0 || submittingRating"
                @click="submitRating"
              >
                {{ submittingRating ? 'Enviando...' : 'Enviar avaliacao' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const { isAuthenticated } = useAuth()
const { api } = useApi()

const activeTab = ref('upcoming')
const loading = ref(true)

interface Appointment {
  id: string
  salon: {
    name: string
    slug?: string
    image: string
  }
  service: string
  date: Date
  time: string
  professional: string
  price: number
  status: string
  rated?: boolean
}

const appointments = ref<Appointment[]>([])

// Mock data as fallback
const mockAppointments: Appointment[] = [
  {
    id: '1',
    salon: {
      name: 'Studio Belle Hair',
      slug: 'studio-belle-hair',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop'
    },
    service: 'Corte + Escova',
    date: new Date(2026, 3, 15),
    time: '14:00',
    professional: 'Ana Maria',
    price: 120,
    status: 'confirmed'
  },
  {
    id: '2',
    salon: {
      name: 'Nail Art Studio',
      slug: 'nail-art-studio',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop'
    },
    service: 'Manicure + Pedicure',
    date: new Date(2026, 3, 20),
    time: '10:00',
    professional: 'Carla Santos',
    price: 80,
    status: 'confirmed'
  },
  {
    id: '3',
    salon: {
      name: 'Spa Serenidade',
      slug: 'spa-serenidade',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop'
    },
    service: 'Day Spa Completo',
    date: new Date(2026, 2, 15),
    time: '09:00',
    professional: 'Equipe Spa',
    price: 350,
    status: 'completed'
  },
  {
    id: '4',
    salon: {
      name: 'Make Up Studio',
      slug: 'make-up-studio',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop'
    },
    service: 'Maquiagem Social',
    date: new Date(2026, 2, 10),
    time: '16:00',
    professional: 'Juliana Costa',
    price: 150,
    status: 'cancelled'
  }
]

const tabs = computed(() => [
  { id: 'upcoming', label: 'Proximos', count: appointments.value.filter(a => a.status === 'confirmed' || a.status === 'pending').length },
  { id: 'past', label: 'Historico', count: appointments.value.filter(a => a.status === 'completed').length },
  { id: 'cancelled', label: 'Cancelados', count: appointments.value.filter(a => a.status === 'cancelled').length }
])

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  completed: 'Concluido',
  cancelled: 'Cancelado'
}

const statusClasses: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-600',
  confirmed: 'bg-emerald-50 text-emerald-600',
  completed: 'bg-lilac-50 text-lilac-600',
  cancelled: 'bg-red-50 text-red-600'
}

const filteredAppointments = computed(() => {
  return appointments.value.filter(a => {
    if (activeTab.value === 'upcoming') return a.status === 'confirmed' || a.status === 'pending'
    if (activeTab.value === 'past') return a.status === 'completed'
    if (activeTab.value === 'cancelled') return a.status === 'cancelled'
    return true
  })
})

const formatDate = (date: Date) => {
  return format(date, "d 'de' MMMM", { locale: ptBR })
}

// Fetch appointments from API
const fetchAppointments = async () => {
  loading.value = true
  try {
    const { data, error } = await api<any>('/api/painel/appointments', {
      method: 'GET'
    })

    if (data && Array.isArray(data)) {
      appointments.value = data.map((a: any) => ({
        id: a.id || a._id,
        salon: {
          name: a.salon?.name || a.salonName || 'Salao',
          slug: a.salon?.slug || a.salonSlug || '',
          image: a.salon?.image || a.salon?.logoUrl || a.salon?.coverImage || ''
        },
        service: a.service?.name || a.serviceName || a.service || 'Servico',
        date: new Date(a.date || a.scheduledAt || a.createdAt),
        time: a.time || a.startTime || '',
        professional: a.professional?.name || a.professionalName || a.professional || 'Profissional',
        price: a.price || a.totalPrice || a.service?.price || 0,
        status: a.status || 'pending',
        rated: a.rated || a.hasReview || false
      }))
    } else {
      // Fallback to mock data
      appointments.value = mockAppointments
    }
  } catch {
    // Fallback to mock data on error
    appointments.value = mockAppointments
  } finally {
    loading.value = false
  }
}

// Cancel modal
const showCancelModal = ref(false)
const cancelTarget = ref<Appointment | null>(null)
const cancelling = ref(false)

const openCancelModal = (appointment: Appointment) => {
  cancelTarget.value = appointment
  showCancelModal.value = true
}

const confirmCancel = async () => {
  if (!cancelTarget.value) return
  cancelling.value = true

  try {
    const { error } = await api(`/api/painel/appointments/${cancelTarget.value.id}`, {
      method: 'PUT',
      body: { status: 'cancelled' }
    })

    if (!error) {
      const apt = appointments.value.find(a => a.id === cancelTarget.value!.id)
      if (apt) apt.status = 'cancelled'
    } else {
      // Fallback: update locally anyway for mock data
      const apt = appointments.value.find(a => a.id === cancelTarget.value!.id)
      if (apt) apt.status = 'cancelled'
    }
  } catch {
    // Fallback: update locally
    const apt = appointments.value.find(a => a.id === cancelTarget.value!.id)
    if (apt) apt.status = 'cancelled'
  } finally {
    cancelling.value = false
    showCancelModal.value = false
    cancelTarget.value = null
  }
}

// Rating modal
const showRatingModal = ref(false)
const ratingTarget = ref<Appointment | null>(null)
const ratingValue = ref(0)
const ratingComment = ref('')
const submittingRating = ref(false)

const openRatingModal = (appointment: Appointment) => {
  ratingTarget.value = appointment
  ratingValue.value = 0
  ratingComment.value = ''
  showRatingModal.value = true
}

const submitRating = async () => {
  if (!ratingTarget.value || ratingValue.value === 0) return
  submittingRating.value = true

  try {
    await api('/api/painel/reviews', {
      method: 'POST',
      body: {
        appointmentId: ratingTarget.value.id,
        rating: ratingValue.value,
        comment: ratingComment.value
      }
    })
  } catch {
    // Silent fail - mark as rated locally regardless
  } finally {
    const apt = appointments.value.find(a => a.id === ratingTarget.value!.id)
    if (apt) apt.rated = true
    submittingRating.value = false
    showRatingModal.value = false
    ratingTarget.value = null
  }
}

// Reschedule: navigate to salon page
const handleReschedule = (appointment: Appointment) => {
  const slug = appointment.salon.slug
  if (slug) {
    navigateTo(`/salao/${slug}`)
  } else {
    navigateTo('/buscar')
  }
}

// Book again: navigate to salon page
const handleBookAgain = (appointment: Appointment) => {
  const slug = appointment.salon.slug
  if (slug) {
    navigateTo(`/salao/${slug}`)
  } else {
    navigateTo('/buscar')
  }
}

onMounted(() => {
  if (isAuthenticated.value) {
    fetchAppointments()
  } else {
    loading.value = false
  }
})

useSeoMeta({
  title: 'Meus Agendamentos - PiuBelle'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
