<template>
  <div class="max-w-lg mx-auto py-8">
    <div class="p-8 bg-white rounded-2xl border border-lilac-100 shadow-soft">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-lilac-100 to-rose-100 flex items-center justify-center mb-4">
          <Icon name="lucide:credit-card" class="w-8 h-8 text-lilac-600" />
        </div>
        <h1 class="text-2xl font-display font-bold text-gray-800">Checkout</h1>
        <p class="text-sm text-gray-500 mt-1">Finalize a assinatura do seu plano</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="py-8 text-center">
        <div class="w-8 h-8 border-4 border-lilac-200 border-t-lilac-500 rounded-full animate-spin mx-auto"></div>
      </div>

      <div v-else-if="plan">
        <!-- Plan summary -->
        <div class="p-4 rounded-xl bg-gradient-to-r from-lilac-50 to-rose-50 border border-lilac-100 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-semibold text-gray-800">Plano {{ plan.name }}</p>
              <p class="text-xs text-gray-500">{{ plan.features?.description }}</p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-gray-800">R$ {{ formatPrice(plan.price_cents) }}</p>
              <p class="text-xs text-gray-400">/mês</p>
            </div>
          </div>
        </div>

        <!-- Payment info -->
        <div class="space-y-4 mb-6">
          <p class="text-sm font-medium text-gray-700">Forma de pagamento</p>
          <div class="grid grid-cols-3 gap-3">
            <button 
              v-for="method in paymentMethods" 
              :key="method.key"
              @click="selectedMethod = method.key"
              class="p-3 rounded-xl border-2 text-center transition-all text-sm"
              :class="selectedMethod === method.key ? 'border-lilac-400 bg-lilac-50' : 'border-gray-100 hover:border-gray-200'"
            >
              <Icon :name="method.icon" class="w-5 h-5 mx-auto mb-1" :class="selectedMethod === method.key ? 'text-lilac-600' : 'text-gray-400'" />
              <span :class="selectedMethod === method.key ? 'text-lilac-700 font-medium' : 'text-gray-600'">{{ method.label }}</span>
            </button>
          </div>
        </div>

        <!-- Confirm -->
        <button 
          @click="confirmPayment"
          :disabled="processing"
          class="w-full py-4 rounded-2xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-glow"
        >
          <Icon v-if="processing" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
          <span>{{ processing ? 'Processando...' : 'Gerar PIX' }}</span>
        </button>

        <p class="text-xs text-gray-400 text-center mt-4">
          Pagamento via PIX. Após gerar o QR code, finalize o pagamento no seu app bancário.
        </p>

        <div v-if="pixData" class="mt-6 text-center">
          <p class="text-sm text-gray-600 mb-2">Escaneie o QR code abaixo com seu app bancário:</p>
          <div class="mx-auto w-56 h-56 bg-white p-2 rounded-lg border border-gray-100 shadow-sm mb-3">
            <img :src="pixImageSrc(pixData)" alt="QR PIX" class="w-full h-full object-contain" v-if="pixImageSrc(pixData)"/>
            <div v-else class="text-sm text-gray-500">QR code indisponível</div>
          </div>
          <div class="text-xs text-gray-500 break-words bg-gray-50 p-2 rounded">{{
            pixString(pixData)
          }}</div>
        </div>
      </div>

      <div v-else class="text-center py-8">
        <Icon name="lucide:alert-circle" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p class="text-gray-500">Plano não encontrado</p>
        <NuxtLink to="/painel/plans" class="text-lilac-600 text-sm font-medium mt-2 inline-block">Voltar aos planos</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'painel'
})

import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { authHeaders } = useAuth()
const currentSalon = inject<Ref<any>>('currentSalon', ref(null))

const plan = ref<any>(null)
const loading = ref(true)
const processing = ref(false)
const selectedMethod = ref('pix')
const pixData = ref<any>(null)

const paymentMethods = [
  { key: 'pix', label: 'PIX', icon: 'lucide:qr-code' }
]

const formatPrice = (cents: number) => (cents / 100).toFixed(2).replace('.', ',')

onMounted(async () => {
  const planKey = String(route.query.planKey || '')
  loading.value = true
  try {
    const res = await $fetch('/api/billing/plans')
    const p = res?.data?.find((x: any) => x.key === planKey)
    plan.value = p || null
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const confirmPayment = async () => {
  const salonId = String(route.query.salonId || currentSalon?.value?.id || '')
  if (!salonId || !plan.value) {
    alert('Dados do plano/salão inválidos')
    return
  }
  processing.value = true
  try {
    // For PIX: create payment and return PIX data (QR code)
    if (selectedMethod.value === 'pix') {
      const pay = await $fetch('/api/billing/create-payment', {
        method: 'POST',
        headers: authHeaders.value,
        body: {
          salonId,
          planKey: plan.value.key,
          amount_cents: plan.value.price_cents
        }
      })
      if (pay?.success) {
        pixData.value = pay.data
        // do not redirect; show QR
      } else {
        alert('Erro ao gerar pagamento PIX')
      }
    } else {
      const res = await $fetch('/api/billing/subscribe', {
        method: 'POST',
        headers: authHeaders.value,
        body: { salonId, planKey: plan.value.key, purchaseNow: true }
      })
      if (res?.success) {
        router.push('/painel')
      }
    }
  } catch (err: any) {
    console.error(err)
    alert(err?.data?.message || err?.message || 'Erro ao processar pagamento')
  } finally {
    processing.value = false
  }
}

const pixImageSrc = (pay: any) => {
  // Try several possible fields from Asaas response
  if (!pay) return null
  if (pay.pix) {
    return pay.pix.qrCodeImage || pay.pix.qrImage || pay.pix.qrcodeImage || pay.pix.qr_code || pay.pix.qrCode || null
  }
  // Some APIs return base64 in image field
  if (pay.qrCodeImage) return pay.qrCodeImage
  if (pay.qrImage) return pay.qrImage
  return null
}

const pixString = (pay: any) => {
  if (!pay) return ''
  if (pay.pix) {
    return pay.pix.qrCode || pay.pix.qrcode || pay.pix.code || JSON.stringify(pay.pix)
  }
  return JSON.stringify(pay)
}
</script>
