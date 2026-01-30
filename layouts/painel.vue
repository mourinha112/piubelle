<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 via-white to-lilac-50 flex">
    <!-- Modal Criar Salão -->
    <UModal v-model="showCreateSalon" :ui="{ width: 'max-w-lg' }">
      <div class="p-8">
        <div class="text-center mb-8">
          <img 
            src="/logotipo.png" 
            alt="PiuBelle" 
            class="h-20 w-auto object-contain mx-auto mb-4"
          />
          <h2 class="text-2xl font-display font-semibold text-gray-800">Crie seu Salão</h2>
          <p class="text-gray-500 text-sm mt-2">Configure seu salão de beleza para começar a usar o sistema</p>
        </div>

        <form @submit.prevent="createSalon" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Salão *</label>
            <input
              v-model="newSalon.name"
              type="text"
              placeholder="Ex: Studio Belle Hair"
              class="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:ring-2 focus:ring-lilac-100 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
            <div class="flex items-center gap-2">
              <span class="text-gray-400 text-sm">piubelle.com/</span>
              <input
                v-model="newSalon.slug"
                type="text"
                placeholder="studio-belle"
                class="flex-1 px-4 py-3.5 rounded-2xl bg-white border-2 border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:ring-2 focus:ring-lilac-100 outline-none transition-all"
              />
            </div>
            <p class="text-xs text-gray-400 mt-2">Deixe em branco para gerar automaticamente</p>
          </div>

          <button
            type="submit"
            :disabled="creatingSalon || !newSalon.name"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-glow"
          >
            <Icon v-if="creatingSalon" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
            <span>{{ creatingSalon ? 'Criando...' : 'Criar Salão' }}</span>
          </button>

          <p v-if="createError" class="text-red-500 text-sm text-center">{{ createError }}</p>
        </form>
      </div>
    </UModal>

    <!-- Sidebar -->
    <aside 
      class="fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-lilac-100/50 flex flex-col transition-transform duration-300 shadow-soft"
      :class="[
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Logo -->
      <div class="p-6 border-b border-lilac-100/50">
        <NuxtLink to="/painel" class="flex items-center gap-3 group">
          <img 
            src="/logotipo.png" 
            alt="PiuBelle" 
            class="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
          />
          <div>
            <p class="text-[10px] text-gray-400 tracking-wider uppercase">Painel do Gestor</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Salon Selector -->
      <div class="p-4 border-b border-lilac-100/50">
        <button 
          v-if="currentSalon"
          class="w-full flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-lilac-50 to-rose-50 hover:from-lilac-100 hover:to-rose-100 transition-all border border-lilac-100"
          @click="showSalonSelector = !showSalonSelector"
        >
          <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-lilac-400 to-rose-400 flex items-center justify-center overflow-hidden">
            <template v-if="currentSalon?.logo_url">
              <img :src="currentSalon.logo_url" :alt="currentSalon.name" class="w-full h-full object-cover" />
            </template>
            <template v-else>
              <span class="text-white font-bold text-sm">{{ salonInitials }}</span>
            </template>
          </div>
          <div class="flex-1 text-left">
            <p class="text-sm font-medium text-gray-800">{{ currentSalon?.name }}</p>
            <p class="text-xs text-emerald-500 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Ativo
            </p>
          </div>
          <Icon name="lucide:chevron-down" class="w-4 h-4 text-gray-400" />
        </button>

        <!-- Botão criar salão se não tiver -->
        <button 
          v-else
          class="w-full flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-lilac-50 to-rose-50 border-2 border-dashed border-lilac-200 hover:border-lilac-300 transition-all"
          @click="showCreateSalon = true"
        >
          <div class="w-11 h-11 rounded-xl bg-lilac-100 flex items-center justify-center">
            <Icon name="lucide:plus" class="w-5 h-5 text-lilac-500" />
          </div>
          <div class="flex-1 text-left">
            <p class="text-sm font-medium text-lilac-600">Criar Salão</p>
            <p class="text-xs text-gray-400">Configure seu primeiro salão</p>
          </div>
        </button>

        <!-- Salon Dropdown -->
        <div v-if="showSalonSelector && userSalons.length > 1" class="mt-2 p-2 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <button
            v-for="salon in userSalons"
            :key="salon.id"
            class="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-lilac-50 transition-colors"
            :class="currentSalon?.id === salon.id ? 'bg-lilac-50' : ''"
            @click="selectSalon(salon)"
          >
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-lilac-400 to-rose-400 flex items-center justify-center text-xs font-bold text-white">
              {{ salon.name.charAt(0) }}
            </div>
            <span class="text-sm text-gray-700">{{ salon.name }}</span>
          </button>
          
          <button
            class="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-lilac-50 transition-colors mt-2 border-t border-lilac-100 pt-2"
            @click="showCreateSalon = true; showSalonSelector = false"
          >
            <div class="w-8 h-8 rounded-lg bg-lilac-100 flex items-center justify-center">
              <Icon name="lucide:plus" class="w-4 h-4 text-lilac-500" />
            </div>
            <span class="text-sm text-gray-500">Novo salão</span>
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <p class="text-[10px] text-gray-400 uppercase tracking-wider mb-3 px-3 font-medium">Principal</p>
        
        <NuxtLink 
          v-for="item in mainNavItems" 
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl transition-all group',
            isActive(item.path) 
              ? 'bg-gradient-to-r from-lilac-100 to-rose-100 text-lilac-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-lilac-50/50'
          ]"
        >
          <Icon :name="item.icon" class="w-5 h-5" />
          <span class="flex-1 text-sm font-medium">{{ item.label }}</span>
        </NuxtLink>

        <p class="text-[10px] text-gray-400 uppercase tracking-wider mb-3 px-3 mt-8 font-medium">Gestão</p>
        
        <NuxtLink 
          v-for="item in managementNavItems" 
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl transition-all group',
            isActive(item.path) 
              ? 'bg-gradient-to-r from-lilac-100 to-rose-100 text-lilac-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-lilac-50/50'
          ]"
        >
          <Icon :name="item.icon" class="w-5 h-5" />
          <span class="flex-1 text-sm font-medium">{{ item.label }}</span>
        </NuxtLink>

        <p class="text-[10px] text-gray-400 uppercase tracking-wider mb-3 px-3 mt-8 font-medium">Sistema</p>
        
        <NuxtLink 
          v-for="item in systemNavItems" 
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl transition-all group',
            isActive(item.path) 
              ? 'bg-gradient-to-r from-lilac-100 to-rose-100 text-lilac-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-lilac-50/50'
          ]"
        >
          <Icon :name="item.icon" class="w-5 h-5" />
          <span class="text-sm font-medium">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- User Section -->
      <div class="p-4 border-t border-lilac-100/50">
        <div class="flex items-center gap-3 p-3 rounded-2xl hover:bg-lilac-50/50 transition-colors cursor-pointer">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-lilac-400 to-rose-400 overflow-hidden flex items-center justify-center">
            <template v-if="displayUser?.avatarUrl">
              <img :src="displayUser.avatarUrl" :alt="displayUser.fullName" class="w-full h-full object-cover" />
            </template>
            <template v-else>
              <span class="text-white font-bold text-sm">{{ userInitials }}</span>
            </template>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-800">{{ displayUser?.fullName || 'Usuário' }}</p>
            <p class="text-xs text-gray-400">{{ roleLabel }}</p>
          </div>
          <button @click="handleLogout" class="p-2 rounded-lg hover:bg-red-50 transition-colors group">
            <Icon name="lucide:log-out" class="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div 
      v-if="sidebarOpen"
      class="fixed inset-0 bg-lilac-900/20 backdrop-blur-sm z-40 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen lg:ml-0">
      <!-- Top Header -->
      <header class="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-lilac-100/50">
        <div class="flex items-center justify-between px-6 py-4">
          <div class="flex items-center gap-4">
            <button 
              class="lg:hidden p-2 rounded-xl hover:bg-lilac-50 transition-colors"
              @click="sidebarOpen = !sidebarOpen"
            >
              <Icon name="lucide:menu" class="w-5 h-5 text-gray-500" />
            </button>
            <div>
              <h2 class="text-xl font-display font-semibold text-gray-800">{{ pageTitle }}</h2>
              <p class="text-xs text-gray-400">{{ currentDate }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <!-- Quick Actions -->
            <NuxtLink 
              v-if="currentSalon"
              to="/painel/agendamentos"
              class="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold text-sm hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow"
            >
              <Icon name="lucide:plus" class="w-4 h-4" />
              Novo Agendamento
            </NuxtLink>

            <!-- Notifications -->
            <button 
              @click="showNotifications = !showNotifications"
              class="relative p-2.5 rounded-xl bg-white border border-lilac-100 hover:border-lilac-200 hover:bg-lilac-50 transition-all shadow-soft"
            >
              <Icon name="lucide:bell" class="w-5 h-5 text-gray-500" />
              <span v-if="notificationCount > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">{{ notificationCount }}</span>
            </button>

            <!-- Notifications Dropdown -->
            <div 
              v-if="showNotifications" 
              class="absolute top-16 right-6 w-80 bg-white rounded-2xl border border-lilac-100 shadow-xl z-50 overflow-hidden"
            >
              <div class="p-4 border-b border-lilac-100">
                <h3 class="font-semibold text-gray-800">Notificações</h3>
              </div>
              <div class="max-h-80 overflow-y-auto">
                <div v-if="notifications.length === 0" class="p-6 text-center text-gray-500">
                  <Icon name="lucide:bell-off" class="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p class="text-sm">Nenhuma notificação</p>
                </div>
                <div v-else>
                  <div 
                    v-for="notif in notifications" 
                    :key="notif.id"
                    class="p-4 border-b border-lilac-50 hover:bg-lilac-50/50 transition-colors cursor-pointer"
                  >
                    <p class="text-sm text-gray-800">{{ notif.message }}</p>
                    <p class="text-xs text-gray-400 mt-1">{{ notif.time }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Search -->
            <button 
              @click="showSearch = !showSearch"
              class="hidden md:flex p-2.5 rounded-xl bg-white border border-lilac-100 hover:border-lilac-200 hover:bg-lilac-50 transition-all shadow-soft"
            >
              <Icon name="lucide:search" class="w-5 h-5 text-gray-500" />
            </button>

            <!-- Search Modal -->
            <div 
              v-if="showSearch" 
              class="absolute top-16 right-6 w-96 bg-white rounded-2xl border border-lilac-100 shadow-xl z-50 overflow-hidden"
            >
              <div class="p-4">
                <div class="relative">
                  <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    v-model="searchQuery"
                    type="text"
                    placeholder="Buscar clientes, serviços, agendamentos..."
                    class="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 focus:border-lilac-300 outline-none"
                    autofocus
                  />
                </div>
                <div v-if="searchQuery" class="mt-3 space-y-2">
                  <NuxtLink 
                    :to="`/painel/clientes?search=${searchQuery}`"
                    @click="showSearch = false"
                    class="block p-3 rounded-lg hover:bg-lilac-50 transition-colors"
                  >
                    <div class="flex items-center gap-3">
                      <Icon name="lucide:users" class="w-5 h-5 text-lilac-500" />
                      <span class="text-sm text-gray-700">Buscar em Clientes</span>
                    </div>
                  </NuxtLink>
                  <NuxtLink 
                    :to="`/painel/agendamentos?search=${searchQuery}`"
                    @click="showSearch = false"
                    class="block p-3 rounded-lg hover:bg-lilac-50 transition-colors"
                  >
                    <div class="flex items-center gap-3">
                      <Icon name="lucide:calendar" class="w-5 h-5 text-lilac-500" />
                      <span class="text-sm text-gray-700">Buscar em Agendamentos</span>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <!-- Mostrar aviso se não tiver salão -->
        <div v-if="!currentSalon && !loadingSalons" class="flex flex-col items-center justify-center min-h-[60vh]">
          <img 
            src="/logotipo.png" 
            alt="PiuBelle" 
            class="h-24 w-auto object-contain mb-6"
          />
          <h2 class="text-2xl font-display font-semibold text-gray-800 mb-3">Bem-vinda ao PiuBelle!</h2>
          <p class="text-gray-500 text-center max-w-md mb-8">
            Para começar a usar o sistema, você precisa criar seu primeiro salão de beleza.
          </p>
          <button 
            @click="showCreateSalon = true"
            class="px-8 py-4 rounded-2xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 transition-all flex items-center gap-2 shadow-glow"
          >
            <Icon name="lucide:plus" class="w-5 h-5" />
            Criar Meu Salão
          </button>
        </div>

        <!-- Conteúdo normal -->
        <div v-else-if="currentSalon">
          <slot />
        </div>

        <!-- Loading -->
        <div v-else class="flex items-center justify-center min-h-[60vh]">
          <Icon name="lucide:loader-2" class="w-8 h-8 text-lilac-500 animate-spin" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const route = useRoute()
const { user, isAuthenticated, isManager, init, logout, authHeaders } = useAuth()

const sidebarOpen = ref(false)
const showSalonSelector = ref(false)
const showCreateSalon = ref(false)
const showNotifications = ref(false)
const showSearch = ref(false)
const searchQuery = ref('')
const loadingSalons = ref(true)
const userSalons = ref<any[]>([])
const currentSalon = ref<any>(null)
const creatingSalon = ref(false)
const createError = ref('')
const newSalon = ref({
  name: '',
  slug: ''
})

// Notifications
const notifications = ref<any[]>([])
const notificationCount = computed(() => notifications.value.length)

// Close dropdowns when clicking outside
const closeDropdowns = () => {
  showNotifications.value = false
  showSearch.value = false
}

// Close dropdowns on route change
watch(() => route.path, () => {
  closeDropdowns()
})

// Initialize auth
onMounted(async () => {
  init()
  
  // Se não estiver autenticado, redirecionar para login
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }
  
  // Redirect if authenticated but not a manager
  if (isAuthenticated.value && !isManager.value) {
    navigateTo('/')
    return
  }

  // Buscar salões do usuário (funciona normal - se não tiver salão, mostra tela de criar)
  await fetchUserSalons()
})

// Buscar salões do usuário
const fetchUserSalons = async () => {
  if (!user.value?.id) return
  
  loadingSalons.value = true
  try {
    const { data } = await useFetch(`/api/painel/salon/my`, {
      headers: authHeaders.value
    })
    if (data.value?.success) {
      userSalons.value = data.value.data || []
      
      // Selecionar primeiro salão automaticamente
      if (userSalons.value.length > 0) {
        currentSalon.value = userSalons.value[0]
      }
    }
  } catch (error) {
    console.error('Erro ao buscar salões:', error)
  } finally {
    loadingSalons.value = false
  }
}

// Criar salão
const createSalon = async () => {
  if (!newSalon.value.name || !user.value?.id) return
  
  creatingSalon.value = true
  createError.value = ''
  
  try {
    const { data, error } = await useFetch('/api/painel/salon', {
      method: 'POST',
      headers: authHeaders.value,
      body: {
        name: newSalon.value.name,
        slug: newSalon.value.slug || undefined,
        ownerId: user.value.id
      }
    })

    if (error.value) {
      createError.value = error.value.data?.message || 'Erro ao criar salão'
      return
    }

    if (data.value?.success) {
      // Adicionar à lista e selecionar
      userSalons.value.unshift(data.value.data)
      currentSalon.value = data.value.data
      showCreateSalon.value = false
      newSalon.value = { name: '', slug: '' }
    }
  } catch (error: any) {
    createError.value = error.message || 'Erro ao criar salão'
  } finally {
    creatingSalon.value = false
  }
}

// Watch for auth changes
watch(isAuthenticated, (isAuth) => {
  if (!isAuth) {
    navigateTo('/')
  }
})

// Watch user changes
watch(user, () => {
  if (user.value?.id && userSalons.value.length === 0) {
    fetchUserSalons()
  }
})

const userInitials = computed(() => {
  if (!user.value?.fullName) return 'D'
  const names = user.value.fullName.split(' ')
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
  }
  return names[0][0].toUpperCase()
})

