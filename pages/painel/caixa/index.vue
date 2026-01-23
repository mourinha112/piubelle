<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">Caixa do Dia</h1>
        <p class="text-gray-500">{{ formattedDate }}</p>
      </div>
      <div class="flex gap-3">
        <button 
          @click="openTransactionModal('income')"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 font-medium hover:bg-emerald-100 transition-all"
        >
          <Icon name="lucide:plus" class="w-5 h-5" />
          Entrada
        </button>
        <button 
          @click="openTransactionModal('expense')"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-all"
        >
          <Icon name="lucide:minus" class="w-5 h-5" />
          Saída
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-lilac-200 border-t-lilac-500 rounded-full animate-spin"></div>
    </div>

    <template v-else>
      <!-- Caixa Status -->
      <div class="p-6 rounded-2xl bg-gradient-to-r from-lilac-500 via-lilac-600 to-rose-500 text-white">
        <div class="flex items-center justify-between mb-6">
          <div>
            <p class="text-lilac-100">Saldo atual</p>
            <p class="text-4xl font-bold">R$ {{ cashRegister.currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
          </div>
          <div class="flex gap-3">
            <button 
              v-if="!cashRegister.isOpen"
              @click="openCashRegister"
              class="px-6 py-3 rounded-xl bg-white text-lilac-600 font-semibold hover:bg-lilac-50 transition-all"
            >
              Abrir Caixa
            </button>
            <button 
              v-else
              @click="closeCashRegister"
              class="px-6 py-3 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-all"
            >
              Fechar Caixa
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="p-4 rounded-xl bg-white/10">
            <p class="text-sm text-lilac-100">Abertura</p>
            <p class="text-xl font-bold">R$ {{ cashRegister.openingAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
          </div>
          <div class="p-4 rounded-xl bg-white/10">
            <p class="text-sm text-emerald-200">Entradas</p>
            <p class="text-xl font-bold text-emerald-200">+R$ {{ cashRegister.totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
          </div>
          <div class="p-4 rounded-xl bg-white/10">
            <p class="text-sm text-red-200">Saídas</p>
            <p class="text-xl font-bold text-red-200">-R$ {{ cashRegister.totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
          </div>
          <div class="p-4 rounded-xl bg-white/10">
            <p class="text-sm text-lilac-100">Atendimentos</p>
            <p class="text-xl font-bold">{{ cashRegister.servicesCount }}</p>
          </div>
        </div>
      </div>

      <!-- Payment Methods Summary -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Icon name="lucide:banknote" class="w-5 h-5 text-green-600" />
            </div>
            <span class="text-gray-600">Dinheiro</span>
          </div>
          <p class="text-2xl font-bold text-gray-800">R$ {{ paymentSummary.cash.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Icon name="lucide:qr-code" class="w-5 h-5 text-emerald-600" />
            </div>
            <span class="text-gray-600">PIX</span>
          </div>
          <p class="text-2xl font-bold text-gray-800">R$ {{ paymentSummary.pix.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Icon name="lucide:credit-card" class="w-5 h-5 text-blue-600" />
            </div>
            <span class="text-gray-600">Crédito</span>
          </div>
          <p class="text-2xl font-bold text-gray-800">R$ {{ paymentSummary.credit.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Icon name="lucide:credit-card" class="w-5 h-5 text-purple-600" />
            </div>
            <span class="text-gray-600">Débito</span>
          </div>
          <p class="text-2xl font-bold text-gray-800">R$ {{ paymentSummary.debit.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
        </div>
      </div>

      <!-- Today's Movements -->
      <div class="bg-white rounded-2xl border border-lilac-100 shadow-soft overflow-hidden">
        <div class="p-4 bg-gradient-to-r from-lilac-50 to-rose-50 border-b border-lilac-100">
          <h2 class="font-semibold text-gray-800">Movimentações de Hoje</h2>
        </div>
        
        <div class="divide-y divide-lilac-50">
          <div 
            v-for="movement in movements"
            :key="movement.id"
            class="flex items-center justify-between p-4 hover:bg-lilac-50/30 transition-colors"
          >
            <div class="flex items-center gap-4">
              <div 
                class="w-10 h-10 rounded-xl flex items-center justify-center"
                :class="movement.type === 'income' ? 'bg-emerald-100' : 'bg-red-100'"
              >
                <Icon 
                  :name="movement.type === 'income' ? 'lucide:arrow-down-left' : 'lucide:arrow-up-right'" 
                  class="w-5 h-5"
                  :class="movement.type === 'income' ? 'text-emerald-600' : 'text-red-600'"
                />
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ movement.description }}</p>
                <p class="text-sm text-gray-500">{{ formatTime(movement.createdAt) }} • {{ movement.paymentMethod }}</p>
              </div>
            </div>
            <span 
              class="font-semibold"
              :class="movement.type === 'income' ? 'text-emerald-600' : 'text-red-600'"
            >
              {{ movement.type === 'income' ? '+' : '-' }}R$ {{ movement.amount.toFixed(2) }}
            </span>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="movements.length === 0" class="text-center py-12">
          <Icon name="lucide:receipt" class="w-12 h-12 text-lilac-300 mx-auto mb-3" />
          <p class="text-gray-500">Nenhuma movimentação hoje</p>
          <p class="text-sm text-gray-400 mt-1">As entradas e saídas aparecerão aqui</p>
        </div>
      </div>
    </template>

    <!-- Transaction Modal -->
    <div v-if="showTransactionModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-xl font-display font-semibold text-gray-800">
            {{ transactionType === 'income' ? 'Registrar Entrada' : 'Registrar Saída' }}
          </h3>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
            <input 
              v-model="newTransaction.description"
              type="text"
              placeholder="Ex: Pagamento de serviço"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valor (R$) *</label>
            <input 
              v-model.number="newTransaction.amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Forma de Pagamento</label>
            <select 
              v-model="newTransaction.paymentMethod"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            >
              <option value="cash">Dinheiro</option>
              <option value="pix">PIX</option>
              <option value="credit">Cartão de Crédito</option>
              <option value="debit">Cartão de Débito</option>
            </select>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <button 
            @click="showTransactionModal = false"
            class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button 
            @click="saveTransaction"
            :disabled="!newTransaction.description || !newTransaction.amount"
            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all disabled:opacity-50"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

definePageMeta({
  layout: 'painel'
})

const { authHeaders } = useAuth()
const currentSalon = inject<Ref<any>>('currentSalon')

const loading = ref(true)
const showTransactionModal = ref(false)
const transactionType = ref<'income' | 'expense'>('income')
const movements = ref<any[]>([])

const formattedDate = computed(() => {
  return format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
})

const cashRegister = ref({
  isOpen: false,
  openingAmount: 0,
  currentBalance: 0,
  totalIncome: 0,
  totalExpense: 0,
  servicesCount: 0
})

const paymentSummary = ref({
  cash: 0,
  pix: 0,
  credit: 0,
  debit: 0
})

const newTransaction = ref({
  description: '',
  amount: 0,
  paymentMethod: 'cash'
})

const formatTime = (dateStr: string) => {
  try {
    return format(new Date(dateStr), 'HH:mm')
  } catch {
    return '--:--'
  }
}

// Fetch cash register data
const fetchCashRegister = async () => {
  if (!currentSalon?.value?.id) {
    loading.value = false
    return
  }

  try {
    const { data } = await useFetch(`/api/painel/transactions?salonId=${currentSalon.value.id}&date=${new Date().toISOString().split('T')[0]}`, {
      headers: authHeaders.value
    })

    if (data.value?.success) {
      movements.value = data.value.data || []
      calculateSummary()
    }
  } catch (error) {
    console.error('Erro ao buscar caixa:', error)
  } finally {
    loading.value = false
  }
}

const calculateSummary = () => {
  let income = 0
  let expense = 0
  let cash = 0
  let pix = 0
  let credit = 0
  let debit = 0

  movements.value.forEach((m: any) => {
    const amount = parseFloat(m.amount) || 0
    if (m.type === 'income') {
      income += amount
      switch (m.paymentMethod) {
        case 'cash': cash += amount; break
        case 'pix': pix += amount; break
        case 'credit': credit += amount; break
        case 'debit': debit += amount; break
      }
    } else {
      expense += amount
    }
  })

  cashRegister.value = {
    isOpen: true,
    openingAmount: 0,
    currentBalance: income - expense,
    totalIncome: income,
    totalExpense: expense,
    servicesCount: movements.value.filter((m: any) => m.type === 'income').length
  }

  paymentSummary.value = { cash, pix, credit, debit }
}

const openTransactionModal = (type: 'income' | 'expense') => {
  transactionType.value = type
  newTransaction.value = { description: '', amount: 0, paymentMethod: 'cash' }
  showTransactionModal.value = true
}

const saveTransaction = async () => {
  if (!newTransaction.value.description || !newTransaction.value.amount || !currentSalon?.value?.id) return

  try {
    const { data } = await useFetch('/api/painel/transactions', {
      method: 'POST',
      headers: authHeaders.value,
      body: {
        salonId: currentSalon.value.id,
        type: transactionType.value,
        description: newTransaction.value.description,
        amount: newTransaction.value.amount,
        paymentMethod: newTransaction.value.paymentMethod
      }
    })

    if (data.value?.success) {
      movements.value.unshift(data.value.data)
      calculateSummary()
      showTransactionModal.value = false
    }
  } catch (error) {
    console.error('Erro ao salvar transação:', error)
  }
}

const openCashRegister = async () => {
  cashRegister.value.isOpen = true
}

const closeCashRegister = async () => {
  cashRegister.value.isOpen = false
}

// Watch for salon changes
watch(() => currentSalon?.value?.id, () => {
  fetchCashRegister()
}, { immediate: true })

onMounted(() => {
  fetchCashRegister()
})
</script>
