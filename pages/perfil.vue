<template>
  <div class="min-h-screen py-6">
    <div class="container-app">
      <!-- Not logged in state -->
      <template v-if="!isAuthenticated">
        <div class="text-center py-20">
          <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-lilac-100 to-rose-100 flex items-center justify-center">
            <Icon name="lucide:user" class="w-12 h-12 text-lilac-400" />
          </div>
          <h1 class="font-display text-2xl font-semibold text-gray-800 mb-2">Entre na sua conta</h1>
          <p class="text-gray-500 max-w-md mx-auto mb-8">
            Faca login para acessar seu perfil, ver seus agendamentos e gerenciar suas preferencias.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <NuxtLink
              to="/login"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-medium hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
            >
              <Icon name="lucide:log-in" class="w-5 h-5" />
              Entrar
            </NuxtLink>
            <NuxtLink
              to="/registro"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-lilac-200 text-lilac-600 font-medium hover:bg-lilac-50 transition-all"
            >
              <Icon name="lucide:user-plus" class="w-5 h-5" />
              Criar conta
            </NuxtLink>
          </div>
        </div>
      </template>

      <!-- Logged in state -->
      <template v-else>
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
                <img
                  v-if="user?.avatarUrl"
                  :src="user.avatarUrl"
                  :alt="user.fullName"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gradient-to-br from-lilac-400 to-rose-400 flex items-center justify-center">
                  <span class="text-3xl font-bold text-white">{{ userInitials }}</span>
                </div>
              </div>
              <button class="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center hover:bg-lilac-50 transition-all">
                <Icon name="lucide:camera" class="w-4 h-4 text-lilac-600" />
              </button>
            </div>

            <div class="flex-1 text-center sm:text-left pb-2">
              <h1 class="text-2xl font-display font-semibold text-gray-800">{{ user?.fullName || 'Usuario' }}</h1>
              <p class="text-gray-500">{{ user?.email }}</p>
              <p v-if="user?.phone" class="text-sm text-gray-400">{{ user.phone }}</p>
            </div>

            <NuxtLink
              to="/perfil/editar"
              class="px-5 py-2.5 rounded-xl bg-white border border-lilac-100 text-gray-600 font-medium hover:border-lilac-200 transition-all shadow-soft"
            >
              <Icon name="lucide:pencil" class="w-4 h-4 inline mr-2" />
              Editar perfil
            </NuxtLink>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 mb-8">
          <NuxtLink to="/agendamentos" class="p-5 rounded-2xl bg-white border border-lilac-100 text-center shadow-soft hover:border-lilac-200 transition-all">
            <p class="text-2xl font-bold text-lilac-600">{{ stats.appointments }}</p>
            <p class="text-sm text-gray-500">Agendamentos</p>
          </NuxtLink>
          <NuxtLink to="/perfil/favoritos" class="p-5 rounded-2xl bg-white border border-lilac-100 text-center shadow-soft hover:border-lilac-200 transition-all">
            <p class="text-2xl font-bold text-rose-500">{{ stats.favorites }}</p>
            <p class="text-sm text-gray-500">Favoritos</p>
          </NuxtLink>
          <div class="p-5 rounded-2xl bg-white border border-lilac-100 text-center shadow-soft">
            <p class="text-2xl font-bold text-lilac-600">{{ stats.reviews }}</p>
            <p class="text-sm text-gray-500">Avaliacoes</p>
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

          <h2 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 px-1 mt-8">Preferencias</h2>

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

          <h2 class="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 px-1 mt-8">Legal</h2>

          <NuxtLink
            v-for="item in legalItems"
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
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, isAuthenticated, logout } = useAuth()

const userInitials = computed(() => {
  if (!user.value?.fullName) return '?'
  const names = user.value.fullName.split(' ')
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
  }
  return names[0][0].toUpperCase()
})

// Stats from localStorage favorites count
const stats = computed(() => {
  let favCount = 0
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('piubelle_favorites')
      if (saved) favCount = JSON.parse(saved).length
    } catch { /* ignore */ }
  }
  return {
    appointments: 0,
    favorites: favCount,
    reviews: 0
  }
})

const accountItems = [
  {
    path: '/perfil/editar',
    icon: 'lucide:user',
    label: 'Dados pessoais',
    description: 'Nome, e-mail, telefone',
    bgClass: 'bg-lilac-50',
    iconClass: 'text-lilac-500'
  },
  {
    path: '/perfil/favoritos',
    icon: 'lucide:heart',
    label: 'Favoritos',
    description: 'Saloes salvos',
    bgClass: 'bg-rose-50',
    iconClass: 'text-rose-500'
  },
  {
    path: '/agendamentos',
    icon: 'lucide:calendar',
    label: 'Agendamentos',
    description: 'Historico e proximos',
    bgClass: 'bg-lilac-50',
    iconClass: 'text-lilac-500'
  }
]

const preferenceItems = [
  {
    path: '/perfil/notificacoes',
    icon: 'lucide:bell',
    label: 'Notificacoes',
    description: 'Alertas e lembretes',
    bgClass: 'bg-lilac-50',
    iconClass: 'text-lilac-500'
  },
  {
    path: '/buscar',
    icon: 'lucide:help-circle',
    label: 'Ajuda',
    description: 'FAQ e suporte',
    bgClass: 'bg-rose-50',
    iconClass: 'text-rose-500'
  }
]

const legalItems = [
  {
    path: '/termos',
    icon: 'lucide:file-text',
    label: 'Termos de uso',
    description: 'Nossos termos e condicoes',
    bgClass: 'bg-lilac-50',
    iconClass: 'text-lilac-500'
  },
  {
    path: '/privacidade',
    icon: 'lucide:lock',
    label: 'Privacidade',
    description: 'Politica de privacidade',
    bgClass: 'bg-rose-50',
    iconClass: 'text-rose-500'
  }
]

const handleLogout = () => {
  logout()
}

useSeoMeta({
  title: 'Meu Perfil - PiuBelle'
})
</script>
