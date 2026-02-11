<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Image -->
    <div class="hidden lg:flex flex-1 relative bg-gradient-to-br from-rose-500 via-lilac-500 to-lilac-600">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div class="absolute bottom-20 left-20 w-96 h-96 bg-rose-300 rounded-full blur-3xl" />
      </div>
      
      <div class="relative z-10 flex flex-col items-center justify-center p-12 text-white">
        <Icon name="lucide:heart" class="w-20 h-20 mb-6 opacity-90" />
        <h2 class="text-4xl font-display font-bold mb-4 text-center">
          Comece sua jornada<br/>de sucesso
        </h2>
        <p class="text-lg text-white/80 text-center max-w-md">
          Milhares de profissionais de beleza já confiam no PiuBelle para gerenciar seus negócios.
        </p>
        
        <!-- Testimonial -->
        <div class="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm">
          <p class="text-white/90 italic mb-4">
            "O PiuBelle transformou a gestão do meu salão. Agora tenho mais tempo para focar no que amo: minhas clientes!"
          </p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span class="font-bold">AS</span>
            </div>
            <div>
              <p class="font-medium">Ana Silva</p>
              <p class="text-sm text-white/70">Studio Belle Hair</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
      <div class="w-full max-w-md py-8">
        <!-- Logo -->
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-block group">
            <img 
              src="https://www.salonline.com.br/file/general/sl-transparent-logo.svg" 
              alt="PiuBelle" 
              class="h-16 w-auto object-contain mx-auto group-hover:scale-105 transition-transform"
            />
          </NuxtLink>
        </div>

        <!-- Title -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-display font-semibold text-gray-800 mb-2">Crie sua conta</h2>
          <p class="text-gray-500">É rápido, fácil e grátis!</p>
        </div>

        <!-- Account Type -->
        <div class="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            :class="[
              'p-4 rounded-2xl border-2 transition-all text-center',
              accountType === 'client' 
                ? 'border-lilac-400 bg-lilac-50' 
                : 'border-gray-100 hover:border-gray-200'
            ]"
            @click="accountType = 'client'"
          >
            <Icon name="lucide:user" class="w-6 h-6 mx-auto mb-2" :class="accountType === 'client' ? 'text-lilac-600' : 'text-gray-400'" />
            <p class="font-medium" :class="accountType === 'client' ? 'text-lilac-700' : 'text-gray-700'">Sou Cliente</p>
            <p class="text-xs text-gray-400 mt-1">Quero agendar serviços</p>
          </button>
          <button
            type="button"
            :class="[
              'p-4 rounded-2xl border-2 transition-all text-center',
              accountType === 'manager' 
                ? 'border-rose-400 bg-rose-50' 
                : 'border-gray-100 hover:border-gray-200'
            ]"
            @click="accountType = 'manager'"
          >
            <Icon name="lucide:briefcase" class="w-6 h-6 mx-auto mb-2" :class="accountType === 'manager' ? 'text-rose-600' : 'text-gray-400'" />
            <p class="font-medium" :class="accountType === 'manager' ? 'text-rose-700' : 'text-gray-700'">Sou Profissional</p>
            <p class="text-xs text-gray-400 mt-1">Quero gerenciar meu salão</p>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
            <div class="relative">
              <Icon name="lucide:user" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="form.fullName"
                type="text"
                placeholder="Seu nome completo"
                class="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                required
              />
            </div>
          </div>

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
            <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
            <div class="relative">
              <Icon name="lucide:phone" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="form.phone"
                type="tel"
                placeholder="(00) 00000-0000"
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
                placeholder="Mínimo 6 caracteres"
                class="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border-2 border-transparent text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                required
                minlength="6"
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

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar senha</label>
            <div class="relative">
              <Icon name="lucide:lock" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="form.confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Repita a senha"
                class="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                required
              />
            </div>
          </div>

          <label class="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" v-model="acceptTerms" class="mt-1 w-4 h-4 rounded border-gray-300 text-lilac-500 focus:ring-lilac-400" required />
            <span class="text-sm text-gray-600">
              Li e aceito os 
              <a href="#" class="text-lilac-600 hover:underline">Termos de Uso</a> e a
              <a href="#" class="text-lilac-600 hover:underline">Política de Privacidade</a>
            </span>
          </label>

          <button
            type="submit"
            :disabled="loading || !acceptTerms"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-glow"
          >
            <Icon v-if="loading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
            <span>{{ loading ? 'Criando conta...' : 'Criar conta grátis' }}</span>
          </button>

          <p v-if="error" class="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl">{{ error }}</p>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-4 my-6">
          <div class="flex-1 h-px bg-gray-200" />
          <span class="text-sm text-gray-400">ou cadastre com</span>
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

        <!-- Login Link -->
        <p class="text-center mt-6 text-gray-600">
          Já tem uma conta?
          <NuxtLink to="/login" class="text-lilac-600 hover:text-lilac-700 font-semibold">
            Fazer login
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()
const { register, isAuthenticated, isManager } = useAuth()

const accountType = ref<'client' | 'manager'>('client')
const form = ref({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})
const showPassword = ref(false)
const acceptTerms = ref(false)
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

const handleRegister = async () => {
  error.value = ''
  
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'As senhas não coincidem'
    return
  }
  
  if (form.value.password.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres'
    return
  }

  loading.value = true

  try {
    const result = await register({
      fullName: form.value.fullName,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password,
      role: accountType.value
    })
    
    if (!result.success) {
      error.value = result.message || 'Erro ao criar conta'
      return
    }
    
    // Redirect based on role
    if (accountType.value === 'manager') {
      router.push('/painel')
    } else {
      router.push('/')
    }
  } catch (e: any) {
    error.value = e.message || 'Erro ao criar conta'
  } finally {
    loading.value = false
  }
}

useSeoMeta({
  title: 'Criar Conta - PiuBelle',
  description: 'Crie sua conta grátis no PiuBelle'
})
</script>
