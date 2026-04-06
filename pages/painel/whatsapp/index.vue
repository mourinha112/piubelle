<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-display font-semibold text-gray-800">WhatsApp Bot</h1>
        <p class="text-gray-500">Automacao de mensagens para seus clientes</p>
      </div>
      <div class="flex items-center gap-3">
        <span
          class="px-4 py-2 rounded-xl text-sm font-medium"
          :class="isConnected ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'"
        >
          {{ isConnected ? 'Conectado' : 'Configuracao Necessaria' }}
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
          <h3 class="font-medium text-amber-800">Configuracao do WhatsApp Bot</h3>
          <p class="text-sm text-amber-700 mt-1">
            Para ativar as automacoes de WhatsApp, e necessario configurar a integracao com a API do WhatsApp Business.
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
        <p class="text-sm text-gray-500 mb-4">Esta funcionalidade requer configuracao adicional da API do WhatsApp.</p>
        <button @click="showQRCode = false" class="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-medium">
          Fechar
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <p class="text-3xl font-bold text-emerald-600">{{ stats.messagesSent }}</p>
        <p class="text-sm text-gray-500">Mensagens enviadas</p>
      </div>
      <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <p class="text-3xl font-bold text-blue-600">{{ stats.deliveryRate }}%</p>
        <p class="text-sm text-gray-500">Taxa de entrega</p>
      </div>
      <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <p class="text-3xl font-bold text-lilac-600">{{ stats.remindersSent }}</p>
        <p class="text-sm text-gray-500">Lembretes enviados</p>
      </div>
      <div class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <p class="text-3xl font-bold text-rose-600">{{ stats.confirmations }}</p>
        <p class="text-sm text-gray-500">Confirmacoes</p>
      </div>
    </div>

    <!-- Automations -->
    <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-display text-xl font-semibold text-gray-800">Automacoes</h2>
        <button
          @click="addAutomation"
          class="px-4 py-2 rounded-xl bg-lilac-50 text-lilac-600 font-medium hover:bg-lilac-100 transition-all"
        >
          + Nova Automacao
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
            <p class="text-xs text-gray-400">Ultima: {{ automation.lastSent }}</p>
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
        <button
          @click="addTemplate"
          class="px-4 py-2 rounded-xl bg-lilac-50 text-lilac-600 font-medium hover:bg-lilac-100 transition-all"
        >
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
            <div class="flex items-center gap-1">
              <button
                @click="editTemplate(template)"
                class="p-1 rounded hover:bg-white transition-colors"
              >
                <Icon name="lucide:pencil" class="w-4 h-4 text-gray-400" />
              </button>
              <button
                @click="removeTemplate(template.id)"
                class="p-1 rounded hover:bg-red-50 transition-colors"
              >
                <Icon name="lucide:trash-2" class="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
          <p class="text-sm text-gray-600 line-clamp-3">{{ template.message }}</p>
        </div>
      </div>
    </div>

    <!-- Edit Template Modal -->
    <div v-if="showTemplateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="showTemplateModal = false">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-xl font-display font-semibold text-gray-800">
            {{ editingTemplate ? 'Editar Template' : 'Novo Template' }}
          </h3>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
            <input
              v-model="templateForm.name"
              type="text"
              placeholder="Nome do template"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
            <textarea
              v-model="templateForm.message"
              rows="4"
              placeholder="Use {nome}, {horario}, {data}, {profissional}, {link} como variaveis"
              class="w-full px-4 py-3 rounded-xl border border-lilac-100 focus:border-lilac-300 outline-none resize-none"
            />
          </div>
          <div class="p-3 rounded-xl bg-lilac-50 border border-lilac-100">
            <p class="text-xs text-lilac-700">
              <strong>Variaveis disponiveis:</strong> {nome}, {horario}, {data}, {profissional}, {servico}, {link}, {desconto}
            </p>
          </div>
        </div>
        <div class="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <button
            @click="showTemplateModal = false"
            class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button
            @click="saveTemplate"
            :disabled="!templateForm.name || !templateForm.message"
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
definePageMeta({
  layout: 'painel'
})

