<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-3xl font-display font-bold text-gray-800">Escolha seu Plano</h1>
      <p class="text-gray-500 mt-2">Todos os planos pagos incluem <span class="font-semibold text-lilac-600">14 dias grátis</span> para testar</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="w-8 h-8 border-4 border-lilac-200 border-t-lilac-500 rounded-full animate-spin"></div>
    </div>

    <!-- Plans Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div 
        v-for="p in sortedPlans" 
        :key="p.id" 
        class="relative flex flex-col rounded-2xl border-2 bg-white shadow-soft overflow-hidden transition-all hover:shadow-glow"
        :class="p.key === 'pro' ? 'border-lilac-400 ring-2 ring-lilac-200' : 'border-lilac-100'"
      >
        <!-- Badge recomendado -->
        <div v-if="p.key === 'pro'" class="absolute top-0 right-0 px-4 py-1 bg-gradient-to-r from-lilac-500 to-rose-500 text-white text-xs font-bold rounded-bl-xl">
          Mais popular
        </div>

        <div class="p-6 flex flex-col flex-1">
          <!-- Icon + Name -->
          <div class="flex items-center gap-3 mb-4">
            <div 
              class="w-12 h-12 rounded-xl flex items-center justify-center"
              :class="planIcon(p.key).bgClass"
            >
              <Icon :name="planIcon(p.key).icon" class="w-6 h-6" :class="planIcon(p.key).iconClass" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-800">{{ p.name }}</h2>
            </div>
          </div>

          <!-- Price -->
          <div class="mb-4">
            <template v-if="p.price_cents === 0">
              <span class="text-4xl font-bold text-gray-800">Grátis</span>
            </template>
            <template v-else>
              <span class="text-sm text-gray-400">R$</span>
              <span class="text-4xl font-bold text-gray-800">{{ formatPrice(p.price_cents) }}</span>
              <span class="text-sm text-gray-400">/mês</span>
            </template>
          </div>

          <!-- Features -->
          <ul class="space-y-3 flex-1 mb-6">
            <li class="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="lucide:check" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Até <strong>{{ p.max_employees || '1' }}</strong> funcionário(s)</span>
            </li>
            <li v-for="feat in planFeatures(p.key)" :key="feat" class="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="lucide:check" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{{ feat }}</span>
            </li>
            <li v-for="miss in planMissing(p.key)" :key="miss" class="flex items-center gap-2 text-sm text-gray-400">
              <Icon name="lucide:x" class="w-4 h-4 text-gray-300 flex-shrink-0" />
              <span class="line-through">{{ miss }}</span>
            </li>
          </ul>

          <!-- Actions -->
          <div class="space-y-2">
            <button 
              v-if="p.price_cents > 0"
              @click="goToCheckout(p)"
              class="w-full py-3 rounded-xl font-semibold transition-all"
              :class="p.key === 'pro' 
                ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white hover:from-lilac-600 hover:to-rose-600 shadow-glow' 
                : 'bg-lilac-50 text-lilac-700 hover:bg-lilac-100'"
            >
              Assinar agora
            </button>
            <button 
              v-if="p.price_cents > 0"
              @click="trial(p)"
              class="w-full py-3 rounded-xl border border-lilac-100 text-gray-600 hover:bg-gray-50 transition-all text-sm"
            >
              Testar 14 dias grátis
            </button>
            <button 
              v-if="p.price_cents === 0"
              @click="trial(p)"
              class="w-full py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold transition-all"
            >
              Começar grátis
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Addon info -->
    <div class="text-center text-sm text-gray-500 max-w-2xl mx-auto">
      <p>Precisa de mais funcionários? Adicione por <strong>R$ 29,90/mês</strong> cada funcionário extra em qualquer plano.</p>
      <p class="mt-1">Acima de 5 funcionários? <a href="#" class="text-lilac-600 font-medium hover:underline">Entre em contato</a> para um plano personalizado.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'painel'
})

import type { Ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRoute, useRouter } from 'vue-router'

const { authHeaders } = useAuth()
const route = useRoute()
const router = useRouter()
const currentSalon = inject<Ref<any>>('currentSalon', ref(null))

const plans = ref<any[]>([])
const loading = ref(true)

const formatPrice = (cents: number) => {
  return (cents / 100).toFixed(2).replace('.', ',')
}

const planOrder: Record<string, number> = { free: 0, profissional: 1, pro: 2 }
const sortedPlans = computed(() => {
  return [...plans.value].sort((a, b) => (planOrder[a.key] ?? 99) - (planOrder[b.key] ?? 99))
})

const planIcon = (key: string) => {
  const icons: Record<string, any> = {
    free: { icon: 'lucide:gift', bgClass: 'bg-gray-100', iconClass: 'text-gray-600' },
    profissional: { icon: 'lucide:briefcase', bgClass: 'bg-lilac-100', iconClass: 'text-lilac-600' },
    pro: { icon: 'lucide:crown', bgClass: 'bg-gradient-to-br from-lilac-100 to-rose-100', iconClass: 'text-lilac-600' }
  }
  return icons[key] || icons.free
}

const allFeatures = [
  'Agendamentos online',
  'Gestão de clientes',
  'Fila virtual',
  'Link Bio',
  'Caixa do dia',
  'Relatórios financeiros',
  'WhatsApp Bot',
  'Programa de fidelidade',
  'Avaliações e respostas',
  'Suporte prioritário'
]

const planFeatures = (key: string): string[] => {
  const map: Record<string, string[]> = {
    free: ['Agendamentos online', 'Gestão de clientes', 'Fila virtual', 'Link Bio'],
    profissional: ['Agendamentos online', 'Gestão de clientes', 'Fila virtual', 'Link Bio', 'Caixa do dia', 'Relatórios financeiros'],
    pro: allFeatures
  }
  return map[key] || map.free
}

const planMissing = (key: string): string[] => {
  const included = planFeatures(key)
  return allFeatures.filter(f => !included.includes(f))
}

const load = async () => {
  loading.value = true
  try {
    const res = await $fetch('/api/billing/plans')
    if (res?.data) plans.value = res.data
  } catch (err) {
    console.error('Erro ao carregar planos', err)
  } finally { loading.value = false }
}

onMounted(load)

const getSalonId = () => {
  return route.query.salonId || currentSalon?.value?.id || null
}

const trial = async (p: any) => {
  const salonId = getSalonId()
  if (!salonId) {
    alert('Salão não identificado. Tente novamente pelo painel.')
    return
  }
  try {
    const res = await $fetch('/api/billing/subscribe', {
      method: 'POST',
      headers: authHeaders.value,
      body: { salonId: String(salonId), planKey: p.key, purchaseNow: false }
    })
    if (res?.success) {
      router.push('/painel')
    }
  } catch (err: any) {
    console.error(err)
    alert(err?.data?.message || err?.message || 'Erro ao iniciar plano')
  }
}

const goToCheckout = (p: any) => {
  const salonId = getSalonId()
  if (!salonId) {
    alert('Salão não identificado.')
    return
  }
  router.push({ path: '/painel/checkout', query: { salonId: String(salonId), planKey: p.key } })
}
</script>
