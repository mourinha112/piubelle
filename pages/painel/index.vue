<template>
  <div class="space-y-8">
    <!-- Salon Open/Close Toggle -->
    <div
      class="flex items-center justify-between p-5 rounded-2xl border"
      :class="salonOpen ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'"
    >
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center"
          :class="salonOpen ? 'bg-emerald-100' : 'bg-red-100'"
        >
          <Icon
            :name="salonOpen ? 'lucide:door-open' : 'lucide:door-closed'"
            class="w-6 h-6"
            :class="salonOpen ? 'text-emerald-600' : 'text-red-500'"
          />
        </div>
        <div>
          <p class="text-lg font-semibold text-gray-800">
            Salao {{ salonOpen ? 'Aberto' : 'Fechado' }}
          </p>
          <p class="text-sm text-gray-500">
            {{ salonOpen ? 'Clientes podem ver e agendar horarios' : 'Seu salao nao esta visivel para clientes' }}
          </p>
        </div>
      </div>
      <button
        class="px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
        :class="salonOpen
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-emerald-500 text-white hover:bg-emerald-600'"
        :disabled="togglingSalon"
        @click="toggleSalonStatus"
      >
        <Icon v-if="togglingSalon" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
        <Icon v-else :name="salonOpen ? 'lucide:power-off' : 'lucide:power'" class="w-4 h-4" />
        {{ togglingSalon ? '' : (salonOpen ? 'Fechar' : 'Abrir') }}
      </button>
    </div>

    <!-- Welcome Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-lilac-500 via-lilac-600 to-rose-500 p-8">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      </div>
      <div class="relative">
        <h1 class="text-2xl md:text-3xl font-display font-semibold text-white mb-2">
          Ola, {{ displayUser?.fullName?.split(' ')[0] || 'Gestora' }}!
        </h1>
        <p class="text-white/80">Aqui esta o resumo do seu salao hoje.</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-lilac-200 border-t-lilac-500 rounded-full animate-spin"></div>
    </div>

    <template v-else>
      <!-- Quick Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-lilac-100 to-rose-100 flex items-center justify-center">
              <Icon name="lucide:calendar-check" class="w-7 h-7 text-lilac-600" />
            </div>
            <div>
              <p class="text-3xl font-bold text-gray-800">{{ stats.todayAppointments }}</p>
              <p class="text-sm text-gray-500">Agendamentos hoje</p>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
              <Icon name="lucide:banknote" class="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <p class="text-3xl font-bold text-gray-800">R$ {{ stats.todayRevenue }}</p>
              <p class="text-sm text-gray-500">Faturamento hoje</p>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center">
              <Icon name="lucide:users" class="w-7 h-7 text-rose-600" />
            </div>
            <div>
              <p class="text-3xl font-bold text-gray-800">{{ stats.queueCount }}</p>
              <p class="text-sm text-gray-500">Na fila virtual</p>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <Icon name="lucide:star" class="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <p class="text-3xl font-bold text-gray-800">{{ stats.rating }}</p>
              <p class="text-sm text-gray-500">Avaliacao media</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Today's Appointments -->
        <div class="lg:col-span-2 p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display text-xl font-semibold text-gray-800">Agendamentos de Hoje</h2>
            <NuxtLink to="/painel/agendamentos" class="text-sm text-lilac-600 font-medium hover:text-lilac-700">
              Ver todos
            </NuxtLink>
          </div>

          <div class="space-y-4">
            <div
              v-for="appointment in todayAppointments"
              :key="appointment.id"
              class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-lilac-50/50 to-rose-50/50 border border-lilac-100"
            >
              <div class="w-12 h-12 rounded-xl bg-white border border-lilac-100 flex items-center justify-center overflow-hidden">
                <span class="font-bold text-lilac-600">{{ (appointment.clientName || appointment.client || '?').charAt(0) }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-800">{{ appointment.clientName || appointment.client }}</p>
                <p class="text-sm text-gray-500">{{ appointment.serviceName || appointment.service }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-800">{{ appointment.time }}</p>
                <p class="text-sm text-gray-500">{{ appointment.professionalName || appointment.professional }}</p>
              </div>
              <span
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="statusClasses[appointment.status] || 'bg-gray-50 text-gray-600'"
              >
                {{ statusLabels[appointment.status] || appointment.status }}
              </span>
            </div>
          </div>

          <div v-if="todayAppointments.length === 0" class="text-center py-8">
            <Icon name="lucide:calendar-x" class="w-12 h-12 text-lilac-300 mx-auto mb-3" />
            <p class="text-gray-500">Nenhum agendamento para hoje</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="space-y-6">
          <!-- Quick Actions Card -->
          <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
            <h2 class="font-display text-xl font-semibold text-gray-800 mb-4">Acoes Rapidas</h2>
            <div class="space-y-3">
              <NuxtLink
                to="/painel/agendamentos"
                class="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white hover:from-lilac-600 hover:to-rose-600 transition-all"
              >
                <Icon name="lucide:plus" class="w-5 h-5" />
                <span class="font-medium">Novo Agendamento</span>
              </NuxtLink>
              <NuxtLink
                to="/painel/clientes"
                class="w-full flex items-center gap-3 p-4 rounded-xl bg-lilac-50 text-lilac-700 hover:bg-lilac-100 transition-all"
              >
                <Icon name="lucide:user-plus" class="w-5 h-5" />
                <span class="font-medium">Adicionar Cliente</span>
              </NuxtLink>
              <NuxtLink
                to="/painel/fila"
                class="w-full flex items-center gap-3 p-4 rounded-xl bg-lilac-50 text-lilac-700 hover:bg-lilac-100 transition-all"
              >
                <Icon name="lucide:users" class="w-5 h-5" />
                <span class="font-medium">Abrir Fila Virtual</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Subscription / Plan Card -->
          <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
            <h2 class="font-display text-xl font-semibold text-gray-800 mb-4">Plano Atual</h2>
            <div v-if="subLoading" class="text-sm text-gray-500">Carregando informacoes do plano...</div>
            <div v-else>
              <div v-if="subscription">
                <p class="font-medium text-gray-800">{{ subscription.plan?.name || 'Plano desconhecido' }}</p>
                <p class="text-sm text-gray-500 mt-1">Status: <span class="font-semibold text-gray-700">{{ subscription.status }}</span></p>
                <p v-if="subscription.trial_end" class="text-sm text-gray-500 mt-1">Trial ate: {{ formatDate(subscription.trial_end) }}</p>
                <p v-if="subscription.current_period_end" class="text-sm text-gray-500 mt-1">Proximo vencimento: {{ formatDate(subscription.current_period_end) }}</p>
                <div class="mt-4 flex gap-2">
                  <NuxtLink :to="`/painel/plans?salonId=${currentSalon?.id}`" class="px-4 py-2 rounded-xl bg-lilac-50 text-lilac-700">Gerenciar plano</NuxtLink>
                  <NuxtLink to="/painel/checkout" class="px-4 py-2 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white">Assinar / Renovar</NuxtLink>
                </div>
              </div>
              <div v-else class="text-sm text-gray-500">
                Nenhum plano encontrado. Escolha um plano para liberar o painel.
                <div class="mt-3">
                  <NuxtLink :to="`/painel/plans?salonId=${currentSalon?.id}`" class="px-4 py-2 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white">Escolher plano</NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
            <h2 class="font-display text-xl font-semibold text-gray-800 mb-4">Atividade Recente</h2>
            <div v-if="recentActivity.length === 0" class="text-center py-4">
              <p class="text-sm text-gray-400">Nenhuma atividade recente</p>
            </div>
            <div v-else class="space-y-4">
              <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start gap-3">
                <div
                  class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  :class="activity.bgClass"
                >
                  <Icon :name="activity.icon" class="w-4 h-4" :class="activity.iconClass" />
                </div>
                <div>
                  <p class="text-sm text-gray-700">{{ activity.message }}</p>
                  <p class="text-xs text-gray-400">{{ activity.time }}</p>
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

const { user, currentSalon, authHeaders } = useAuth()
const { api } = useApi()

const loading = ref(true)
const salonOpen = ref(false)
const togglingSalon = ref(false)

const dashboardStats = ref({
  todayAppointments: 0,
  todayRevenue: '0',
  queueCount: 0,
  rating: 0
})
const appointments = ref<any[]>([])
const activities = ref<any[]>([])

const displayUser = computed(() => user.value || { fullName: 'Gestora' })

const stats = computed(() => dashboardStats.value)

const todayAppointments = computed(() => appointments.value)

const recentActivity = computed(() => activities.value)

// Subscription info
const subscription = ref<any>(null)
const subLoading = ref(false)

const loadSubscription = async () => {
  if (!currentSalon.value?.id) {
    subscription.value = null
    return
  }
  subLoading.value = true
  try {
    const res = await $fetch(`/api/painel/subscription?salonId=${currentSalon.value.id}`, {
      headers: authHeaders.value
    })
    subscription.value = (res as any)?.data ?? null
  } catch (err) {
    console.error('Erro ao carregar subscription:', err)
    subscription.value = null
  } finally {
    subLoading.value = false
  }
}

const formatDate = (iso?: string) => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('pt-BR')
  } catch {
    return iso
  }
}

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  in_progress: 'Em andamento',
  completed: 'Concluido'
}

