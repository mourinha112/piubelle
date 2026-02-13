<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Form -->
    <div class="flex-1 flex items-center justify-center p-8 bg-white">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-10">
          <NuxtLink to="/" class="inline-block group">
            <img 
              src="/logotipo.png" 
              alt="PiuBelle" 
              class="h-16 w-auto object-contain mx-auto group-hover:scale-105 transition-transform"
            />
          </NuxtLink>
        </div>

        <!-- Title -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-display font-semibold text-gray-800 mb-2">Bem-vinda de volta!</h2>
          <p class="text-gray-500">Entre na sua conta para continuar</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <div class="relative">
              <Icon name="lucide:mail" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="form.email"
                type="email"
                placeholder="seu@email.com"
                class="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <div class="relative">
              <Icon name="lucide:lock" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border-2 border-transparent text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="rememberMe" class="w-4 h-4 rounded border-gray-300 text-lilac-500 focus:ring-lilac-400" />
              <span class="text-sm text-gray-600">Lembrar de mim</span>
            </label>
            <NuxtLink to="/esqueci-senha" class="text-sm text-lilac-600 hover:text-lilac-700 font-medium">
              Esqueceu a senha?
            </NuxtLink>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-glow"
          >
            <Icon v-if="loading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
            <span>{{ loading ? 'Entrando...' : 'Entrar' }}</span>
          </button>

          <p v-if="error" class="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl">{{ error }}</p>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-4 my-8">
          <div class="flex-1 h-px bg-gray-200" />
          <span class="text-sm text-gray-400">ou continue com</span>
          <div class="flex-1 h-px bg-gray-200" />
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
            <Icon name="mdi:google" class="w-5 h-5 text-red-500" />
            <span class="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button class="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
            <Icon name="mdi:facebook" class="w-5 h-5 text-blue-600" />
            <span class="text-sm font-medium text-gray-700">Facebook</span>
          </button>
        </div>

        <!-- Register Link -->
        <p class="text-center mt-8 text-gray-600">
          Não tem uma conta?
          <NuxtLink to="/registro" class="text-lilac-600 hover:text-lilac-700 font-semibold">
            Cadastre-se grátis
          </NuxtLink>
        </p>
      </div>
    </div>

    <!-- Right Side - Image -->
    <div class="hidden lg:flex flex-1 relative bg-gradient-to-br from-lilac-500 via-lilac-600 to-rose-500">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-rose-300 rounded-full blur-3xl" />
      </div>
      
      <div class="relative z-10 flex flex-col items-center justify-center p-12 text-white">
        <Icon name="lucide:sparkles" class="w-20 h-20 mb-6 opacity-90" />
        <h2 class="text-4xl font-display font-bold mb-4 text-center">
          Gerencie seu salão<br/>com elegância
        </h2>
        <p class="text-lg text-white/80 text-center max-w-md">
          Agendamentos, clientes, financeiro e muito mais em uma plataforma completa e intuitiva.
        </p>
        
        <!-- Features -->
        <div class="mt-12 space-y-4">
          <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
            <Icon name="lucide:calendar-check" class="w-5 h-5" />
            <span>Agendamento online 24h</span>
          </div>
          <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
            <Icon name="lucide:users" class="w-5 h-5" />
            <span>Gestão completa de clientes</span>
          </div>
          <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
            <Icon name="lucide:wallet" class="w-5 h-5" />
            <span>Controle financeiro integrado</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()
const { login, isAuthenticated, isManager } = useAuth()

const form = ref({
  email: '',
  password: ''
})
const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

// Redirect if already authenticated
watch(isAuthenticated, (value) => {
  if (value) {
    if (isManager.value) {
      router.push('/painel')
    } else {
      router.push('/')
    }
  }
}, { immediate: true })

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const result = await login(form.value.email, form.value.password)
    
    if (!result.success) {
      error.value = result.message || 'Erro ao fazer login'
      return
    }
    
    // Redirect based on role
    if (isManager.value) {
      router.push('/painel')
    } else {
      router.push('/')
    }
  } catch (e: any) {
    error.value = e.message || 'Erro ao fazer login'
  } finally {
    loading.value = false
  }
}

useSeoMeta({
  title: 'Login - PiuBelle',
  description: 'Entre na sua conta PiuBelle'
})
</script>
