<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">Agendamentos</h1>
        <p class="text-gray-500">Gerencie os agendamentos do seu salão</p>
      </div>
      <button 
        @click="showNewModal = true"
        class="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
      >
        <Icon name="lucide:plus" class="w-5 h-5" />
        Novo Agendamento
      </button>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3">
      <div class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-lilac-100 shadow-soft">
        <Icon name="lucide:calendar" class="w-5 h-5 text-gray-400" />
        <input 
          type="date" 
          v-model="selectedDate"
          class="bg-transparent text-gray-700 outline-none"
        />
      </div>
      <select 
        v-model="selectedStatus"
        class="px-4 py-2 rounded-xl bg-white border border-lilac-100 text-gray-700 shadow-soft outline-none"
      >
        <option value="">Todos os status</option>
        <option value="confirmed">Confirmados</option>
        <option value="pending">Pendentes</option>
        <option value="completed">Concluídos</option>
        <option value="cancelled">Cancelados</option>
      </select>
      <select 
        v-model="selectedProfessional"
        class="px-4 py-2 rounded-xl bg-white border border-lilac-100 text-gray-700 shadow-soft outline-none"
      >
        <option value="">Todas as profissionais</option>
        <option v-for="pro in professionals" :key="pro.id" :value="pro.id">{{ pro.name }}</option>
      </select>
    </div>

    <!-- View Toggle -->
    <div class="flex items-center gap-2 p-1.5 rounded-xl bg-lilac-50 w-fit">
      <button 
        :class="['px-4 py-2 rounded-lg font-medium transition-all', viewMode === 'list' ? 'bg-white text-lilac-600 shadow-soft' : 'text-gray-500']"
        @click="viewMode = 'list'"
      >
        <Icon name="lucide:list" class="w-4 h-4 inline mr-2" />
        Lista
      </button>
      <button 
        :class="['px-4 py-2 rounded-lg font-medium transition-all', viewMode === 'calendar' ? 'bg-white text-lilac-600 shadow-soft' : 'text-gray-500']"
        @click="viewMode = 'calendar'"
      >
        <Icon name="lucide:calendar" class="w-4 h-4 inline mr-2" />
        Calendário
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <Icon name="lucide:loader-2" class="w-8 h-8 text-lilac-500 animate-spin mx-auto" />
    </div>

    <!-- Appointments List -->
    <div v-else class="bg-white rounded-2xl border border-lilac-100 shadow-soft overflow-hidden">
      <table class="w-full">
        <thead class="bg-gradient-to-r from-lilac-50 to-rose-50 border-b border-lilac-100">
          <tr>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-700">Cliente</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-700">Serviço</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-700">Profissional</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-700">Horário</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-700">Valor</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="appointment in filteredAppointments" 
            :key="appointment.id"
            class="border-b border-lilac-50 hover:bg-lilac-50/30 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-lilac-200 to-rose-200 flex items-center justify-center">
                  <span class="font-medium text-lilac-700">{{ appointment.clientName?.charAt(0) || 'C' }}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ appointment.clientName }}</p>
                  <p class="text-sm text-gray-500">{{ appointment.clientPhone || '-' }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <p class="text-gray-700">{{ appointment.serviceName }}</p>
              <p class="text-sm text-gray-400">{{ appointment.duration || 60 }} min</p>
            </td>
            <td class="px-6 py-4 text-gray-700">{{ appointment.professionalName || 'Não definido' }}</td>
            <td class="px-6 py-4">
              <p class="font-medium text-gray-800">{{ appointment.startTime }}</p>
              <p class="text-sm text-gray-400">{{ formatDate(appointment.date) }}</p>
            </td>
            <td class="px-6 py-4 font-medium text-gray-800">R$ {{ (appointment.total || 0).toFixed(2) }}</td>
            <td class="px-6 py-4">
              <select 
                :value="appointment.status"
                @change="updateStatus(appointment.id, ($event.target as HTMLSelectElement).value)"
                class="px-3 py-1 rounded-full text-xs font-medium border-0 outline-none cursor-pointer"
                :class="statusClasses[appointment.status]"
              >
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmado</option>
                <option value="in_progress">Em andamento</option>
                <option value="completed">Concluído</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <button 
                  @click="viewAppointment(appointment)"
                  class="p-2 rounded-lg hover:bg-lilac-50 transition-colors" 
                  title="Ver detalhes"
                >
                  <Icon name="lucide:eye" class="w-4 h-4 text-gray-500" />
                </button>
                <button 
                  @click="sendWhatsApp(appointment)"
                  class="p-2 rounded-lg hover:bg-emerald-50 transition-colors" 
                  title="WhatsApp"
                >
                  <Icon name="mdi:whatsapp" class="w-4 h-4 text-emerald-500" />
                </button>
                <button 
                  v-if="appointment.status !== 'cancelled'"
                  @click="cancelAppointment(appointment)"
                  class="p-2 rounded-lg hover:bg-red-50 transition-colors" 
                  title="Cancelar"
                >
                  <Icon name="lucide:x" class="w-4 h-4 text-red-500" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredAppointments.length === 0" class="text-center py-12">
        <Icon name="lucide:calendar-x" class="w-12 h-12 text-lilac-300 mx-auto mb-3" />
        <p class="text-gray-500">Nenhum agendamento encontrado</p>
      </div>
    </div>

    <!-- Modal Novo Agendamento -->
    <UModal v-model="showNewModal" :ui="{ width: 'max-w-xl' }">
      <div class="p-6">
        <h2 class="text-xl font-display font-semibold text-gray-800 mb-6">Novo Agendamento</h2>
        
        <form @submit.prevent="createAppointment" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cliente *</label>
              <div class="flex gap-2">
                <select
                  v-model="newAppointment.clientId"
                  class="flex-1 px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
                  required
                >
                  <option value="">Selecione um cliente</option>
                  <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
                </select>
                <button 
                  type="button"
                  @click="showQuickClientModal = true"
                  class="px-3 py-2 rounded-xl bg-lilac-50 text-lilac-600 hover:bg-lilac-100 transition-colors"
                  title="Cadastro rápido de cliente"
                >
                  <Icon name="lucide:user-plus" class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Profissional</label>
              <select
                v-model="newAppointment.professionalId"
                class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
              >
                <option value="">Qualquer disponível</option>
                <option v-for="pro in professionals" :key="pro.id" :value="pro.id">{{ pro.name }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Serviço *</label>
            <select
              v-model="newAppointment.serviceId"
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
              required
            >
              <option value="">Selecione um serviço</option>
              <option v-for="service in services" :key="service.id" :value="service.id">
                {{ service.name }} - R$ {{ service.price.toFixed(2) }} ({{ service.duration }}min)
              </option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Data *</label>
              <input
                type="date"
                v-model="newAppointment.date"
                class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Horário *</label>
              <select
                v-model="newAppointment.startTime"
                class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
                required
              >
                <option value="">Selecione</option>
                <option v-for="time in availableTimes" :key="time" :value="time">{{ time }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Observações</label>
            <textarea
              v-model="newAppointment.notes"
              rows="2"
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none resize-none"
              placeholder="Observações sobre o agendamento..."
            />
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button 
              type="button"
              @click="showNewModal = false"
              class="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              :disabled="creating"
              class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 disabled:opacity-50 transition-all"
            >
              {{ creating ? 'Criando...' : 'Criar Agendamento' }}
            </button>
          </div>
        </form>
      </div>
    </UModal>

    <!-- Modal Cadastro Rápido de Cliente -->
    <UModal v-model="showQuickClientModal" :ui="{ width: 'max-w-md' }">
      <div class="p-6">
        <h2 class="text-xl font-display font-semibold text-gray-800 mb-6">Cadastro Rápido de Cliente</h2>
        
        <form @submit.prevent="createQuickClient" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
            <input
              v-model="quickClientForm.name"
              type="text"
              placeholder="Nome do cliente"
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
            <input
              v-model="quickClientForm.phone"
              type="tel"
              placeholder="(00) 00000-0000"
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <input
              v-model="quickClientForm.email"
              type="email"
              placeholder="email@exemplo.com"
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
            />
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button 
              type="button"
              @click="showQuickClientModal = false"
              class="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              :disabled="creatingClient || !quickClientForm.name"
              class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 disabled:opacity-50 transition-all"
            >
              {{ creatingClient ? 'Criando...' : 'Criar e Selecionar' }}
            </button>
          </div>
        </form>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

definePageMeta({
  layout: 'painel'
})

const route = useRoute()
const { authHeaders } = useAuth()
const currentSalon = inject('currentSalon') as Ref<any>

const viewMode = ref('list')
const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedStatus = ref('')
const selectedProfessional = ref('')
const loading = ref(false)
const showNewModal = ref(false)
const showQuickClientModal = ref(false)
const creating = ref(false)
const creatingClient = ref(false)

// New quick client form
const quickClientForm = ref({
  name: '',
  phone: '',
  email: ''
})

// Read professional filter from URL
onMounted(() => {
  const profId = route.query.professionalId as string
  if (profId) {
    selectedProfessional.value = profId
  }
})

const appointments = ref<any[]>([])
const clients = ref<any[]>([])
const professionals = ref<any[]>([])
const services = ref<any[]>([])

const newAppointment = ref({
  clientId: '',
  professionalId: '',
  serviceId: '',
  date: new Date().toISOString().split('T')[0],
  startTime: '',
  notes: ''
})

const availableTimes = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
]

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  in_progress: 'Em andamento',
  completed: 'Concluído',
  cancelled: 'Cancelado'
}

const statusClasses: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-600',
  confirmed: 'bg-lilac-50 text-lilac-600',
  in_progress: 'bg-blue-50 text-blue-600',
  completed: 'bg-emerald-50 text-emerald-600',
  cancelled: 'bg-red-50 text-red-600'
}

