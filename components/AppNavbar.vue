<template>
  <header class="fixed top-0 left-0 right-0 z-50 glass border-b border-lilac-100/50">
    <div class="container-app">
      <div class="flex items-center justify-between h-[72px]">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="relative">
            <img 
              src="/logotipo.png" 
              alt="PiuBelle" 
              class="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white pulse-dot" />
          </div>
        </NuxtLink>

        <!-- Location (Desktop) -->
        <button 
          class="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/60 border border-lilac-100 hover:border-lilac-200 transition-all group shadow-soft"
          @click="showLocationModal = true"
        >
          <Icon name="lucide:map-pin" class="w-4 h-4 text-lilac-500" />
          <span class="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
            {{ currentLocation }}
          </span>
          <Icon name="lucide:chevron-down" class="w-4 h-4 text-gray-400" />
        </button>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <!-- Search (Desktop) -->
          <button 
            class="hidden md:flex items-center justify-center w-11 h-11 rounded-xl bg-white/60 border border-lilac-100 hover:border-lilac-200 hover:bg-white transition-all shadow-soft"
            @click="showSearch = true"
          >
            <Icon name="lucide:search" class="w-5 h-5 text-gray-500" />
          </button>

          <!-- Notifications -->
          <button class="relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/60 border border-lilac-100 hover:border-lilac-200 hover:bg-white transition-all shadow-soft">
            <Icon name="lucide:bell" class="w-5 h-5 text-gray-500" />
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-lilac-500 to-rose-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
              3
            </span>
          </button>

          <!-- Profile / Login Button -->
          <div class="relative" ref="profileDropdown">
            <button 
              class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-lilac-50/50 transition-all"
              @click="isAuthenticated ? toggleProfileMenu() : openAuthModal()"
            >
              <div 
                :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all',
                  isAuthenticated 
                    ? 'bg-gradient-to-br from-lilac-400 to-rose-400 border-white shadow-glow' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-200'
                ]"
              >
                <template v-if="isAuthenticated && user?.avatarUrl">
                  <img :src="user.avatarUrl" :alt="user.fullName" class="w-full h-full object-cover rounded-xl" />
                </template>
                <template v-else-if="isAuthenticated">
                  <span class="text-sm font-bold text-white">{{ userInitials }}</span>
                </template>
                <template v-else>
                  <Icon name="lucide:user" class="w-5 h-5 text-gray-400" />
                </template>
              </div>
              <Icon v-if="isAuthenticated" name="lucide:chevron-down" class="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>

            <!-- Profile Dropdown -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div 
                v-if="showProfileMenu && isAuthenticated"
                class="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-white border border-lilac-100 shadow-soft-lg overflow-hidden"
              >
                <!-- User Info -->
                <div class="p-4 bg-gradient-to-r from-lilac-50 to-rose-50 border-b border-lilac-100">
                  <div class="flex items-center gap-3">
                    <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-lilac-400 to-rose-400 flex items-center justify-center shadow-glow">
                      <template v-if="user?.avatarUrl">
                        <img :src="user.avatarUrl" :alt="user.fullName" class="w-full h-full object-cover rounded-xl" />
                      </template>
                      <template v-else>
                        <span class="text-lg font-bold text-white">{{ userInitials }}</span>
                      </template>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-semibold text-gray-800 truncate">{{ user?.fullName }}</p>
                      <p class="text-sm text-gray-500 truncate">{{ user?.email }}</p>
                    </div>
                  </div>
                </div>

                <!-- Menu Items -->
                <div class="p-2">
                  <NuxtLink 
                    to="/perfil" 
                    class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-lilac-50 transition-colors"
                    @click="showProfileMenu = false"
                  >
                    <Icon name="lucide:user" class="w-5 h-5 text-gray-400" />
                    <span class="text-gray-600">Meu Perfil</span>
                  </NuxtLink>
                  <NuxtLink 
                    to="/agendamentos" 
                    class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-lilac-50 transition-colors"
                    @click="showProfileMenu = false"
                  >
                    <Icon name="lucide:calendar" class="w-5 h-5 text-gray-400" />
                    <span class="text-gray-600">Meus Agendamentos</span>
                  </NuxtLink>
                  <NuxtLink 
                    to="/favoritos" 
                    class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-lilac-50 transition-colors"
                    @click="showProfileMenu = false"
                  >
                    <Icon name="lucide:heart" class="w-5 h-5 text-gray-400" />
                    <span class="text-gray-600">Favoritos</span>
                  </NuxtLink>
                  
                  <!-- Manager Options -->
                  <template v-if="isManager">
                    <div class="my-2 divider-gradient" />
                    <NuxtLink 
                      to="/painel" 
                      class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-lilac-50 transition-colors"
                      @click="showProfileMenu = false"
                    >
                      <Icon name="lucide:layout-dashboard" class="w-5 h-5 text-lilac-500" />
                      <span class="text-lilac-600 font-medium">Painel do Salão</span>
                    </NuxtLink>
                  </template>
                </div>

                <!-- Logout -->
                <div class="p-2 border-t border-lilac-100">
                  <button 
                    class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-left"
                    @click="handleLogout"
                  >
                    <Icon name="lucide:log-out" class="w-5 h-5 text-red-400" />
                    <span class="text-red-500">Sair da conta</span>
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Modal -->
    <UModal v-model="showSearch">
      <div class="p-6">
        <div class="flex items-center gap-3 mb-4">
          <Icon name="lucide:search" class="w-5 h-5 text-lilac-500" />
          <h3 class="text-lg font-display font-semibold text-gray-800">Buscar Salões</h3>
        </div>
        <UInput 
          v-model="searchQuery"
          placeholder="Digite o nome do salão..."
          icon="i-lucide-search"
          size="lg"
          autofocus
          @keyup.enter="handleSearch"
        />
        <div class="mt-4 space-y-2">
          <p class="text-xs text-gray-400 uppercase tracking-wider">Buscas recentes</p>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="recent in recentSearches" 
              :key="recent"
              class="px-3 py-1.5 rounded-lg bg-lilac-50 text-sm text-gray-600 hover:bg-lilac-100 transition-colors"
              @click="searchQuery = recent"
            >
              {{ recent }}
            </button>
          </div>
        </div>
      </div>
    </UModal>

    <!-- Auth Modal -->
    <AuthModal v-model="showAuthModal" @success="handleAuthSuccess" />
  </header>

  <!-- Spacer -->
  <div class="h-[72px]" />
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const { user, isAuthenticated, isManager, logout, init } = useAuth()

// Initialize auth on mount
onMounted(() => {
  init()
})

const showSearch = ref(false)
const showLocationModal = ref(false)
const showAuthModal = ref(false)
const showProfileMenu = ref(false)
const searchQuery = ref('')
const currentLocation = ref('Aracaju, SE')
const recentSearches = ref(['Cabelo', 'Manicure', 'Spa & Relaxamento'])
const profileDropdown = ref<HTMLElement | null>(null)

// Close dropdown when clicking outside
onClickOutside(profileDropdown, () => {
  showProfileMenu.value = false
})

const userInitials = computed(() => {
  if (!user.value?.fullName) return '?'
  const names = user.value.fullName.split(' ')
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
  }
  return names[0][0].toUpperCase()
})

const openAuthModal = () => {
  showAuthModal.value = true
}

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const handleAuthSuccess = () => {
  showProfileMenu.value = false
  // Redirect managers to panel
  if (isManager.value) {
    navigateTo('/painel')
  }
}

const handleLogout = () => {
  showProfileMenu.value = false
  logout()
}

const handleSearch = () => {
  if (searchQuery.value) {
    navigateTo(`/buscar?q=${encodeURIComponent(searchQuery.value)}`)
    showSearch.value = false
  }
}
</script>
