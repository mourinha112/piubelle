<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">Serviços</h1>
        <p class="text-gray-500">Gerencie os serviços oferecidos pelo seu salão</p>
      </div>
      <button 
        @click="openNewModal"
        class="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
      >
        <Icon name="lucide:plus" class="w-5 h-5" />
        Novo Serviço
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
    <div v-if="loading" class="text-center py-12">
      <Icon name="lucide:loader-2" class="w-8 h-8 text-lilac-500 animate-spin mx-auto" />
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
              :style="{ background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}10 100%)` }"
            >
              <Icon :name="service.icon || 'lucide:sparkles'" class="w-6 h-6" :style="{ color: service.color }" />
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
              class="p-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Icon name="lucide:trash-2" class="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        <p class="text-sm text-gray-500 mb-4 line-clamp-2">{{ service.description || 'Sem descrição' }}</p>

        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-lilac-600">R$ {{ service.price.toFixed(2) }}</p>
            <p class="text-sm text-gray-400">{{ service.duration }} minutos</p>
          </div>
          <button 
            @click="toggleActive(service)"
            :class="[
              'px-3 py-1 rounded-full text-xs font-medium transition-all',
              service.isActive ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            ]"
          >
            {{ service.isActive ? 'Ativo' : 'Inativo' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && filteredServices.length === 0" class="text-center py-16">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-lilac-50 flex items-center justify-center">
        <Icon name="lucide:sparkles" class="w-10 h-10 text-lilac-400" />
      </div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Nenhum serviço encontrado</h3>
      <p class="text-gray-500 max-w-md mx-auto mb-6">
        Comece adicionando os serviços que seu salão oferece.
      </p>
      <button 
        @click="openNewModal"
        class="px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium"
      >
        Adicionar primeiro serviço
      </button>
    </div>

    <!-- Modal Novo/Editar Serviço -->
    <UModal v-model="showModal" :ui="{ width: 'max-w-lg' }">
      <div class="p-6">
        <h2 class="text-xl font-display font-semibold text-gray-800 mb-6">
          {{ editingService ? 'Editar Serviço' : 'Novo Serviço' }}
        </h2>
        
        <form @submit.prevent="saveService" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Serviço *</label>
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <textarea
              v-model="formData.description"
              rows="2"
              placeholder="Descreva o serviço..."
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none resize-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Preço (R$) *</label>
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Duração (min) *</label>
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Ícone</label>
              <select
                v-model="formData.icon"
                class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-700 focus:border-lilac-300 outline-none"
              >
                <option value="lucide:sparkles">✨ Sparkles</option>
                <option value="lucide:scissors">✂️ Tesoura</option>
                <option value="lucide:wind">💨 Secador</option>
                <option value="lucide:palette">🎨 Paleta</option>
                <option value="lucide:droplets">💧 Gotas</option>
                <option value="lucide:hand">🖐️ Mão</option>
                <option value="lucide:eye">👁️ Olho</option>
                <option value="lucide:heart">❤️ Coração</option>
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

const { authHeaders } = useAuth()
const currentSalon = inject('currentSalon') as Ref<any>

const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const editingService = ref<any>(null)
const selectedCategory = ref('all')

const services = ref<any[]>([])

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'hair', name: 'Cabelo' },
  { id: 'nails', name: 'Unhas' },
  { id: 'makeup', name: 'Maquiagem' },
  { id: 'skincare', name: 'Estética' },
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

// Carregar serviços
const loadServices = async () => {
  if (!currentSalon.value?.id) {
    loading.value = false
    return
  }

  loading.value = true
  try {
    const res = await $fetch(`/api/painel/services?salonId=${currentSalon.value.id}`, {
      headers: authHeaders.value
    })
    services.value = (res as any).data || []
  } catch (error) {
    console.error('Erro ao carregar serviços:', error)
  } finally {
    loading.value = false
  }
}

// Abrir modal de novo serviço
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

// Editar serviço
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

// Salvar serviço
const saveService = async () => {
  if (!formData.value.name || !formData.value.price || !formData.value.duration || !currentSalon.value?.id) {
    return
  }

  saving.value = true
  try {
    if (editingService.value) {
      // Atualizar
      await $fetch(`/api/painel/services/${editingService.value.id}`, {
        method: 'PUT',
        headers: authHeaders.value,
        body: formData.value
      })
    } else {
      // Criar novo
      await $fetch('/api/painel/services', {
        method: 'POST',
        headers: authHeaders.value,
        body: {
          salonId: currentSalon.value.id,
          ...formData.value
        }
      })
    }
    
    showModal.value = false
    await loadServices()
  } catch (error) {
    console.error('Erro ao salvar serviço:', error)
  } finally {
    saving.value = false
  }
}

// Deletar serviço
const deleteService = async (service: any) => {
  if (!confirm(`Tem certeza que deseja excluir o serviço "${service.name}"?`)) {
    return
  }

  try {
    await $fetch(`/api/painel/services/${service.id}`, {
      method: 'DELETE',
      headers: authHeaders.value
    })
    await loadServices()
  } catch (error) {
    console.error('Erro ao deletar serviço:', error)
  }
}

// Toggle ativo/inativo
const toggleActive = async (service: any) => {
  try {
    await $fetch(`/api/painel/services/${service.id}`, {
      method: 'PUT',
      headers: authHeaders.value,
      body: { isActive: !service.isActive }
    })
    service.isActive = !service.isActive
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error)
  }
}

// Watch para recarregar quando o salão mudar
watch(() => currentSalon.value?.id, () => {
  loadServices()
}, { immediate: true })

onMounted(() => {
  loadServices()
})
</script>
