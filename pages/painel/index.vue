<template>
  <div class="space-y-8">
    <!-- Welcome Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-lilac-500 via-lilac-600 to-rose-500 p-8">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      </div>
      <div class="relative">
        <h1 class="text-2xl md:text-3xl font-display font-semibold text-white mb-2">
          Olá, {{ displayUser?.fullName?.split(' ')[0] || 'Gestora' }}! 👋
        </h1>
        <p class="text-white/80">Aqui está o resumo do seu salão hoje.</p>
      </div>
    </div>

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
            <p class="text-sm text-gray-500">Avaliação média</p>
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
            Ver todos →
          </NuxtLink>
        </div>

        <div class="space-y-4">
          <div 
            v-for="appointment in todayAppointments"
            :key="appointment.id"
            class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-lilac-50/50 to-rose-50/50 border border-lilac-100"
          >
            <div class="w-12 h-12 rounded-xl bg-white border border-lilac-100 flex items-center justify-center overflow-hidden">
              <span class="font-bold text-lilac-600">{{ appointment.client.charAt(0) }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-800">{{ appointment.client }}</p>
              <p class="text-sm text-gray-500">{{ appointment.service }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-800">{{ appointment.time }}</p>
              <p class="text-sm text-gray-500">{{ appointment.professional }}</p>
            </div>
            <span 
              class="px-3 py-1 rounded-full text-xs font-medium"
              :class="statusClasses[appointment.status]"
            >
              {{ statusLabels[appointment.status] }}
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
          <h2 class="font-display text-xl font-semibold text-gray-800 mb-4">Ações Rápidas</h2>
          <div class="space-y-3">
            <button class="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white hover:from-lilac-600 hover:to-rose-600 transition-all">
              <Icon name="lucide:plus" class="w-5 h-5" />
              <span class="font-medium">Novo Agendamento</span>
            </button>
            <button class="w-full flex items-center gap-3 p-4 rounded-xl bg-lilac-50 text-lilac-700 hover:bg-lilac-100 transition-all">
              <Icon name="lucide:user-plus" class="w-5 h-5" />
              <span class="font-medium">Adicionar Cliente</span>
            </button>
            <button class="w-full flex items-center gap-3 p-4 rounded-xl bg-lilac-50 text-lilac-700 hover:bg-lilac-100 transition-all">
              <Icon name="lucide:users" class="w-5 h-5" />
              <span class="font-medium">Abrir Fila Virtual</span>
            </button>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="font-display text-xl font-semibold text-gray-800 mb-4">Atividade Recente</h2>
          <div class="space-y-4">
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
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

definePageMeta({
  layout: 'painel'
})

const { user, authHeaders } = useAuth()
const currentSalon = inject<Ref<any>>('currentSalon', ref(null))

const loading = ref(true)
const dashboardStats = ref({
  todayAppointments: 0,
  todayRevenue: '0',
  queueCount: 0,
  rating: 0
})
const appointments = ref<any[]>([])
const activities = ref<any[]>([])

const displayUser = computed(() => user.value || { fullName: 'Gestora' })

// Verifica se é o salão mockup
const isMockupSalon = computed(() => 
  currentSalon?.value?.slug === 'studio-belle-hair-mockup' || 
  user.value?.email === 'admin@mockup.piubelle.com'
)

// Dados vazios (para salões novos)
const emptyStats = {
  todayAppointments: 0,
  todayRevenue: '0',
  queueCount: 0,
  rating: 0
}

// Dados do Mockup
const mockupStats = {
  todayAppointments: 10,
  todayRevenue: '1.020',
  queueCount: 3,
  rating: 4.8
}

const stats = computed(() => {
  // If we have fetched stats, use them
  if (dashboardStats.value.todayAppointments > 0 || dashboardStats.value.queueCount > 0) {
    return dashboardStats.value
  }
  // For mockup salon, use mockup data
  if (isMockupSalon.value) return mockupStats
  // Otherwise use fetched stats (may be empty for new salons)
  return dashboardStats.value
})

// Agendamentos vazios (para salões novos)
const emptyAppointments: any[] = []

// Agendamentos do Mockup
const mockupAppointments = [
  {
    id: 'apt-today-001',
    client: 'Fernanda Costa',
    service: 'Corte Feminino',
    time: '09:00',
    professional: 'Ana Paula',
    status: 'completed'
  },
  {
    id: 'apt-today-002',
    client: 'Camila Souza',
    service: 'Manicure',
    time: '09:30',
    professional: 'Maria Clara',
    status: 'completed'
  },
  {
    id: 'apt-today-003',
    client: 'Beatriz Santos',
    service: 'Coloração',
    time: '10:00',
    professional: 'Ana Paula',
    status: 'in_progress'
  },
  {
    id: 'apt-today-004',
    client: 'Patrícia Lima',
    service: 'Design de Sobrancelha',
    time: '10:30',
    professional: 'Júlia Santos',
    status: 'confirmed'
  },
  {
    id: 'apt-today-005',
    client: 'Juliana Alves',
    service: 'Limpeza de Pele',
    time: '11:00',
    professional: 'Carla Oliveira',
    status: 'confirmed'
  },
  {
    id: 'apt-today-006',
    client: 'Gabriela Rocha',
    service: 'Unhas de Gel',
    time: '14:00',
    professional: 'Maria Clara',
    status: 'pending'
  },
  {
    id: 'apt-today-007',
    client: 'Amanda Silva',
    service: 'Escova',
    time: '14:30',
    professional: 'Ana Paula',
    status: 'pending'
  },
  {
    id: 'apt-today-008',
    client: 'Carolina Martins',
    service: 'Maquiagem Social',
    time: '15:00',
    professional: 'Júlia Santos',
    status: 'confirmed'
  }
]

const todayAppointments = computed(() => {
  // If we have fetched appointments, use them
  if (appointments.value.length > 0) return appointments.value
  // For mockup salon, use mockup data
  if (isMockupSalon.value) return mockupAppointments
  // Otherwise return empty
  return []
})

// Atividades vazias (para salões novos)
const emptyActivity: any[] = []

// Atividades do Mockup
const mockupActivity = [
  {
    id: '1',
    icon: 'lucide:check-circle',
    message: 'Fernanda Costa - Corte concluído',
    time: 'Há 10 min',
    bgClass: 'bg-emerald-50',
    iconClass: 'text-emerald-500'
  },
  {
    id: '2',
    icon: 'lucide:star',
    message: 'Nova avaliação 5★ de Camila Souza',
    time: 'Há 30 min',
    bgClass: 'bg-amber-50',
    iconClass: 'text-amber-500'
  },
  {
    id: '3',
    icon: 'lucide:banknote',
    message: 'Pagamento PIX - R$ 80,00',
    time: 'Há 45 min',
    bgClass: 'bg-emerald-50',
    iconClass: 'text-emerald-500'
  },
  {
    id: '4',
    icon: 'lucide:users',
    message: 'Amanda Silva entrou na fila virtual',
    time: 'Há 1 hora',
    bgClass: 'bg-lilac-50',
    iconClass: 'text-lilac-500'
  },
  {
    id: '5',
    icon: 'lucide:calendar-plus',
    message: 'Novo agendamento - Carolina Martins',
    time: 'Há 2 horas',
    bgClass: 'bg-blue-50',
    iconClass: 'text-blue-500'
  }
]

const recentActivity = computed(() => {
  // If we have fetched activities, use them
  if (activities.value.length > 0) return activities.value
  // For mockup salon, use mockup data
  if (isMockupSalon.value) return mockupActivity
  // Otherwise return empty
  return []
})

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  in_progress: 'Em andamento',
  completed: 'Concluído'
}

const statusClasses: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-600',
  confirmed: 'bg-lilac-50 text-lilac-600',
  in_progress: 'bg-blue-50 text-blue-600',
  completed: 'bg-emerald-50 text-emerald-600'
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
    const statsRes = await $fetch(`/api/painel/dashboard/stats?salonId=${currentSalon.value.id}`, {
      headers: authHeaders.value
    })
    if ((statsRes as any).success) {
      const s = (statsRes as any).data
      dashboardStats.value = {
        todayAppointments: s.todayAppointments || 0,
        todayRevenue: (s.todayRevenue || 0).toLocaleString('pt-BR'),
        queueCount: s.queueCount || 0,
        rating: s.rating || 0
      }
    }

    // Fetch today's appointments
    const today = new Date().toISOString().split('T')[0]
    const appointmentsRes = await $fetch(`/api/painel/appointments?salonId=${currentSalon.value.id}&date=${today}`, {
      headers: authHeaders.value
    })
    if ((appointmentsRes as any).success) {
      appointments.value = (appointmentsRes as any).data || []
    }
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error)
    // Use mockup data for mockup salon
    if (isMockupSalon.value) {
      dashboardStats.value = mockupStats
      appointments.value = mockupAppointments
      activities.value = mockupActivity
    }
  } finally {
    loading.value = false
  }
}

// Watch for salon changes
watch(() => currentSalon.value?.id, () => {
  fetchDashboard()
}, { immediate: true })

onMounted(() => {
  fetchDashboard()
})
</script>