const statusClasses: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-600',
  confirmed: 'bg-lilac-50 text-lilac-600',
  in_progress: 'bg-blue-50 text-blue-600',
  completed: 'bg-emerald-50 text-emerald-600'
}

// Toggle salon open/close
const toggleSalonStatus = async () => {
  if (!currentSalon.value?.id) return
  togglingSalon.value = true
  try {
    const newStatus = !salonOpen.value
    const { error } = await api(`/api/painel/salon/${currentSalon.value.id}`, {
      method: 'PUT',
      body: { isOpen: newStatus }
    })
    if (!error) {
      salonOpen.value = newStatus
    }
  } catch (err) {
    console.error('Erro ao alterar status do salao:', err)
  } finally {
    togglingSalon.value = false
  }
}

// Build activity entries from appointments
const buildActivities = (appts: any[]) => {
  const activityList: any[] = []
  const iconMap: Record<string, { icon: string; bgClass: string; iconClass: string }> = {
    completed: { icon: 'lucide:check-circle', bgClass: 'bg-emerald-50', iconClass: 'text-emerald-500' },
    confirmed: { icon: 'lucide:calendar-check', bgClass: 'bg-lilac-50', iconClass: 'text-lilac-500' },
    in_progress: { icon: 'lucide:clock', bgClass: 'bg-blue-50', iconClass: 'text-blue-500' },
    pending: { icon: 'lucide:calendar-plus', bgClass: 'bg-amber-50', iconClass: 'text-amber-500' }
  }

  appts.slice(0, 5).forEach((appt, idx) => {
    const cfg = iconMap[appt.status] || iconMap.pending
    const clientName = appt.clientName || appt.client || 'Cliente'
    const serviceName = appt.serviceName || appt.service || ''
    const statusLabel = statusLabels[appt.status] || appt.status

    activityList.push({
      id: appt.id || idx,
      icon: cfg.icon,
      message: `${clientName} - ${serviceName} (${statusLabel})`,
      time: appt.time || '',
      bgClass: cfg.bgClass,
      iconClass: cfg.iconClass
    })
  })

  return activityList
}

