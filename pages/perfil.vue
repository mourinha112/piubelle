<template>
  <div class="min-h-screen py-6">
    <div class="container-app">
      <!-- Profile Header -->
      <div class="relative mb-8">
        <!-- Cover -->
        <div class="h-32 rounded-3xl bg-gradient-to-r from-lilac-400 via-lilac-500 to-rose-400 overflow-hidden">
          <div class="absolute inset-0 bg-black/10" />
        </div>

        <!-- Avatar & Info -->
        <div class="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 sm:-mt-12 px-6">
          <div class="relative">
            <div class="w-28 h-28 rounded-2xl bg-white border-4 border-white overflow-hidden shadow-glow">
              <div class="w-full h-full bg-gradient-to-br from-lilac-400 to-rose-400 flex items-center justify-center">
                <span class="text-3xl font-bold text-white">{{ userInitials }}</span>
              </div>
            </div>
            <button class="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center hover:bg-lilac-50 transition-all">
              <Icon name="lucide:camera" class="w-4 h-4 text-lilac-600" />
            </button>
          </div>

          <div class="flex-1 text-center sm:text-left pb-2">
            <h1 class="text-2xl font-display font-semibold text-gray-800">{{ user?.fullName || 'Usuário' }}</h1>
            <p class="text-gray-500">{{ user?.email }}</p>
          </div>

          <button class="px-5 py-2.5 rounded-xl bg-white border border-lilac-100 text-gray-600 font-medium hover:border-lilac-200 transition-all shadow-soft">
            <Icon name="lucide:pencil" class="w-4 h-4 inline mr-2" />
            Editar perfil
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 text-center shadow-soft">
          <p class="text-2xl font-bold text-lilac-600">12</p>
          <p class="text-sm text-gray-500">Agendamentos</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 text-center shadow-soft">
          <p class="text-2xl font-bold text-rose-500">5</p>
          <p class="text-sm text-gray-500">Favoritos</p>
        </div>
        <div class="p-5 rounded-2xl bg-white border border-lilac-100 text-center shadow-soft">
          <p class="text-2xl font-bold text-lilac-600">8</p>
          <p class="text-sm text-gray-500">Avaliações</p>
        </div>
      </div>

      <!-- Menu Options -->
      <div class="space-y-3">
        <h2 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 px-1">Conta</h2>
        
        <NuxtLink 
          v-for="item in accountItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-4 p-4 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft group"
        >
          <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="item.bgClass">
            <Icon :name="item.icon" class="w-6 h-6" :class="item.iconClass" />
          </div>
          <div class="flex-1">
            <p class="font-medium text-gray-800 group-hover:text-lilac-600 transition-colors">{{ item.label }}</p>
            <p class="text-sm text-gray-500">{{ item.description }}</p>
          </div>
          <Icon name="lucide:chevron-right" class="w-5 h-5 text-gray-400" />
        </NuxtLink>

        <h2 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 px-1 mt-8">Preferências</h2>
        
        <NuxtLink 
          v-for="item in preferenceItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-4 p-4 rounded-2xl bg-white border border-lilac-100 hover:border-lilac-200 transition-all shadow-soft group"
        >
          <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="item.bgClass">
            <Icon :name="item.icon" class="w-6 h-6" :class="item.iconClass" />
          </div>
          <div class="flex-1">
            <p class="font-medium text-gray-800 group-hover:text-lilac-600 transition-colors">{{ item.label }}</p>
            <p class="text-sm text-gray-500">{{ item.description }}</p>
          </div>
          <Icon name="lucide:chevron-right" class="w-5 h-5 text-gray-400" />
        </NuxtLink>

        <!-- Logout -->
        <button 
          @click="handleLogout"
          class="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-red-100 hover:border-red-200 hover:bg-red-50 transition-all mt-8"
        >
          <div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
            <Icon name="lucide:log-out" class="w-6 h-6 text-red-500" />
          </div>
          <div class="flex-1 text-left">
            <p class="font-medium text-red-600">Sair da conta</p>
            <p class="text-sm text-gray-500">Desconectar do aplicativo</p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()

const userInitials = computed(() => {
  if (!user.value?.fullName) return '?'
  const names = user.value.fullName.split(' ')
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
  }
  return names[0][0].toUpperCase()
})

const accountItems = [
  { 
    path: '/perfil/dados', 
    icon: 'lucide:user', 
    label: 'Dados pessoais', 
    description: 'Nome, e-mail, telefone',
    bgClass: 'bg-lilac-50',
    iconClass: 'text-lilac-500'
  },
  { 
    path: '/perfil/pagamentos', 
    icon: 'lucide:credit-card', 
    label: 'Pagamentos', 
    description: 'Cartões e métodos',
    bgClass: 'bg-rose-50',
    iconClass: 'text-rose-500'
  },
  { 
    path: '/perfil/enderecos', 
    icon: 'lucide:map-pin', 
    label: 'Endereços', 
    description: 'Localizações salvas',
    bgClass: 'bg-lilac-50',
    iconClass: 'text-lilac-500'
  },
  { 
    path: '/perfil/seguranca', 
    icon: 'lucide:shield', 
    label: 'Segurança', 
    description: 'Senha e autenticação',
    bgClass: 'bg-rose-50',
    iconClass: 'text-rose-500'
  }
]

const preferenceItems = [
  { 
    path: '/perfil/notificacoes', 
    icon: 'lucide:bell', 
    label: 'Notificações', 
    description: 'Alertas e lembretes',
    bgClass: 'bg-lilac-50',
    iconClass: 'text-lilac-500'
  },
  { 
    path: '/perfil/privacidade', 
    icon: 'lucide:lock', 
    label: 'Privacidade', 
    description: 'Dados e permissões',
    bgClass: 'bg-rose-50',
    iconClass: 'text-rose-500'
  },
  { 
    path: '/ajuda', 
    icon: 'lucide:help-circle', 
    label: 'Ajuda', 
    description: 'FAQ e suporte',
    bgClass: 'bg-lilac-50',
    iconClass: 'text-lilac-500'
  }
]

const handleLogout = () => {
  logout()
}

useSeoMeta({
  title: 'Meu Perfil - PiuBelle'
})
</script>