// Demo user data
const demoUser = computed(() => ({
  fullName: 'Gestora Demo',
  role: 'manager',
  avatarUrl: null
}))

const displayUser = computed(() => user.value || demoUser.value)

const salonInitials = computed(() => {
  if (!currentSalon.value?.name) return 'PB'
  const words = currentSalon.value.name.split(' ')
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase()
  }
  return words[0].substring(0, 2).toUpperCase()
})

const roleLabel = computed(() => {
  const roles: Record<string, string> = {
    admin: 'Administradora',
    manager: 'Gestora',
    professional: 'Profissional',
    client: 'Cliente'
  }
  return roles[displayUser.value?.role || ''] || 'Gestora'
})

const selectSalon = (salon: any) => {
  currentSalon.value = salon
  showSalonSelector.value = false
}

const handleLogout = () => {
  logout()
}

const mainNavItems = [
  { path: '/painel', icon: 'lucide:layout-dashboard', label: 'Dashboard' },
  { path: '/painel/agendamentos', icon: 'lucide:calendar', label: 'Agendamentos' },
  { path: '/painel/fila', icon: 'lucide:users', label: 'Fila Virtual' },
  { path: '/painel/caixa', icon: 'lucide:banknote', label: 'Caixa do Dia' }
]

const managementNavItems = [
  { path: '/painel/clientes', icon: 'lucide:user-circle', label: 'Clientes' },
  { path: '/painel/equipe', icon: 'lucide:users-round', label: 'Equipe' },
  { path: '/painel/servicos', icon: 'lucide:sparkles', label: 'Serviços' },
  { path: '/painel/financeiro', icon: 'lucide:wallet', label: 'Financeiro' },
  { path: '/painel/fidelidade', icon: 'lucide:gift', label: 'Fidelidade' },
  { path: '/painel/avaliacoes', icon: 'lucide:star', label: 'Avaliações' }
]

