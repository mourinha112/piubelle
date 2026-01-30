<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">WhatsApp Bot</h1>
        <p class="text-gray-500">Automação de mensagens para seus clientes</p>
      </div>
      <div class="flex items-center gap-3">
        <span 
          class="px-4 py-2 rounded-xl text-sm font-medium"
          :class="isConnected ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'"
        >
          {{ isConnected ? '🟢 Conectado' : '🟡 Configuração Necessária' }}
        </span>
        <button 
          v-if="!isConnected"
          @click="connectWhatsApp"
          :disabled="connecting"
          class="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50"
        >
          {{ connecting ? 'Conectando...' : 'Configurar WhatsApp' }}
        </button>
      </div>
    </div>

    <!-- Setup Notice -->
    <div v-if="!isConnected" class="p-4 rounded-2xl bg-amber-50 border border-amber-200">
      <div class="flex items-start gap-3">
        <Icon name="lucide:info" class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 class="font-medium text-amber-800">Configuração do WhatsApp Bot</h3>
          <p class="text-sm text-amber-700 mt-1">
            Para ativar as automações de WhatsApp, é necessário configurar a integração com a API do WhatsApp Business.
            Entre em contato com o suporte para ativar esta funcionalidade.
          </p>
        </div>
      </div>
    </div>

    <!-- QR Code Modal -->
    <div v-if="showQRCode" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="showQRCode = false">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Escaneie o QR Code</h3>
        <div class="w-48 h-48 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
          <Icon name="lucide:qr-code" class="w-24 h-24 text-gray-400" />
        </div>
        <p class="text-sm text-gray-500 mb-4">Esta funcionalidade requer configuração adicional da API do WhatsApp.</p>
        <button @click="showQRCode = false" class="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-medium">
          Fechar
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <p class="text-3xl font-bold text-emerald-600">1.234</p>
        <p class="text-sm text-gray-500">Mensagens enviadas</p>
      </div>
      <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <p class="text-3xl font-bold text-blue-600">89%</p>
        <p class="text-sm text-gray-500">Taxa de entrega</p>
      </div>
      <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <p class="text-3xl font-bold text-lilac-600">156</p>
        <p class="text-sm text-gray-500">Lembretes enviados</p>
      </div>
      <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <p class="text-3xl font-bold text-rose-600">45</p>
        <p class="text-sm text-gray-500">Confirmações</p>
      </div>
    </div>

    <!-- Automations -->
    <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-display text-xl font-semibold text-gray-800">Automações</h2>
        <button class="px-4 py-2 rounded-xl bg-lilac-50 text-lilac-600 font-medium hover:bg-lilac-100 transition-all">
          + Nova Automação
        </button>
      </div>

      <div class="space-y-4">
        <div 
          v-for="automation in automations"
          :key="automation.id"
          class="flex items-center gap-4 p-4 rounded-xl border border-lilac-100 hover:border-lilac-200 transition-all"
        >
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            :class="automation.iconBg"
          >
            <Icon :name="automation.icon" class="w-6 h-6" :class="automation.iconColor" />
          </div>
          <div class="flex-1">
            <p class="font-semibold text-gray-800">{{ automation.name }}</p>
            <p class="text-sm text-gray-500">{{ automation.description }}</p>
          </div>
          <div class="text-right mr-4">
            <p class="text-sm font-medium text-gray-700">{{ automation.sent }} enviadas</p>
            <p class="text-xs text-gray-400">Última: {{ automation.lastSent }}</p>
          </div>
          <button 
            :class="[
              'w-14 h-8 rounded-full transition-all',
              automation.active ? 'bg-emerald-500' : 'bg-gray-200'
            ]"
            :disabled="!isConnected"
            @click="toggleAutomation(automation)"
          >
            <div 
              :class="[
                'w-6 h-6 rounded-full bg-white shadow transition-transform',
                automation.active ? 'translate-x-7' : 'translate-x-1'
              ]"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Message Templates -->
    <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-display text-xl font-semibold text-gray-800">Templates de Mensagem</h2>
        <button class="px-4 py-2 rounded-xl bg-lilac-50 text-lilac-600 font-medium hover:bg-lilac-100 transition-all">
          + Novo Template
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="template in templates"
          :key="template.id"
          class="p-4 rounded-xl bg-gray-50 hover:bg-lilac-50/50 transition-colors"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="font-medium text-gray-800">{{ template.name }}</span>
            <button class="p-1 rounded hover:bg-white transition-colors">
              <Icon name="lucide:pencil" class="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <p class="text-sm text-gray-600 line-clamp-3">{{ template.message }}</p>
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

const isConnected = ref(false)
const connecting = ref(false)
const showQRCode = ref(false)

// Connect WhatsApp (placeholder - requires Evolution API or similar)
const connectWhatsApp = async () => {
  connecting.value = true
  
  // Simulate connection attempt
  setTimeout(() => {
    showQRCode.value = true
    connecting.value = false
  }, 1500)
}

// Toggle automation
const toggleAutomation = (automation: any) => {
  automation.active = !automation.active
  // In production, this would save to backend
  console.log(`Automation ${automation.name} is now ${automation.active ? 'active' : 'inactive'}`)
}

const automations = ref([
  {
    id: '1',
    name: 'Lembrete de Agendamento',
    description: 'Enviado 24h antes do horário marcado',
    icon: 'lucide:bell',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    sent: 156,
    lastSent: 'Hoje, 14:30',
    active: true
  },
  {
    id: '2',
    name: 'Confirmação de Agendamento',
    description: 'Enviado após novo agendamento',
    icon: 'lucide:calendar-check',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    sent: 89,
    lastSent: 'Hoje, 16:00',
    active: true
  },
  {
    id: '3',
    name: 'Pedido de Avaliação',
    description: 'Enviado após atendimento concluído',
    icon: 'lucide:star',
    iconBg: 'bg-lilac-100',
    iconColor: 'text-lilac-600',
    sent: 67,
    lastSent: 'Ontem',
    active: true
  },
  {
    id: '4',
    name: 'Aniversário',
    description: 'Mensagem de feliz aniversário',
    icon: 'lucide:cake',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    sent: 23,
    lastSent: '20/01/2026',
    active: false
  }
])

const templates = ref([
  {
    id: '1',
    name: 'Lembrete 24h',
    message: 'Olá {nome}! 💜 Passando para lembrar do seu horário amanhã às {horario} no PiuBelle. Te esperamos! ✨'
  },
  {
    id: '2',
    name: 'Confirmação',
    message: 'Eba! 🎉 Seu agendamento foi confirmado! Dia {data} às {horario} com {profissional}. Até lá! 💜'
  },
  {
    id: '3',
    name: 'Pós-atendimento',
    message: 'Obrigada pela visita, {nome}! 💜 Como foi sua experiência? Deixe sua avaliação: {link}'
  },
  {
    id: '4',
    name: 'Aniversário',
    message: 'Feliz aniversário, {nome}! 🎂🎉 Neste dia especial, temos um presente para você: {desconto}% de desconto! Agende já! 💜'
  }
])
</script>
