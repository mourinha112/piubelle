<template>
  <div class="min-h-screen bg-gradient-to-b from-rose-50 via-white to-lilac-50">
    <!-- Hero -->
    <section class="relative overflow-hidden py-20 lg:py-32">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-lilac-300/30 rounded-full blur-[150px]" />
        <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-rose-300/30 rounded-full blur-[120px]" />
      </div>

      <div class="container-app relative">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lilac-100 text-lilac-700 text-sm font-medium mb-6">
            <Icon name="lucide:sparkles" class="w-4 h-4" />
            Sistema de Gestao para Saloes de Beleza
          </div>

          <h1 class="font-display text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Transforme seu <span class="text-lilac-gradient">salao</span> com o <span class="text-rose-gradient">PiuBelle</span>
          </h1>

          <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gestao completa para saloes de beleza, manicure, estetica e spa. Agendamentos, clientes, financeiro e muito mais em um so lugar.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="showAuthModal = true"
              class="px-8 py-4 rounded-2xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow flex items-center justify-center gap-2"
            >
              Comecar Gratis
              <Icon name="lucide:arrow-right" class="w-5 h-5" />
            </button>
            <button class="px-8 py-4 rounded-2xl bg-white border-2 border-lilac-200 text-gray-700 font-semibold hover:border-lilac-300 transition-all flex items-center justify-center gap-2">
              <Icon name="lucide:play-circle" class="w-5 h-5 text-lilac-500" />
              Ver demonstracao
            </button>
          </div>
        </div>

        <!-- Mockup -->
        <div class="mt-16 relative">
          <div class="absolute inset-0 bg-gradient-to-t from-rose-50 via-transparent to-transparent z-10" />
          <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-lilac-100 max-w-4xl mx-auto">
            <div class="h-8 bg-gradient-to-r from-lilac-100 to-rose-100 flex items-center px-4 gap-2">
              <div class="w-3 h-3 rounded-full bg-red-400" />
              <div class="w-3 h-3 rounded-full bg-amber-400" />
              <div class="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div class="p-6 bg-gradient-to-br from-rose-50 to-lilac-50 h-96 flex items-center justify-center">
              <div class="text-center">
                <Icon name="lucide:layout-dashboard" class="w-20 h-20 text-lilac-300 mx-auto mb-4" />
                <p class="text-gray-400">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-20">
      <div class="container-app">
        <div class="text-center mb-16">
          <h2 class="font-display text-4xl font-bold text-gray-800 mb-4">
            Tudo que voce precisa para <span class="text-lilac-gradient">crescer</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Ferramentas poderosas e faceis de usar para gerenciar seu salao de beleza
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="p-6 rounded-3xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft group hover:shadow-glow"
          >
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
              :class="feature.bgClass"
            >
              <Icon :name="feature.icon" class="w-7 h-7" :class="feature.iconClass" />
            </div>
            <h3 class="font-display text-xl font-semibold text-gray-800 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing teaser -->
    <section class="py-20 bg-white">
      <div class="container-app">
        <div class="text-center mb-12">
          <h2 class="font-display text-4xl font-bold text-gray-800 mb-4">
            Planos que <span class="text-rose-gradient">cabem no seu bolso</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Comece gratis e evolua conforme seu negocio cresce
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="p-6 rounded-3xl bg-white border border-lilac-100 shadow-soft">
            <h3 class="font-display text-lg font-semibold text-gray-800 mb-1">Gratis</h3>
            <p class="text-3xl font-bold text-gray-800 mb-4">R$ 0<span class="text-sm font-normal text-gray-500">/mes</span></p>
            <ul class="space-y-2 text-sm text-gray-600 mb-6">
              <li class="flex items-center gap-2"><Icon name="lucide:check" class="w-4 h-4 text-emerald-500" /> Ate 50 agendamentos/mes</li>
              <li class="flex items-center gap-2"><Icon name="lucide:check" class="w-4 h-4 text-emerald-500" /> 1 profissional</li>
              <li class="flex items-center gap-2"><Icon name="lucide:check" class="w-4 h-4 text-emerald-500" /> Link Bio</li>
            </ul>
            <button
              @click="showAuthModal = true"
              class="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all"
            >
              Comecar gratis
            </button>
          </div>

          <div class="p-6 rounded-3xl bg-gradient-to-b from-lilac-50 to-rose-50 border-2 border-lilac-300 shadow-glow relative">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-lilac-500 to-rose-500 text-white text-xs font-medium">
              Popular
            </div>
            <h3 class="font-display text-lg font-semibold text-gray-800 mb-1">Pro</h3>
            <p class="text-3xl font-bold text-gray-800 mb-4">R$ 49<span class="text-sm font-normal text-gray-500">/mes</span></p>
            <ul class="space-y-2 text-sm text-gray-600 mb-6">
              <li class="flex items-center gap-2"><Icon name="lucide:check" class="w-4 h-4 text-emerald-500" /> Agendamentos ilimitados</li>
              <li class="flex items-center gap-2"><Icon name="lucide:check" class="w-4 h-4 text-emerald-500" /> Ate 5 profissionais</li>
              <li class="flex items-center gap-2"><Icon name="lucide:check" class="w-4 h-4 text-emerald-500" /> WhatsApp Bot</li>
              <li class="flex items-center gap-2"><Icon name="lucide:check" class="w-4 h-4 text-emerald-500" /> Financeiro completo</li>
            </ul>
            <button
              @click="showAuthModal = true"
              class="w-full py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all"
            >
              Comecar agora
            </button>
          </div>

          <div class="p-6 rounded-3xl bg-white border border-lilac-100 shadow-soft">
            <h3 class="font-display text-lg font-semibold text-gray-800 mb-1">Business</h3>
            <p class="text-3xl font-bold text-gray-800 mb-4">R$ 99<span class="text-sm font-normal text-gray-500">/mes</span></p>
            <ul class="space-y-2 text-sm text-gray-600 mb-6">
              <li class="flex items-center gap-2"><Icon name="lucide:check" class="w-4 h-4 text-emerald-500" /> Tudo do Pro</li>
              <li class="flex items-center gap-2"><Icon name="lucide:check" class="w-4 h-4 text-emerald-500" /> Profissionais ilimitados</li>
              <li class="flex items-center gap-2"><Icon name="lucide:check" class="w-4 h-4 text-emerald-500" /> Multi-unidades</li>
              <li class="flex items-center gap-2"><Icon name="lucide:check" class="w-4 h-4 text-emerald-500" /> Suporte prioritario</li>
            </ul>
            <button
              @click="showAuthModal = true"
              class="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all"
            >
              Comecar agora
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20">
      <div class="container-app">
        <div class="p-12 rounded-3xl bg-gradient-to-r from-lilac-500 via-lilac-600 to-rose-500 text-white text-center relative overflow-hidden">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
          </div>

          <div class="relative">
            <h2 class="font-display text-4xl font-bold mb-4">
              Pronta para transformar seu salao?
            </h2>
            <p class="text-xl text-lilac-100 mb-8 max-w-2xl mx-auto">
              Comece agora gratuitamente e veja a diferenca que o PiuBelle pode fazer no seu negocio.
            </p>
            <button
              @click="showAuthModal = true"
              class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-lilac-600 font-semibold hover:bg-lilac-50 transition-all"
            >
              Criar conta gratis
              <Icon name="lucide:arrow-right" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-lilac-100">
      <div class="container-app">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <img
              src="/logotipo.png"
              alt="PiuBelle"
              class="h-10 w-auto object-contain"
            />
          </div>
          <p class="text-gray-500 text-sm">&copy; 2026 PiuBelle. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>

    <!-- Auth Modal -->
    <AuthModal v-model="showAuthModal" @success="handleAuthSuccess" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()
