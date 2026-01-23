<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">Fila Virtual</h1>
        <p class="text-gray-500">{{ queueItems.length }} pessoas na fila</p>
      </div>
      <button 
        @click="showAddModal = true"
        class="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
      >
        <Icon name="lucide:user-plus" class="w-5 h-5" />
        Adicionar à Fila
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-lilac-200 border-t-lilac-500 rounded-full animate-spin"></div>
    </div>

    <template v-else>
      <!-- Queue Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <p class="text-3xl font-bold text-lilac-600">{{ stats.waiting }}</p>
          <p class="text-sm text-gray-500">Na fila</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <p class="text-3xl font-bold text-emerald-600">{{ stats.inService }}</p>
          <p class="text-sm text-gray-500">Sendo atendidos</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <p class="text-3xl font-bold text-amber-600">{{ stats.avgWaitTime }}</p>
          <p class="text-sm text-gray-500">Tempo médio</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <p class="text-3xl font-bold text-rose-600">{{ stats.completedToday }}</p>
          <p class="text-sm text-gray-500">Atendidos hoje</p>
        </div>
      </div>

      <!-- Queue List -->
      <div class="bg-white rounded-2xl border border-lilac-100 shadow-soft overflow-hidden">
        <div class="p-4 bg-gradient-to-r from-lilac-50 to-rose-50 border-b border-lilac-100">
          <h2 class="font-semibold text-gray-800">Fila de Espera</h2>
        </div>
        
        <div class="divide-y divide-lilac-50">
          <div 
            v-for="(item, index) in queueItems"
            :key="item.id"
            class="flex items-center gap-4 p-4 hover:bg-lilac-50/30 transition-colors"
          >
            <!-- Position -->
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
              :class="index === 0 ? 'bg-gradient-to-br from-lilac-500 to-rose-500 text-white' : 'bg-lilac-100 text-lilac-600'"
            >
              {{ index + 1 }}
            </div>

            <!-- Client Info -->
            <div class="flex items-center gap-3 flex-1">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-lilac-200 to-rose-200 flex items-center justify-center">
                <span class="font-bold text-lilac-700">{{ item.clientName?.charAt(0) || '?' }}</span>
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ item.clientName }}</p>
                <p class="text-sm text-gray-500">{{ item.serviceName || 'Serviço não especificado' }}</p>
              </div>
            </div>

            <!-- Wait Time -->
            <div class="text-right">
              <p class="font-medium text-gray-800">{{ item.waitTime }}</p>
              <p class="text-sm text-gray-500">{{ item.professionalName || 'Qualquer' }}</p>
            </div>

            <!-- Status Badge -->
            <span 
              class="px-3 py-1 rounded-full text-xs font-medium"
              :class="statusClasses[item.status]"
            >
              {{ statusLabels[item.status] }}
            </span>

            <!-- Actions -->
            <div class="flex gap-2">
              <button 
                v-if="item.status === 'waiting'"
                @click="callClient(item.id)"
                class="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-medium hover:bg-emerald-100 transition-all"
              >
                Chamar
              </button>
              <button 
                v-if="item.status === 'called'"
                @click="startService(item.id)"
                class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-all"
              >
                Iniciar
              </button>
              <button 
                v-if="item.status === 'in_service'"
                @click="completeService(item.id)"
                class="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-medium hover:bg-emerald-100 transition-all"
              >
                Finalizar
              </button>
              <button 
                @click="removeFromQueue(item.id)"
                class="p-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Icon name="lucide:x" class="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="queueItems.length === 0" class="text-center py-12">
          <Icon name="lucide:users" class="w-12 h-12 text-lilac-300 mx-auto mb-3" />
          <p class="text-gray-500">Nenhum cliente na fila</p>
          <p class="text-sm text-gray-400 mt-1">Adicione clientes à fila para começar</p>
        </div>
      </div>
    </template>

    <!-- Add to Queue Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-xl font-display font-semibold text-gray-800">Adicionar à Fila</h3>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Cliente *</label>
            <input 
              v-model="newQueueItem.clientName"
              type="text"
              placeholder="Nome completo"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
            <input 
              v-model="newQueueItem.phone"
              type="tel"
              placeholder="(00) 00000-0000"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Serviço</label>
            <input 
              v-model="newQueueItem.serviceName"
              type="text"
              placeholder="Ex: Corte + Escova"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Profissional (opcional)</label>
            <input 
              v-model="newQueueItem.professionalName"
              type="text"
              placeholder="Qualquer profissional"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <button 
            @click="showAddModal = false"
            class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button 
            @click="addToQueue"
            :disabled="!newQueueItem.clientName"
            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all disabled:opacity-50"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'painel'
})

