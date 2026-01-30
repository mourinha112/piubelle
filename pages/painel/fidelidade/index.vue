<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">Programa de Fidelidade</h1>
        <p class="text-gray-500">Recompense seus clientes fiéis</p>
      </div>
      <button 
        @click="showConfigModal = true"
        class="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
      >
        <Icon name="lucide:settings" class="w-5 h-5" />
        Configurar Programa
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-lilac-200 border-t-lilac-500 rounded-full animate-spin"></div>
    </div>

    <template v-else>
      <!-- Program Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="p-6 rounded-2xl bg-gradient-to-br from-lilac-500 to-lilac-600 text-white">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="lucide:users" class="w-6 h-6" />
            </div>
            <span class="text-lilac-100">Participantes</span>
          </div>
          <p class="text-3xl font-bold">{{ stats.participants }}</p>
        </div>

        <div class="p-6 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 text-white">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="lucide:stamp" class="w-6 h-6" />
            </div>
            <span class="text-rose-100">Pontos dados</span>
          </div>
          <p class="text-3xl font-bold">{{ stats.totalPoints }}</p>
        </div>

        <div class="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="lucide:gift" class="w-6 h-6" />
            </div>
            <span class="text-amber-100">Recompensas</span>
          </div>
          <p class="text-3xl font-bold">{{ stats.rewardsRedeemed }}</p>
        </div>

        <div class="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="lucide:trophy" class="w-6 h-6" />
            </div>
            <span class="text-emerald-100">Próximos a ganhar</span>
          </div>
          <p class="text-3xl font-bold">{{ stats.closeToReward }}</p>
        </div>
      </div>

      <!-- Current Program -->
      <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <h2 class="font-display text-xl font-semibold text-gray-800 mb-6">Programa Ativo</h2>
        
        <div v-if="!program.isActive" class="text-center py-8">
          <Icon name="lucide:gift" class="w-12 h-12 text-lilac-300 mx-auto mb-3" />
          <p class="text-gray-500">Nenhum programa de fidelidade ativo</p>
          <p class="text-sm text-gray-400 mt-1">Configure um programa para começar a fidelizar seus clientes</p>
          <button 
            @click="showConfigModal = true"
            class="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium"
          >
            Criar Programa
          </button>
        </div>

        <div v-else class="flex flex-col md:flex-row gap-8">
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-lilac-100 to-rose-100 flex items-center justify-center">
                <Icon name="lucide:heart" class="w-8 h-8 text-lilac-500" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">{{ program.name }}</h3>
                <p class="text-gray-500">{{ program.description }}</p>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Pontos necessários</span>
                <span class="font-semibold text-gray-800">{{ program.pointsRequired }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Recompensa</span>
                <span class="font-semibold text-lilac-600">{{ program.rewardName }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Valor da recompensa</span>
                <span class="font-semibold text-gray-800">R$ {{ program.rewardValue.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="flex-1">
            <h4 class="font-medium text-gray-800 mb-4">Visualização do Cartão</h4>
            <div class="p-6 rounded-2xl bg-gradient-to-br from-lilac-50 to-rose-50 border border-lilac-200">
              <div class="flex items-center justify-between mb-4">
                <span class="font-display text-lg font-semibold text-lilac-700">PiuBelle</span>
                <span class="text-sm text-gray-500">Cartão Fidelidade</span>
              </div>
              <div class="grid grid-cols-5 gap-2">
                <div 
                  v-for="i in program.pointsRequired" 
                  :key="i"
                  class="aspect-square rounded-xl border-2 border-dashed border-lilac-300 flex items-center justify-center"
                  :class="i <= previewPoints ? 'bg-gradient-to-br from-lilac-400 to-rose-400 border-solid' : ''"
                >
                  <Icon 
                    v-if="i <= previewPoints"
                    name="lucide:check" 
                    class="w-5 h-5 text-white" 
                  />
                  <span v-else class="text-lilac-300 text-lg">{{ i }}</span>
                </div>
              </div>
              <p class="text-center text-sm text-gray-500 mt-4">{{ previewPoints }} de {{ program.pointsRequired }} pontos</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Clients -->
      <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <h2 class="font-display text-xl font-semibold text-gray-800 mb-6">Clientes Mais Fiéis</h2>
        
        <div v-if="topClients.length === 0" class="text-center py-8">
          <Icon name="lucide:users" class="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p class="text-gray-500">Nenhum cliente no programa ainda</p>
        </div>

        <div v-else class="space-y-3">
          <div 
            v-for="(client, index) in topClients"
            :key="client.id"
            class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-lilac-50/50 transition-colors"
          >
            <div 
              class="w-8 h-8 rounded-lg flex items-center justify-center font-bold"
              :class="index < 3 ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white' : 'bg-gray-200 text-gray-600'"
            >
              {{ index + 1 }}
            </div>
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-lilac-200 to-rose-200 flex items-center justify-center">
              <span class="font-bold text-lilac-700">{{ client.name?.charAt(0) || '?' }}</span>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-800">{{ client.name }}</p>
              <p class="text-sm text-gray-500">{{ client.visits }} visitas</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-lilac-600">{{ client.points }} pontos</p>
              <p class="text-sm text-gray-500">{{ client.rewards }} recompensas</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Config Modal -->
    <div 
      v-if="showConfigModal" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showConfigModal = false"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md" @click.stop>
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 class="text-xl font-display font-semibold text-gray-800">Configurar Programa</h3>
          <button 
            @click="showConfigModal = false"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Icon name="lucide:x" class="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Programa</label>
            <input 
              v-model="programConfig.name"
              type="text"
              placeholder="Ex: Cartão Fidelidade PiuBelle"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <input 
              v-model="programConfig.description"
              type="text"
              placeholder="Ex: Complete 10 visitas e ganhe!"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Pontos necessários</label>
            <input 
              v-model.number="programConfig.pointsRequired"
              type="number"
              min="1"
              max="20"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome da recompensa</label>
            <input 
              v-model="programConfig.rewardName"
              type="text"
              placeholder="Ex: Corte Grátis"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valor da recompensa (R$)</label>
            <input 
              v-model.number="programConfig.rewardValue"
              type="number"
              min="0"
              step="0.01"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>

          <div class="flex items-center gap-3">
            <input 
              v-model="programConfig.isActive"
              type="checkbox"
              id="isActive"
              class="w-5 h-5 rounded border-gray-300 text-lilac-500 focus:ring-lilac-500"
            />
            <label for="isActive" class="text-sm text-gray-700">Programa ativo</label>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <button 
            @click="showConfigModal = false"
            class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button 
            @click="saveProgram"
            :disabled="saving"
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
const showConfigModal = ref(false)
const previewPoints = ref(7)

const stats = ref({
  participants: 0,
  totalPoints: 0,
  rewardsRedeemed: 0,
  closeToReward: 0
})

const program = ref({
  isActive: false,
  name: '',
  description: '',
  pointsRequired: 10,
  rewardName: '',
  rewardValue: 0
})

const programConfig = ref({
  name: 'Cartão Fidelidade PiuBelle',
  description: 'Complete 10 visitas e ganhe um serviço grátis!',
  pointsRequired: 10,
  rewardName: 'Corte Grátis',
  rewardValue: 80,
  isActive: true
})

const topClients = ref<any[]>([])

const loadLoyaltyData = async () => {
  if (!currentSalon.value?.id) {
    loading.value = false
    return
  }

  loading.value = true
  try {
    const res = await $fetch(`/api/painel/loyalty?salonId=${currentSalon.value.id}`, {
      headers: authHeaders.value
    })
    
    if ((res as any).success) {
      const data = (res as any).data || {}
      
      if (data.program) {
        program.value = {
          isActive: data.program.isActive,
          name: data.program.name,
          description: data.program.description,
          pointsRequired: data.program.pointsRequired,
          rewardName: data.program.rewardName,
          rewardValue: data.program.rewardValue
        }
        programConfig.value = { ...program.value }
      }

      stats.value = data.stats || stats.value
      topClients.value = data.topClients || []
    }
  } catch (error) {
    console.error('Erro ao carregar programa de fidelidade:', error)
  } finally {
    loading.value = false
  }
}

const saveProgram = async () => {
  if (!currentSalon.value?.id) return

  saving.value = true
  try {
    await $fetch('/api/painel/loyalty', {
      method: 'POST',
      headers: authHeaders.value,
      body: {
        salonId: currentSalon.value.id,
        ...programConfig.value
      }
    })
    
    program.value = { ...programConfig.value }
    showConfigModal.value = false
  } catch (error) {
    console.error('Erro ao salvar programa:', error)
  } finally {
    saving.value = false
  }
}

watch(() => currentSalon.value?.id, () => {
  loadLoyaltyData()
}, { immediate: true })

onMounted(() => {
  loadLoyaltyData()
})
</script>