const showAuthModal = ref(false)

const handleAuthSuccess = () => {
  showAuthModal.value = false
  router.push('/painel')
}

const features = [
  {
    title: 'Agendamento Online',
    description: 'Seus clientes agendam 24h pelo celular. Reduza faltas com lembretes automaticos.',
    icon: 'lucide:calendar',
    bgClass: 'bg-lilac-100',
    iconClass: 'text-lilac-600'
  },
  {
    title: 'Gestao de Clientes',
    description: 'Historico completo, preferencias e programa de fidelidade em um so lugar.',
    icon: 'lucide:users',
    bgClass: 'bg-rose-100',
    iconClass: 'text-rose-600'
  },
  {
    title: 'Controle Financeiro',
    description: 'Caixa, comissoes, relatorios e metricas para tomar decisoes inteligentes.',
    icon: 'lucide:wallet',
    bgClass: 'bg-emerald-100',
    iconClass: 'text-emerald-600'
  },
  {
    title: 'WhatsApp Bot',
    description: 'Confirme agendamentos e envie lembretes automaticamente pelo WhatsApp.',
    icon: 'mdi:whatsapp',
    bgClass: 'bg-green-100',
    iconClass: 'text-green-600'
  },
  {
    title: 'Fila Virtual',
    description: 'Gerencie clientes sem hora marcada com sistema de fila inteligente.',
    icon: 'lucide:list-ordered',
    bgClass: 'bg-amber-100',
    iconClass: 'text-amber-600'
  },
  {
    title: 'Link Bio',
    description: 'Pagina personalizada para suas redes sociais com agendamento direto.',
    icon: 'lucide:link',
    bgClass: 'bg-blue-100',
    iconClass: 'text-blue-600'
  }
]

useSeoMeta({
  title: 'PiuBelle - Sistema de Gestao para Saloes de Beleza',
  description: 'Gestao completa para saloes de beleza, manicure, estetica e spa. Agendamentos, clientes, financeiro e muito mais.'
})
</script>
