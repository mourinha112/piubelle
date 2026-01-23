<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">Financeiro</h1>
        <p class="text-gray-500">Acompanhe as finanças do seu salão</p>
      </div>
      <div class="flex gap-3">
        <select 
          v-model="selectedPeriod"
          class="px-4 py-2 rounded-xl bg-white border border-lilac-100 text-gray-700 shadow-soft outline-none"
        >
          <option value="month">Este mês</option>
          <option value="week">Esta semana</option>
          <option value="today">Hoje</option>
        </select>
        <button class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-lilac-100 text-gray-600 hover:border-lilac-200 transition-all shadow-soft">
          <Icon name="lucide:download" class="w-5 h-5" />
          Exportar
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-lilac-200 border-t-lilac-500 rounded-full animate-spin"></div>
    </div>

    <template v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="lucide:trending-up" class="w-6 h-6" />
            </div>
            <span class="text-emerald-100">Receita</span>
          </div>
          <p class="text-3xl font-bold">R$ {{ financialStats.totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
        </div>

        <div class="p-6 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="lucide:trending-down" class="w-6 h-6" />
            </div>
            <span class="text-red-100">Despesas</span>
          </div>
          <p class="text-3xl font-bold">R$ {{ financialStats.totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
        </div>

        <div class="p-6 rounded-2xl bg-gradient-to-br from-lilac-500 to-lilac-600 text-white">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="lucide:wallet" class="w-6 h-6" />
            </div>
            <span class="text-lilac-100">Lucro líquido</span>
          </div>
          <p class="text-3xl font-bold">R$ {{ financialStats.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
        </div>

        <div class="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="lucide:receipt" class="w-6 h-6" />
            </div>
            <span class="text-amber-100">Transações</span>
          </div>
          <p class="text-3xl font-bold">{{ financialStats.count }}</p>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Transactions -->
        <div class="lg:col-span-2 p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display text-xl font-semibold text-gray-800">Transações Recentes</h2>
            <NuxtLink to="/painel/caixa" class="text-sm text-lilac-600 font-medium hover:text-lilac-700">Ver todas →</NuxtLink>
          </div>

          <div v-if="recentTransactions.length === 0" class="text-center py-8">
            <Icon name="lucide:receipt" class="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-500">Nenhuma transação registrada</p>
          </div>

          <div v-else class="space-y-3">
            <div 
              v-for="transaction in recentTransactions"
              :key="transaction.id"
              class="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-lilac-50/50 transition-colors"
            >
              <div class="flex items-center gap-4">
                <div 
                  class="w-10 h-10 rounded-xl flex items-center justify-center"
                  :class="transaction.type === 'income' ? 'bg-emerald-100' : 'bg-red-100'"
                >
                  <Icon 
                    :name="transaction.type === 'income' ? 'lucide:arrow-down-left' : 'lucide:arrow-up-right'" 
                    class="w-5 h-5"
                    :class="transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'"
                  />
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ transaction.description }}</p>
                  <p class="text-sm text-gray-500">{{ transaction.date }} • {{ getPaymentMethodLabel(transaction.paymentMethod) }}</p>
                </div>
              </div>
              <span 
                class="font-semibold"
                :class="transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'"
              >
                {{ transaction.type === 'income' ? '+' : '-' }}R$ {{ transaction.amount.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="font-display text-xl font-semibold text-gray-800 mb-6">Por Método de Pagamento</h2>
          
          <div v-if="paymentMethods.length === 0" class="text-center py-8">
            <Icon name="lucide:credit-card" class="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-500">Sem dados</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="method in paymentMethods" :key="method.name">
              <div class="flex items-center justify-between mb-2">
                <span class="text-gray-600">{{ method.name }}</span>
                <span class="font-semibold text-gray-800">R$ {{ method.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
              </div>
              <div class="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all"
                  :class="method.color"
                  :style="{ width: `${method.percentage}%` }"
                />
              </div>
              <p class="text-xs text-gray-400 mt-1">{{ method.percentage }}% do total</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { format, subDays, startOfMonth, startOfWeek } from 'date-fns'

definePageMeta({
  layout: 'painel'
})

const { authHeaders } = useAuth()
const currentSalon = inject('currentSalon') as Ref<any>

const loading = ref(true)
const selectedPeriod = ref('month')
const recentTransactions = ref<any[]>([])

const financialStats = ref({
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  count: 0
})

const paymentMethods = ref<any[]>([])

const paymentMethodLabels: Record<string, string> = {
  cash: 'Dinheiro',
  pix: 'PIX',
  credit: 'Cartão de Crédito',
  credit_card: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  debit_card: 'Cartão de Débito'
}

const getPaymentMethodLabel = (method: string) => {
  return paymentMethodLabels[method] || method
}

const getDateRange = () => {
  const today = new Date()
  let startDate: Date
  
  switch (selectedPeriod.value) {
    case 'today':
      startDate = today
      break
    case 'week':
      startDate = startOfWeek(today)
      break
    case 'month':
    default:
      startDate = startOfMonth(today)
  }

  return {
    startDate: format(startDate, 'yyyy-MM-dd'),
    endDate: format(today, 'yyyy-MM-dd')
  }
}

const loadFinancialData = async () => {
  if (!currentSalon.value?.id) {
    loading.value = false
    return
  }

  loading.value = true
  try {
    const { startDate, endDate } = getDateRange()
    
    const res = await $fetch(`/api/painel/transactions?salonId=${currentSalon.value.id}&startDate=${startDate}&endDate=${endDate}`, {
      headers: authHeaders.value
    })
    
    if ((res as any).success) {
      recentTransactions.value = ((res as any).data || []).slice(0, 10)
      
      const summary = (res as any).summary || {}
      financialStats.value = {
        totalIncome: summary.totalIncome || 0,
        totalExpense: summary.totalExpense || 0,
        balance: summary.balance || 0,
        count: summary.count || 0
      }

      // Calculate payment methods breakdown
      calculatePaymentMethods((res as any).data || [])
    }
  } catch (error) {
    console.error('Erro ao carregar dados financeiros:', error)
  } finally {
    loading.value = false
  }
}

const calculatePaymentMethods = (transactions: any[]) => {
  const incomeTransactions = transactions.filter(t => t.type === 'income')
  const total = incomeTransactions.reduce((sum, t) => sum + (t.amount || 0), 0)

  const methodsMap: Record<string, number> = {}
  incomeTransactions.forEach(t => {
    const method = t.paymentMethod || 'other'
    methodsMap[method] = (methodsMap[method] || 0) + (t.amount || 0)
  })

  const colors: Record<string, string> = {
    pix: 'bg-emerald-500',
    cash: 'bg-amber-500',
    credit: 'bg-lilac-500',
    credit_card: 'bg-lilac-500',
    debit: 'bg-rose-500',
    debit_card: 'bg-rose-500'
  }

  paymentMethods.value = Object.entries(methodsMap)
    .map(([method, amount]) => ({
      name: getPaymentMethodLabel(method),
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
      color: colors[method] || 'bg-gray-400'
    }))
    .sort((a, b) => b.amount - a.amount)
}

watch(selectedPeriod, () => {
  loadFinancialData()
})

watch(() => currentSalon.value?.id, () => {
  loadFinancialData()
}, { immediate: true })

onMounted(() => {
  loadFinancialData()
})
</script>