// Fetch dashboard data
const fetchDashboard = async () => {
  if (!currentSalon.value?.id) {
    loading.value = false
    return
  }

  loading.value = true
  try {
    // Fetch stats
    const { data: statsRes, error: statsErr } = await api<any>('/api/painel/dashboard/stats', {
      params: { salonId: currentSalon.value.id }
    })

    if (!statsErr && statsRes) {
      const s = statsRes.data || statsRes
      dashboardStats.value = {
        todayAppointments: s.todayAppointments || 0,
        todayRevenue: typeof s.todayRevenue === 'number'
          ? s.todayRevenue.toLocaleString('pt-BR')
          : (s.todayRevenue || '0'),
        queueCount: s.queueCount || 0,
        rating: s.rating || 0
      }
      // Set salon open status from stats if available
      if (typeof s.isOpen === 'boolean') {
        salonOpen.value = s.isOpen
      }
    }

    // Fetch today's appointments
    const today = new Date().toISOString().split('T')[0]
    const { data: apptRes, error: apptErr } = await api<any>('/api/painel/appointments', {
      params: { salonId: currentSalon.value.id, date: today }
    })

    if (!apptErr && apptRes) {
      appointments.value = apptRes.data || apptRes || []
      activities.value = buildActivities(appointments.value)
    }

    // Try to get salon open status from salon endpoint
    const { data: salonRes } = await api<any>('/api/painel/salon/my')
    if (salonRes) {
      const salonData = salonRes.data || salonRes
      if (Array.isArray(salonData)) {
        const match = salonData.find((s: any) => s.id === currentSalon.value?.id)
        if (match && typeof match.isOpen === 'boolean') {
          salonOpen.value = match.isOpen
        }
      } else if (typeof salonData.isOpen === 'boolean') {
        salonOpen.value = salonData.isOpen
      }
    }
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error)
  } finally {
    loading.value = false
  }
}

// Watch for salon changes
watch(() => currentSalon.value?.id, () => {
  fetchDashboard()
  loadSubscription()
}, { immediate: true })
</script>
