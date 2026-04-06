<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">Servicos</h1>
        <p class="text-gray-500">Gerencie os servicos oferecidos pelo seu salao</p>
      </div>
      <button
        @click="openNewModal"
        class="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
      >
        <Icon name="lucide:plus" class="w-5 h-5" />
        Novo Servico
      </button>
    </div>

    <!-- Categories Filter -->
    <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
      <button
        v-for="category in categories"
        :key="category.id"
        :class="[
          'px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all',
          selectedCategory === category.id
            ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white'
            : 'bg-white border border-lilac-100 text-gray-600 hover:border-lilac-200'
        ]"
        @click="selectedCategory = category.id"
      >
        {{ category.name }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-lilac-200 border-t-lilac-500 rounded-full animate-spin"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMsg" class="text-center py-12">
      <Icon name="lucide:alert-circle" class="w-12 h-12 text-red-300 mx-auto mb-3" />
      <p class="text-gray-500">{{ errorMsg }}</p>
      <button @click="loadServices" class="mt-4 px-5 py-2.5 rounded-xl bg-lilac-50 text-lilac-600 font-medium hover:bg-lilac-100 transition-all">
        Tentar novamente
      </button>
    </div>

    <!-- Services Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="service in filteredServices"
        :key="service.id"
        class="p-5 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft group"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center"
              :style="{ background: `linear-gradient(135deg, ${service.color || '#a855f7'}20 0%, ${service.color || '#a855f7'}10 100%)` }"
            >
              <Icon :name="service.icon || 'lucide:sparkles'" class="w-6 h-6" :style="{ color: service.color || '#a855f7' }" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">{{ service.name }}</h3>
              <p class="text-sm text-gray-500">{{ getCategoryName(service.categoryId) }}</p>
            </div>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              @click="editService(service)"
              class="p-2 rounded-lg hover:bg-lilac-50 transition-colors"
            >
              <Icon name="lucide:pencil" class="w-4 h-4 text-gray-500" />
            </button>
            <button
              @click="deleteService(service)"
              :disabled="deleting === service.id"
              class="p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <Icon name="lucide:trash-2" class="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        <p class="text-sm text-gray-500 mb-4 line-clamp-2">{{ service.description || 'Sem descricao' }}</p>

        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-lilac-600">R$ {{ (service.price || 0).toFixed(2) }}</p>
            <p class="text-sm text-gray-400">{{ service.duration }} minutos</p>
          </div>
          <button
            @click="toggleActive(service)"
            :disabled="togglingActive === service.id"
            :class="[
              'px-3 py-1 rounded-full text-xs font-medium transition-all disabled:opacity-50',
              service.isActive ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            ]"
          >
            {{ service.isActive ? 'Ativo' : 'Inativo' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && !errorMsg && filteredServices.length === 0" class="text-center py-16">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-lilac-50 flex items-center justify-center">
        <Icon name="lucide:sparkles" class="w-10 h-10 text-lilac-400" />
      </div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Nenhum servico encontrado</h3>
      <p class="text-gray-500 max-w-md mx-auto mb-6">
        Comece adicionando os servicos que seu salao oferece.
      </p>
      <button
        @click="openNewModal"
        class="px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium"
      >
        Adicionar primeiro servico
      </button>
    </div>

    <!-- Modal Novo/Editar Servico -->
    <UModal v-model="showModal" :ui="{ width: 'max-w-lg' }">
      <div class="p-6">
        <h2 class="text-xl font-display font-semibold text-gray-800 mb-6">
          {{ editingService ? 'Editar Servico' : 'Novo Servico' }}
        </h2>

        <form @submit.prevent="saveService" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Servico *</label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="Ex: Corte Feminino"
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
            <select
              v-model="formData.categoryId"
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
            >
              <option value="">Selecione uma categoria</option>
              <option v-for="cat in categories.slice(1)" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descricao</label>
            <textarea
              v-model="formData.description"
              rows="2"
              placeholder="Descreva o servico..."
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none resize-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Preco (R$) *</label>
              <input
                v-model.number="formData.price"
                type="number"
                step="0.01"
                min="0"
                placeholder="80.00"
                class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Duracao (min) *</label>
              <input
                v-model.number="formData.duration"
                type="number"
                min="5"
                step="5"
                placeholder="60"
                class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Icone</label>
              <select
                v-model="formData.icon"
                class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
              >
                <option value="lucide:sparkles">Sparkles</option>
                <option value="lucide:scissors">Tesoura</option>
                <option value="lucide:wind">Secador</option>
                <option value="lucide:palette">Paleta</option>
                <option value="lucide:droplets">Gotas</option>
                <option value="lucide:hand">Mao</option>
                <option value="lucide:eye">Olho</option>
                <option value="lucide:heart">Coracao</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cor</label>
              <input
                v-model="formData.color"
                type="color"
                class="w-full h-12 px-2 rounded-xl bg-white border border-lilac-100 cursor-pointer"
              />
            </div>
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
definePageMeta({
  layout: 'painel'
})

const { api } = useApi()
const currentSalon = inject('currentSalon') as Ref<any>

const loading = ref(false)
const saving = ref(false)
const errorMsg = ref('')
const deleting = ref('')
const togglingActive = ref('')
const showModal = ref(false)
const editingService = ref<any>(null)
const selectedCategory = ref('all')

const services = ref<any[]>([])

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'hair', name: 'Cabelo' },
  { id: 'nails', name: 'Unhas' },
  { id: 'makeup', name: 'Maquiagem' },
  { id: 'skincare', name: 'Estetica' },
  { id: 'eyebrows', name: 'Sobrancelha' },
  { id: 'massage', name: 'Massagem' }
]

