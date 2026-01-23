<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">Equipe</h1>
        <p class="text-gray-500">Gerencie as profissionais do seu salão</p>
      </div>
      <button 
        @click="openNewModal"
        class="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
      >
        <Icon name="lucide:user-plus" class="w-5 h-5" />
        Adicionar Profissional
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-lilac-200 border-t-lilac-500 rounded-full animate-spin"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="professionals.length === 0" class="text-center py-12">
      <Icon name="lucide:users" class="w-12 h-12 text-lilac-300 mx-auto mb-3" />
      <p class="text-gray-500">Nenhum profissional cadastrado</p>
      <p class="text-sm text-gray-400 mt-1">Adicione profissionais para gerenciar sua equipe</p>
      <button 
        @click="openNewModal"
        class="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium"
      >
        Adicionar Primeiro Profissional
      </button>
    </div>

    <!-- Team Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="professional in professionals"
        :key="professional.id"
        class="p-6 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft"
      >
        <!-- Profile -->
        <div class="flex items-center gap-4 mb-6">
          <div class="relative">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-lilac-300 to-rose-300 flex items-center justify-center overflow-hidden">
              <img v-if="professional.photo" :src="professional.photo" class="w-full h-full object-cover" />
              <span v-else class="text-2xl font-bold text-white">{{ getInitials(professional.name) }}</span>
            </div>
            <span 
              class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white"
              :class="professional.isActive ? 'bg-emerald-400' : 'bg-gray-300'"
            />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-gray-800">{{ professional.name }}</h3>
            <p class="text-sm text-gray-500">{{ professional.role || 'Profissional' }}</p>
            <div v-if="professional.rating" class="flex items-center gap-1 mt-1">
              <Icon name="lucide:star" class="w-4 h-4 text-amber-400 fill-current" />
              <span class="text-sm font-medium text-gray-700">{{ professional.rating }}</span>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="p-3 rounded-xl bg-lilac-50">
            <p class="text-xl font-bold text-lilac-600">{{ professional.appointmentsToday || 0 }}</p>
            <p class="text-xs text-gray-500">Agendamentos hoje</p>
          </div>
          <div class="p-3 rounded-xl bg-rose-50">
            <p class="text-xl font-bold text-rose-600">{{ professional.appointmentsMonth || 0 }}</p>
            <p class="text-xs text-gray-500">Este mês</p>
          </div>
        </div>

        <!-- Services -->
        <div v-if="professional.specialties?.length" class="mb-4">
          <p class="text-xs text-gray-400 mb-2">Especialidades:</p>
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="specialty in (professional.specialties || []).slice(0, 3)"
              :key="specialty"
              class="px-2 py-0.5 rounded-md bg-gray-100 text-xs text-gray-600"
            >
              {{ specialty }}
            </span>
            <span v-if="(professional.specialties || []).length > 3" class="px-2 py-0.5 rounded-md bg-gray-100 text-xs text-gray-500">
              +{{ professional.specialties.length - 3 }}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-2">
          <button class="flex-1 py-2 rounded-xl bg-lilac-50 text-lilac-600 text-sm font-medium hover:bg-lilac-100 transition-all">
            Ver agenda
          </button>
          <button 
            @click="editProfessional(professional)"
            class="flex-1 py-2 rounded-xl bg-gray-50 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-all"
          >
            Editar
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-xl font-display font-semibold text-gray-800">
            {{ editingProfessional ? 'Editar Profissional' : 'Novo Profissional' }}
          </h3>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
            <input 
              v-model="formData.name"
              type="text"
              placeholder="Nome completo"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <input 
              v-model="formData.email"
              type="email"
              placeholder="email@exemplo.com"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
            <input 
              v-model="formData.phone"
              type="tel"
              placeholder="(00) 00000-0000"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Cargo/Função</label>
            <input 
              v-model="formData.role"
              type="text"
              placeholder="Ex: Cabeleireira, Manicure"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div class="flex items-center gap-3">
            <input 
              v-model="formData.isActive"
              type="checkbox"
              id="isActive"
              class="w-5 h-5 rounded border-gray-300 text-lilac-500 focus:ring-lilac-500"
            />
            <label for="isActive" class="text-sm text-gray-700">Profissional ativo</label>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <button 
            @click="showModal = false"
            class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button 
            @click="saveProfessional"
            :disabled="!formData.name || saving"
            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all disabled:opacity-50"
          >
            {{ saving ? 'Salvando...' : 'Salvar' }}
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
const currentSalon = inject('currentSalon') as Ref<any>

const loading = ref(true)
const saving = ref(false)
const showModal = ref(false)
const editingProfessional = ref<any>(null)
const professionals = ref<any[]>([])

const formData = ref({
  name: '',
  email: '',
  phone: '',
  role: '',
  isActive: true
})

const getInitials = (name: string) => {
  const names = name.split(' ')
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
  }
  return names[0][0].toUpperCase()
}

const loadProfessionals = async () => {
  if (!currentSalon.value?.id) {
    loading.value = false
    return
  }

  loading.value = true
  try {
    const res = await $fetch(`/api/painel/professionals?salonId=${currentSalon.value.id}`, {
      headers: authHeaders.value
    })
    professionals.value = (res as any).data || []
  } catch (error) {
    console.error('Erro ao carregar equipe:', error)
  } finally {
    loading.value = false
  }
}

const openNewModal = () => {
  editingProfessional.value = null
  formData.value = { name: '', email: '', phone: '', role: '', isActive: true }
  showModal.value = true
}

const editProfessional = (professional: any) => {
  editingProfessional.value = professional
  formData.value = {
    name: professional.name,
    email: professional.email || '',
    phone: professional.phone || '',
    role: professional.role || '',
    isActive: professional.isActive !== false
  }
  showModal.value = true
}

const saveProfessional = async () => {
  if (!formData.value.name || !currentSalon.value?.id) return

  saving.value = true
  try {
    if (editingProfessional.value) {
      await $fetch(`/api/painel/professionals/${editingProfessional.value.id}`, {
        method: 'PUT',
        headers: authHeaders.value,
        body: formData.value
      })
    } else {
      await $fetch('/api/painel/professionals', {
        method: 'POST',
        headers: authHeaders.value,
        body: {
          salonId: currentSalon.value.id,
          ...formData.value
        }
      })
    }
    
    showModal.value = false
    await loadProfessionals()
  } catch (error) {
    console.error('Erro ao salvar profissional:', error)
  } finally {
    saving.value = false
  }
}

watch(() => currentSalon.value?.id, () => {
  loadProfessionals()
}, { immediate: true })

onMounted(() => {
  loadProfessionals()
})
</script>
