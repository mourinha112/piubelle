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
            Sistema de Gestão para Salões de Beleza
          </div>
          
          <h1 class="font-display text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Transforme seu <span class="text-lilac-gradient">salão</span> com o <span class="text-rose-gradient">PiuBelle</span>
          </h1>
          
          <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gestão completa para salões de beleza, manicure, estética e spa. Agendamentos, clientes, financeiro e muito mais em um só lugar.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/"
              class="px-8 py-4 rounded-2xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow flex items-center justify-center gap-2"
            >
              Começar Grátis
              <Icon name="lucide:arrow-right" class="w-5 h-5" />
            </NuxtLink>
            <button class="px-8 py-4 rounded-2xl bg-white border-2 border-lilac-200 text-gray-700 font-semibold hover:border-lilac-300 transition-all flex items-center justify-center gap-2">
              <Icon name="lucide:play-circle" class="w-5 h-5 text-lilac-500" />
              Ver demonstração
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
            Tudo que você precisa para <span class="text-lilac-gradient">crescer</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Ferramentas poderosas e fáceis de usar para gerenciar seu salão de beleza
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
              Pronta para transformar seu salão?
            </h2>
            <p class="text-xl text-lilac-100 mb-8 max-w-2xl mx-auto">
              Comece agora gratuitamente e veja a diferença que o PiuBelle pode fazer no seu negócio.
            </p>
            <NuxtLink 
              to="/"
              class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-lilac-600 font-semibold hover:bg-lilac-50 transition-all"
            >
              Criar conta grátis
              <Icon name="lucide:arrow-right" class="w-5 h-5" />
            </NuxtLink>
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
          <p class="text-gray-500 text-sm">© 2026 PiuBelle. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const features = [
  {
    title: 'Agendamento Online',
    description: 'Seus clientes agendam 24h pelo celular. Reduza faltas com lembretes automáticos.',
    icon: 'lucide:calendar',
    bgClass: 'bg-lilac-100',
    iconClass: 'text-lilac-600'
  },
  {
    title: 'Gestão de Clientes',
    description: 'Histórico completo, preferências e programa de fidelidade em um só lugar.',
    icon: 'lucide:users',
    bgClass: 'bg-rose-100',
    iconClass: 'text-rose-600'
  },
  {
    title: 'Controle Financeiro',
    description: 'Caixa, comissões, relatórios e métricas para tomar decisões inteligentes.',
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
    description: 'Página personalizada para suas redes sociais com agendamento direto.',
    icon: 'lucide:link',
    bgClass: 'bg-blue-100',
    iconClass: 'text-blue-600'
  }
]

useSeoMeta({
  title: 'PiuBelle - Sistema de Gestão para Salões de Beleza',
  description: 'Gestão completa para salões de beleza, manicure, estética e spa. Agendamentos, clientes, financeiro e muito mais.'
})
</script>