const filteredAppointments = computed(() => {
  let result = appointments.value

  if (selectedStatus.value) {
    result = result.filter(a => a.status === selectedStatus.value)
  }

  if (selectedProfessional.value) {
    result = result.filter(a => a.professionalId === selectedProfessional.value)
  }

  return result
})

const formatDate = (date: string) => {
  return format(new Date(date), "d 'de' MMM", { locale: ptBR })
}

// Carregar dados
const loadData = async () => {
  if (!currentSalon.value?.id) {
    loading.value = false
    return
  }

  loading.value = true
  try {
    // Carregar agendamentos
    const appointmentsRes = await $fetch(`/api/painel/appointments?salonId=${currentSalon.value.id}&date=${selectedDate.value}`, {
      headers: authHeaders.value
    })
    appointments.value = (appointmentsRes as any).data || []

    // Carregar clientes
    const clientsRes = await $fetch(`/api/painel/clients?salonId=${currentSalon.value.id}`, {
      headers: authHeaders.value
    })
    clients.value = (clientsRes as any).data || []

    // Carregar profissionais
    const professionalsRes = await $fetch(`/api/painel/professionals?salonId=${currentSalon.value.id}`, {
      headers: authHeaders.value
    })
    professionals.value = (professionalsRes as any).data || []

    // Carregar serviços
    const servicesRes = await $fetch(`/api/painel/services?salonId=${currentSalon.value.id}`, {
      headers: authHeaders.value
    })
    services.value = (servicesRes as any).data || []
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  } finally {
    loading.value = false
  }
}

