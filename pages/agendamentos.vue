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
          <span v-if="tab.count" class="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Appointments List -->
      <div class="space-y-4">
        <div 
          v-for="appointment in filteredAppointments"
          :key="appointment.id"
          class="p-5 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft"
        >
          <div class="flex gap-4">
            <!-- Salon Image -->
            <div class="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
              <img :src="appointment.salon.image" :alt="appointment.salon.name" class="w-full h-full object-cover" />
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
                  >
                    Reagendar
                  </button>
                  <button 
                    v-if="appointment.status === 'confirmed'"
                    class="px-4 py-2 rounded-xl text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    v-if="appointment.status === 'completed'"
                    class="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-lilac-500 to-rose-500 text-white hover:from-lilac-600 hover:to-rose-600 transition-all"
                  >
                    Avaliar
                  </button>
                  <button 
                    v-if="appointment.status === 'completed'"
                    class="px-4 py-2 rounded-xl text-sm font-medium bg-lilac-50 text-lilac-600 hover:bg-lilac-100 transition-all"
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
      <div v-if="filteredAppointments.length === 0" class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-lilac-50 flex items-center justify-center">
          <Icon name="lucide:calendar-x" class="w-10 h-10 text-lilac-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Nenhum agendamento</h3>
        <p class="text-gray-500 max-w-md mx-auto mb-6">
          {{ activeTab === 'upcoming' ? 'Você não tem agendamentos futuros.' : 'Você não tem histórico de agendamentos.' }}
        </p>
        <NuxtLink 
          to="/buscar"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
        >
          <Icon name="lucide:search" class="w-5 h-5" />
          Buscar salões
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const activeTab = ref('upcoming')

const tabs = [
  { id: 'upcoming', label: 'Próximos', count: 2 },
  { id: 'past', label: 'Histórico', count: 5 },
  { id: 'cancelled', label: 'Cancelados', count: 1 }
]

const appointments = ref([
  {
    id: '1',
    salon: {
      name: 'Studio Belle Hair',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop'
    },
    service: 'Corte + Escova',
    date: new Date(2026, 0, 25),
    time: '14:00',
    professional: 'Ana Maria',
    price: 120,
    status: 'confirmed'
  },
  {
    id: '2',
    salon: {
      name: 'Nail Art Studio',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop'
    },
    service: 'Manicure + Pedicure',
    date: new Date(2026, 0, 28),
    time: '10:00',
    professional: 'Carla Santos',
    price: 80,
    status: 'confirmed'
  },
  {
    id: '3',
    salon: {
      name: 'Spa Serenidade',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop'
    },
    service: 'Day Spa Completo',
    date: new Date(2026, 0, 15),
    time: '09:00',
    professional: 'Equipe Spa',
    price: 350,
    status: 'completed'
  },
  {
    id: '4',
    salon: {
      name: 'Make Up Studio',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop'
    },
    service: 'Maquiagem Social',
    date: new Date(2026, 0, 10),
    time: '16:00',
    professional: 'Juliana Costa',
    price: 150,
    status: 'cancelled'
  }
])

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  completed: 'Concluído',
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

useSeoMeta({
  title: 'Meus Agendamentos - PiuBelle'
})
</script>