const currentSalon = inject('currentSalon') as Ref<any>

const isConnected = ref(false)
const connecting = ref(false)
const showQRCode = ref(false)
const showTemplateModal = ref(false)
const editingTemplate = ref<any>(null)

const templateForm = ref({
  name: '',
  message: ''
})

// Stats (local state - would come from WhatsApp integration API)
const stats = ref({
  messagesSent: 0,
  deliveryRate: 0,
  remindersSent: 0,
  confirmations: 0
})

// Connect WhatsApp (placeholder - requires Evolution API or similar)
const connectWhatsApp = async () => {
  connecting.value = true
  setTimeout(() => {
    showQRCode.value = true
    connecting.value = false
  }, 1500)
}

// Toggle automation
const toggleAutomation = (automation: any) => {
  if (!isConnected.value) return
  automation.active = !automation.active
}

// Add new automation
const addAutomation = () => {
  const id = String(Date.now())
  automations.value.push({
    id,
    name: 'Nova Automacao',
    description: 'Configure esta automacao',
    icon: 'lucide:zap',
    iconBg: 'bg-lilac-100',
    iconColor: 'text-lilac-600',
    sent: 0,
    lastSent: 'Nunca',
    active: false
  })
}

// Template management
const addTemplate = () => {
  editingTemplate.value = null
  templateForm.value = { name: '', message: '' }
  showTemplateModal.value = true
}

const editTemplate = (template: any) => {
  editingTemplate.value = template
  templateForm.value = { name: template.name, message: template.message }
  showTemplateModal.value = true
}

const saveTemplate = () => {
  if (!templateForm.value.name || !templateForm.value.message) return

  if (editingTemplate.value) {
    const idx = templates.value.findIndex(t => t.id === editingTemplate.value.id)
    if (idx > -1) {
      templates.value[idx].name = templateForm.value.name
      templates.value[idx].message = templateForm.value.message
    }
  } else {
    templates.value.push({
      id: String(Date.now()),
      name: templateForm.value.name,
      message: templateForm.value.message
    })
  }
  showTemplateModal.value = false
}

const removeTemplate = (id: string) => {
  if (!confirm('Tem certeza que deseja excluir este template?')) return
  templates.value = templates.value.filter(t => t.id !== id)
}

const automations = ref([
  {
    id: '1',
    name: 'Lembrete de Agendamento',
    description: 'Enviado 24h antes do horario marcado',
    icon: 'lucide:bell',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    sent: 0,
    lastSent: 'Nunca',
    active: false
  },
  {
    id: '2',
    name: 'Confirmacao de Agendamento',
    description: 'Enviado apos novo agendamento',
    icon: 'lucide:calendar-check',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    sent: 0,
    lastSent: 'Nunca',
    active: false
  },
  {
    id: '3',
    name: 'Pedido de Avaliacao',
    description: 'Enviado apos atendimento concluido',
    icon: 'lucide:star',
    iconBg: 'bg-lilac-100',
    iconColor: 'text-lilac-600',
    sent: 0,
    lastSent: 'Nunca',
    active: false
  },
  {
    id: '4',
    name: 'Aniversario',
    description: 'Mensagem de feliz aniversario',
    icon: 'lucide:cake',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    sent: 0,
    lastSent: 'Nunca',
    active: false
  }
])

const templates = ref([
  {
    id: '1',
    name: 'Lembrete 24h',
    message: 'Ola {nome}! Passando para lembrar do seu horario amanha as {horario} no PiuBelle. Te esperamos!'
  },
  {
    id: '2',
    name: 'Confirmacao',
    message: 'Seu agendamento foi confirmado! Dia {data} as {horario} com {profissional}. Ate la!'
  },
  {
    id: '3',
    name: 'Pos-atendimento',
    message: 'Obrigada pela visita, {nome}! Como foi sua experiencia? Deixe sua avaliacao: {link}'
  },
  {
    id: '4',
    name: 'Aniversario',
    message: 'Feliz aniversario, {nome}! Neste dia especial, temos um presente para voce: {desconto}% de desconto! Agende ja!'
  }
])
</script>