// Criar agendamento
const createAppointment = async () => {
  if (!newAppointment.value.clientId || !newAppointment.value.serviceId || !newAppointment.value.date || !newAppointment.value.startTime || !currentSalon.value?.id) {
    return
  }

  creating.value = true
  try {
    const selectedService = services.value.find(s => s.id === newAppointment.value.serviceId)
    
    await $fetch('/api/painel/appointments', {
      method: 'POST',
      headers: authHeaders.value,
      body: {
        salonId: currentSalon.value.id,
        clientId: newAppointment.value.clientId,
        professionalId: newAppointment.value.professionalId || null,
        serviceId: newAppointment.value.serviceId,
        date: newAppointment.value.date,
        startTime: newAppointment.value.startTime,
        total: selectedService?.price || 0,
        notes: newAppointment.value.notes
      }
    })

    showNewModal.value = false
    newAppointment.value = {
      clientId: '',
      professionalId: '',
      serviceId: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '',
      notes: ''
    }
    await loadData()
  } catch (error) {
    console.error('Erro ao criar agendamento:', error)
  } finally {
    creating.value = false
  }
}

// Atualizar status
const updateStatus = async (appointmentId: string, status: string) => {
  try {
    await $fetch(`/api/painel/appointments/${appointmentId}`, {
      method: 'PUT',
      headers: authHeaders.value,
      body: { status }
    })
    
    const index = appointments.value.findIndex(a => a.id === appointmentId)
    if (index > -1) {
      appointments.value[index].status = status
    }
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
  }
}

// Visualizar detalhes
const viewAppointment = (appointment: any) => {
  // TODO: Implementar modal de detalhes
  console.log('Ver detalhes:', appointment)
}

// Enviar WhatsApp
const sendWhatsApp = (appointment: any) => {
  const phone = appointment.clientPhone?.replace(/\D/g, '')
  if (phone) {
    const message = `Olá ${appointment.clientName}! Passando para confirmar seu agendamento no PiuBelle.`
    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(message)}`, '_blank')
  }
}

// Cancelar agendamento
const cancelAppointment = async (appointment: any) => {
  if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
    await updateStatus(appointment.id, 'cancelled')
  }
}

// Criar cliente rapidamente
const createQuickClient = async () => {
  if (!quickClientForm.value.name || !currentSalon.value?.id) return

  creatingClient.value = true
  try {
    const res = await $fetch('/api/painel/clients', {
      method: 'POST',
      headers: authHeaders.value,
      body: {
        salonId: currentSalon.value.id,
        name: quickClientForm.value.name,
        phone: quickClientForm.value.phone,
        email: quickClientForm.value.email
      }
    })

    const newClient = (res as any).data
    
    // Add to clients list
    clients.value.unshift(newClient)
    
    // Select the new client
    newAppointment.value.clientId = newClient.id
    
    // Close modal and reset form
    showQuickClientModal.value = false
    quickClientForm.value = { name: '', phone: '', email: '' }
  } catch (error) {
    console.error('Erro ao criar cliente:', error)
    alert('Erro ao criar cliente')
  } finally {
    creatingClient.value = false
  }
}

// Watch para recarregar quando a data mudar
watch(selectedDate, () => {
  loadData()
})

// Watch para recarregar quando o salão mudar
watch(() => currentSalon.value?.id, () => {
  loadData()
}, { immediate: true })

onMounted(() => {
  loadData()
})
</script>