const { authHeaders } = useAuth()
const currentSalon = inject<Ref<any>>('currentSalon')

const loading = ref(true)
const showAddModal = ref(false)
const queueItems = ref<any[]>([])

const stats = ref({
  waiting: 0,
  inService: 0,
  avgWaitTime: '0min',
  completedToday: 0
})

const newQueueItem = ref({
  clientName: '',
  phone: '',
  serviceName: '',
  professionalName: ''
})

const statusLabels: Record<string, string> = {
  waiting: 'Aguardando',
  called: 'Chamado',
  in_service: 'Atendendo'
}

const statusClasses: Record<string, string> = {
  waiting: 'bg-amber-50 text-amber-600',
  called: 'bg-lilac-50 text-lilac-600',
  in_service: 'bg-blue-50 text-blue-600'
}

// Fetch queue data
const fetchQueue = async () => {
  if (!currentSalon?.value?.id) {
    loading.value = false
    return
  }

  try {
    const { data } = await useFetch(`/api/painel/queue?salonId=${currentSalon.value.id}`, {
      headers: authHeaders.value
    })

    if (data.value?.success) {
      queueItems.value = data.value.data || []
      calculateStats()
    }
  } catch (error) {
    console.error('Erro ao buscar fila:', error)
  } finally {
    loading.value = false
  }
}

const calculateStats = () => {
  const waiting = queueItems.value.filter(i => i.status === 'waiting').length
  const inService = queueItems.value.filter(i => i.status === 'in_service').length
  
  // Calculate average wait time
  const waitingItems = queueItems.value.filter(i => i.status === 'waiting')
  const totalWait = waitingItems.reduce((acc, item) => {
    const enteredAt = new Date(item.enteredAt)
    const now = new Date()
    return acc + (now.getTime() - enteredAt.getTime()) / 60000
  }, 0)
  const avgWait = waitingItems.length > 0 ? Math.round(totalWait / waitingItems.length) : 0

  stats.value = {
    waiting,
    inService,
    avgWaitTime: avgWait > 0 ? `~${avgWait}min` : '0min',
    completedToday: 0 // Would need separate API call
  }
}

const addToQueue = async () => {
  if (!newQueueItem.value.clientName || !currentSalon?.value?.id) return

  try {
    const { data } = await useFetch('/api/painel/queue', {
      method: 'POST',
      headers: authHeaders.value,
      body: {
        salonId: currentSalon.value.id,
        ...newQueueItem.value
      }
    })

    if (data.value?.success) {
      queueItems.value.unshift(data.value.data)
      calculateStats()
      showAddModal.value = false
      newQueueItem.value = { clientName: '', phone: '', serviceName: '', professionalName: '' }
    }
  } catch (error) {
    console.error('Erro ao adicionar à fila:', error)
  }
}

const callClient = async (id: string) => {
  await updateQueueStatus(id, 'called')
}

const startService = async (id: string) => {
  await updateQueueStatus(id, 'in_service')
}

const completeService = async (id: string) => {
  await updateQueueStatus(id, 'completed')
}

const updateQueueStatus = async (id: string, status: string) => {
  try {
    const { data } = await useFetch(`/api/painel/queue/${id}`, {
      method: 'PUT',
      headers: authHeaders.value,
      body: { status }
    })

    if (data.value?.success) {
      if (status === 'completed') {
        queueItems.value = queueItems.value.filter(i => i.id !== id)
      } else {
        const item = queueItems.value.find(i => i.id === id)
        if (item) item.status = status
      }
      calculateStats()
    }
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
  }
}

const removeFromQueue = async (id: string) => {
  try {
    const { data } = await useFetch(`/api/painel/queue/${id}`, {
      method: 'DELETE',
      headers: authHeaders.value
    })

    if (data.value?.success) {
      queueItems.value = queueItems.value.filter(i => i.id !== id)
      calculateStats()
    }
  } catch (error) {
    console.error('Erro ao remover da fila:', error)
  }
}

// Watch for salon changes
watch(() => currentSalon?.value?.id, () => {
  fetchQueue()
}, { immediate: true })

onMounted(() => {
  fetchQueue()
})
</script>