const systemNavItems = [
  { path: '/painel/whatsapp', icon: 'mdi:whatsapp', label: 'WhatsApp Bot' },
  { path: '/painel/link-bio', icon: 'lucide:link', label: 'Link Bio' },
  { path: '/painel/configuracoes', icon: 'lucide:settings', label: 'Configurações' }
]

const isActive = (path: string) => {
  if (path === '/painel') {
    return route.path === '/painel'
  }
  return route.path.startsWith(path)
}

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/painel': 'Dashboard',
    '/painel/agendamentos': 'Agendamentos',
    '/painel/fila': 'Fila Virtual',
    '/painel/caixa': 'Caixa do Dia',
    '/painel/clientes': 'Clientes',
    '/painel/equipe': 'Equipe',
    '/painel/servicos': 'Serviços',
    '/painel/financeiro': 'Financeiro',
    '/painel/fidelidade': 'Programa de Fidelidade',
    '/painel/avaliacoes': 'Avaliações',
    '/painel/whatsapp': 'WhatsApp Bot',
    '/painel/link-bio': 'Link Bio',
    '/painel/configuracoes': 'Configurações'
  }
  return titles[route.path] || 'Painel'
})

const currentDate = computed(() => {
  return format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })
})

// Close sidebar on route change (mobile)
watch(() => route.path, () => {
  sidebarOpen.value = false
})

// Provide salon to child components
provide('currentSalon', currentSalon)
</script>