const formData = ref({
  name: '',
  description: '',
  categoryId: '',
  price: 0,
  duration: 60,
  icon: 'lucide:sparkles',
  color: '#a855f7'
})

const filteredServices = computed(() => {
  if (selectedCategory.value === 'all') {
    return services.value
  }
  return services.value.filter(s => s.categoryId === selectedCategory.value)
})

const getCategoryName = (categoryId: string) => {
  const cat = categories.find(c => c.id === categoryId)
  return cat?.name || 'Sem categoria'
}

// Carregar servicos
const loadServices = async () => {
  if (!currentSalon.value?.id) {
    loading.value = false
    return
  }

  loading.value = true
  errorMsg.value = ''
  try {
    const { data, error } = await api<any>('/api/painel/services', {
      params: { salonId: currentSalon.value.id }
    })

    if (error) {
      errorMsg.value = error
      return
    }

    services.value = data?.data || []
  } catch (error) {
    console.error('Erro ao carregar servicos:', error)
    errorMsg.value = 'Erro ao carregar servicos. Tente novamente.'
  } finally {
    loading.value = false
  }
}

// Abrir modal de novo servico
const openNewModal = () => {
  editingService.value = null
  formData.value = {
    name: '',
    description: '',
    categoryId: '',
    price: 0,
    duration: 60,
    icon: 'lucide:sparkles',
    color: '#a855f7'
  }
  showModal.value = true
}

// Editar servico
const editService = (service: any) => {
  editingService.value = service
  formData.value = {
    name: service.name,
    description: service.description || '',
    categoryId: service.categoryId || '',
    price: service.price,
    duration: service.duration,
    icon: service.icon || 'lucide:sparkles',
    color: service.color || '#a855f7'
  }
  showModal.value = true
}

// Salvar servico
const saveService = async () => {
  if (!formData.value.name || !formData.value.price || !formData.value.duration || !currentSalon.value?.id) {
    return
  }

  saving.value = true
  try {
    if (editingService.value) {
      const { error } = await api(`/api/painel/services/${editingService.value.id}`, {
        method: 'PUT',
        body: formData.value
      })
      if (error) {
        alert(error)
        return
      }
    } else {
      const { error } = await api('/api/painel/services', {
        method: 'POST',
        body: {
          salonId: currentSalon.value.id,
          ...formData.value
        }
      })
      if (error) {
        alert(error)
        return
      }
    }

    showModal.value = false
    await loadServices()
  } catch (error) {
    console.error('Erro ao salvar servico:', error)
    alert('Erro ao salvar servico')
  } finally {
    saving.value = false
  }
}

// Deletar servico
const deleteService = async (service: any) => {
  if (!confirm(`Tem certeza que deseja excluir o servico "${service.name}"?`)) {
    return
  }

  deleting.value = service.id
  try {
    const { error } = await api(`/api/painel/services/${service.id}`, {
      method: 'DELETE'
    })

    if (error) {
      alert(error)
      return
    }

    await loadServices()
  } catch (error) {
    console.error('Erro ao deletar servico:', error)
    alert('Erro ao excluir servico')
  } finally {
    deleting.value = ''
  }
}

// Toggle ativo/inativo
const toggleActive = async (service: any) => {
  togglingActive.value = service.id
  try {
    const { error } = await api(`/api/painel/services/${service.id}`, {
      method: 'PUT',
      body: { isActive: !service.isActive }
    })

    if (error) {
      alert(error)
      return
    }

    service.isActive = !service.isActive
  } catch (error) {
    console.error('Erro ao atualizar servico:', error)
  } finally {
    togglingActive.value = ''
  }
}

// Watch para recarregar quando o salao mudar
watch(() => currentSalon.value?.id, (newId) => {
  if (newId) loadServices()
}, { immediate: true })
</script>
