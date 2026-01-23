<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">Clientes</h1>
        <p class="text-gray-500">{{ clients.length }} clientes cadastrados</p>
      </div>
      <button 
        @click="openNewModal"
        class="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
      >
        <Icon name="lucide:user-plus" class="w-5 h-5" />
        Novo Cliente
      </button>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Buscar cliente por nome, telefone ou e-mail..."
          class="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 placeholder-gray-400 focus:border-lilac-300 outline-none transition-all shadow-soft"
        />
      </div>
      <select 
        v-model="sortBy"
        class="px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 shadow-soft outline-none"
      >
        <option value="recent">Mais recentes</option>
        <option value="name">Nome A-Z</option>
        <option value="visits">Mais visitas</option>
        <option value="spent">Maior valor gasto</option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <Icon name="lucide:loader-2" class="w-8 h-8 text-lilac-500 animate-spin mx-auto" />
    </div>

    <!-- Clients Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="client in filteredClients"
        :key="client.id"
        class="p-5 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft group cursor-pointer"
        @click="viewClient(client)"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-lilac-200 to-rose-200 flex items-center justify-center">
            <span class="text-xl font-bold text-lilac-700">{{ getInitials(client.name) }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold text-gray-800 truncate">{{ client.name }}</h3>
              <span v-if="client.isVip" class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-600">VIP</span>
            </div>
            <p class="text-sm text-gray-500">{{ client.phone || 'Sem telefone' }}</p>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              @click.stop="editClient(client)"
              class="p-2 rounded-lg hover:bg-lilac-50 transition-colors"
            >
              <Icon name="lucide:pencil" class="w-4 h-4 text-gray-500" />
            </button>
            <button 
              @click.stop="sendWhatsApp(client)"
              class="p-2 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              <Icon name="mdi:whatsapp" class="w-4 h-4 text-emerald-500" />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 mb-4">
          <div class="text-center p-2 rounded-lg bg-lilac-50">
            <p class="text-lg font-bold text-lilac-600">{{ client.visitCount || 0 }}</p>
            <p class="text-xs text-gray-500">Visitas</p>
          </div>
          <div class="text-center p-2 rounded-lg bg-rose-50">
            <p class="text-lg font-bold text-rose-600">R$ {{ (client.totalSpent || 0).toLocaleString() }}</p>
            <p class="text-xs text-gray-500">Total</p>
          </div>
          <div class="text-center p-2 rounded-lg bg-amber-50">
            <p class="text-lg font-bold text-amber-600">{{ client.loyaltyPoints || 0 }}</p>
            <p class="text-xs text-gray-500">Pontos</p>
          </div>
        </div>

        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">
            {{ client.lastVisit ? `Última: ${formatDate(client.lastVisit)}` : 'Sem visitas' }}
          </span>
          <button 
            @click.stop="viewHistory(client)"
            class="text-lilac-600 font-medium hover:text-lilac-700"
          >
            Histórico →
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && filteredClients.length === 0" class="text-center py-16">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-lilac-50 flex items-center justify-center">
        <Icon name="lucide:users" class="w-10 h-10 text-lilac-400" />
      </div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">
        {{ searchQuery ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado' }}
      </h3>
      <p class="text-gray-500 mb-6">
        {{ searchQuery ? 'Tente buscar com outros termos' : 'Comece cadastrando seus clientes' }}
      </p>
      <button 
        v-if="!searchQuery"
        @click="openNewModal"
        class="px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium"
      >
        Cadastrar primeiro cliente
      </button>
    </div>

    <!-- Modal Novo/Editar Cliente -->
    <UModal v-model="showModal" :ui="{ width: 'max-w-lg' }">
      <div class="p-6">
        <h2 class="text-xl font-display font-semibold text-gray-800 mb-6">
          {{ editingClient ? 'Editar Cliente' : 'Novo Cliente' }}
        </h2>
        
        <form @submit.prevent="saveClient" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="Nome do cliente"
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <input
                v-model="formData.phone"
                type="tel"
                placeholder="(00) 00000-0000"
                class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <input
                v-model="formData.email"
                type="email"
                placeholder="email@exemplo.com"
                class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
              <input
                v-model="formData.birthDate"
                type="date"
                class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Gênero</label>
              <select
                v-model="formData.gender"
                class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
              >
                <option value="">Não informado</option>
                <option value="female">Feminino</option>
                <option value="male">Masculino</option>
                <option value="other">Outro</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Observações</label>
            <textarea
              v-model="formData.notes"
              rows="2"
              placeholder="Preferências, alergias, observações..."
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none resize-none"
            />
          </div>

          <div class="flex items-center gap-3">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="formData.isVip" class="w-4 h-4 rounded border-gray-300 text-lilac-500 focus:ring-lilac-400" />
              <span class="text-sm text-gray-700">Cliente VIP</span>
            </label>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button 
              type="button"
              @click="showModal = false"
              class="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              :disabled="saving"
              class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 disabled:opacity-50 transition-all"
            >
              {{ saving ? 'Salvando...' : 'Salvar' }}
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

const { authHeaders } = useAuth()
const currentSalon = inject('currentSalon') as Ref<any>

const searchQuery = ref('')
const sortBy = ref('recent')
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const editingClient = ref<any>(null)

const clients = ref<any[]>([])

const formData = ref({
  name: '',
  phone: '',
  email: '',
  birthDate: '',
  gender: '',
  notes: '',
  isVip: false
})

const filteredClients = computed(() => {
  let result = clients.value

  // Filtrar por busca
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.phone?.includes(query) ||
      c.email?.toLowerCase().includes(query)
    )
  }

  // Ordenar
  switch (sortBy.value) {
    case 'name':
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'visits':
      result = [...result].sort((a, b) => (b.visitCount || 0) - (a.visitCount || 0))
      break
    case 'spent':
      result = [...result].sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0))
      break
    default:
      result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  return result
})

