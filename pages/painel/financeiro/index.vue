<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">Financeiro</h1>
        <p class="text-gray-500">Acompanhe as financas do seu salao</p>
      </div>
      <div class="flex gap-3">
        <select
          v-model="selectedPeriod"
          class="px-4 py-2 rounded-xl bg-white border border-lilac-100 text-gray-700 shadow-soft outline-none"
        >
          <option value="month">Este mes</option>
          <option value="week">Esta semana</option>
          <option value="today">Hoje</option>
        </select>
        <button
          @click="exportCSV"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-lilac-100 text-gray-600 hover:border-lilac-200 transition-all shadow-soft"
        >
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
            <span class="text-lilac-100">Lucro liquido</span>
          </div>
          <p class="text-3xl font-bold">R$ {{ financialStats.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
        </div>

        <div class="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="lucide:receipt" class="w-6 h-6" />
            </div>
            <span class="text-amber-100">Transacoes</span>
          </div>
          <p class="text-3xl font-bold">{{ financialStats.count }}</p>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Transactions -->
        <div class="lg:col-span-2 p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display text-xl font-semibold text-gray-800">Transacoes Recentes</h2>
            <NuxtLink to="/painel/caixa" class="text-sm text-lilac-600 font-medium hover:text-lilac-700">Ver todas</NuxtLink>
          </div>

          <div v-if="recentTransactions.length === 0" class="text-center py-8">
            <Icon name="lucide:receipt" class="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-500">Nenhuma transacao registrada</p>
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
                  <p class="text-sm text-gray-500">{{ formatDate(transaction.createdAt) }} - {{ getPaymentMethodLabel(transaction.paymentMethod) }}</p>
                </div>
              </div>
              <span
                class="font-semibold"
                :class="transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'"
              >
                {{ transaction.type === 'income' ? '+' : '-' }}R$ {{ parseFloat(transaction.amount).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="font-display text-xl font-semibold text-gray-800 mb-6">Por Metodo de Pagamento</h2>

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
definePageMeta({
  layout: 'painel'
})

const { currentSalon } = useAuth()
const { api } = useApi()

const loading = ref(true)
const selectedPeriod = ref('month')
const allTransactions = ref<any[]>([])
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
  credit: 'Cartao de Credito',
  credit_card: 'Cartao de Credito',
  debit: 'Cartao de Debito',
  debit_card: 'Cartao de Debito'
}

const getPaymentMethodLabel = (method: string) => {
  return paymentMethodLabels[method] || method
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('pt-BR')
  } catch {
    return dateStr
  }
}

const getDateRange = () => {
  const today = new Date()
  let startDate: Date

  switch (selectedPeriod.value) {
    case 'today':
      startDate = today
      break
    case 'week': {
      startDate = new Date(today)
      const day = startDate.getDay()
      startDate.setDate(startDate.getDate() - day)
      break
    }
    case 'month':
    default:
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
  }

  const fmt = (d: Date) => d.toISOString().split('T')[0]
  return { startDate: fmt(startDate), endDate: fmt(today) }
}

const loadFinancialData = async () => {
  if (!currentSalon.value?.id) {
    loading.value = false
    return
  }

  loading.value = true
  try {
    const { startDate, endDate } = getDateRange()

    const { data: res, error } = await api<any>('/api/painel/transactions', {
      params: { salonId: currentSalon.value.id, startDate, endDate }
    })

    if (!error && res) {
      const transactions = res.data || res || []
      allTransactions.value = Array.isArray(transactions) ? transactions : []
      recentTransactions.value = allTransactions.value.slice(0, 10)

      // Check if API returned a summary, otherwise calculate from data
      const summary = res.summary
      if (summary) {
        financialStats.value = {
          totalIncome: summary.totalIncome || 0,
          totalExpense: summary.totalExpense || 0,
          balance: summary.balance || (summary.totalIncome || 0) - (summary.totalExpense || 0),
          count: summary.count || allTransactions.value.length
        }
      } else {
        // Calculate from transaction data
        let totalIncome = 0
        let totalExpense = 0
        allTransactions.value.forEach((t: any) => {
          const amount = parseFloat(t.amount) || 0
          if (t.type === 'income') {
            totalIncome += amount
          } else {
            totalExpense += amount
          }
        })
        financialStats.value = {
          totalIncome,
          totalExpense,
          balance: totalIncome - totalExpense,
          count: allTransactions.value.length
        }
      }

      calculatePaymentMethods(allTransactions.value)
    }
  } catch (err) {
    console.error('Erro ao carregar dados financeiros:', err)
  } finally {
    loading.value = false
  }
}

const calculatePaymentMethods = (transactions: any[]) => {
  const incomeTransactions = transactions.filter((t: any) => t.type === 'income')
  const total = incomeTransactions.reduce((sum: number, t: any) => sum + (parseFloat(t.amount) || 0), 0)

  const methodsMap: Record<string, number> = {}
  incomeTransactions.forEach((t: any) => {
    const method = t.paymentMethod || 'other'
    methodsMap[method] = (methodsMap[method] || 0) + (parseFloat(t.amount) || 0)
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

const exportCSV = () => {
  if (allTransactions.value.length === 0) return

  const headers = ['Descricao', 'Tipo', 'Valor', 'Forma de Pagamento', 'Data']
  const rows = allTransactions.value.map((t: any) => {
    const amount = parseFloat(t.amount) || 0
    const type = t.type === 'income' ? 'Entrada' : 'Saida'
    const method = getPaymentMethodLabel(t.paymentMethod)
    const date = t.createdAt ? new Date(t.createdAt).toLocaleString('pt-BR') : ''
    return [t.description, type, amount.toFixed(2), method, date].join(';')
  })

  const csvContent = [headers.join(';'), ...rows].join('\n')
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `financeiro-${selectedPeriod.value}-${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

watch(selectedPeriod, () => {
  loadFinancialData()
})

watch(() => currentSalon.value?.id, () => {
  loadFinancialData()
}, { immediate: true })
</script>