const getInitials = (name: string) => {
  const names = name.split(' ')
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
  }
  return names[0][0].toUpperCase()
}

const formatDate = (dateStr: string) => {
  try {
    return format(new Date(dateStr), "dd/MM/yyyy", { locale: ptBR })
  } catch {
    return dateStr
  }
}

// Carregar clientes
const loadClients = async () => {
  if (!currentSalon.value?.id) {
    loading.value = false
    return
  }

  loading.value = true
  try {
    const res = await $fetch(`/api/painel/clients?salonId=${currentSalon.value.id}`, {
      headers: authHeaders.value
    })
    clients.value = (res as any).data || []
  } catch (error) {
    console.error('Erro ao carregar clientes:', error)
  } finally {
    loading.value = false
  }
}

// Abrir modal de novo cliente
const openNewModal = () => {
  editingClient.value = null
  formData.value = {
    name: '',
    phone: '',
    email: '',
    birthDate: '',
    gender: '',
    notes: '',
    isVip: false
  }
  showModal.value = true
}

// Editar cliente
const editClient = (client: any) => {
  editingClient.value = client
  formData.value = {
    name: client.name,
    phone: client.phone || '',
    email: client.email || '',
    birthDate: client.birthDate || '',
    gender: client.gender || '',
    notes: client.notes || '',
    isVip: client.isVip || false
  }
  showModal.value = true
}

// Salvar cliente
const saveClient = async () => {
  if (!formData.value.name || !currentSalon.value?.id) return

  saving.value = true
  try {
    if (editingClient.value) {
      // Atualizar
      await $fetch(`/api/painel/clients/${editingClient.value.id}`, {
        method: 'PUT',
        headers: authHeaders.value,
        body: formData.value
      })
      await loadClients()
    } else {
      // Criar novo
      await $fetch('/api/painel/clients', {
        method: 'POST',
        headers: authHeaders.value,
        body: {
          salonId: currentSalon.value.id,
          ...formData.value
        }
      })
      await loadClients()
    }
    
    showModal.value = false
  } catch (error) {
    console.error('Erro ao salvar cliente:', error)
  } finally {
    saving.value = false
  }
}

// Visualizar cliente
const viewClient = (client: any) => {
  // TODO: Abrir modal de detalhes
  console.log('Ver cliente:', client)
}

// Histórico
const viewHistory = (client: any) => {
  // TODO: Navegar para histórico
  console.log('Ver histórico:', client)
}

// WhatsApp
const sendWhatsApp = (client: any) => {
  const phone = client.phone?.replace(/\D/g, '')
  if (phone) {
    window.open(`https://wa.me/55${phone}`, '_blank')
  }
}

// Watch para recarregar quando o salão mudar
watch(() => currentSalon.value?.id, () => {
  loadClients()
}, { immediate: true })

onMounted(() => {
  loadClients()
})
</script>
