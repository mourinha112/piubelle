<template>
  <UModal v-model="modelValue" :ui="{ width: 'max-w-md' }">
    <div class="p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <img 
          src="https://www.salonline.com.br/file/general/sl-transparent-logo.svg" 
          alt="PiuBelle" 
          class="h-20 w-auto object-contain mx-auto mb-4"
        />
        <h2 class="text-2xl font-display font-semibold text-gray-800">
          {{ isLogin ? 'Bem-vinda de volta!' : 'Crie sua conta' }}
        </h2>
        <p class="text-gray-500 text-sm mt-2">
          {{ isLogin ? 'Entre para agendar seus serviços favoritos' : 'Junte-se ao PiuBelle' }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <!-- Name (only register) -->
        <div v-if="!isLogin">
          <label class="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
          <div class="relative">
            <Icon name="lucide:user" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="form.fullName"
              type="text"
              placeholder="Seu nome"
              class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border-2 border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:ring-2 focus:ring-lilac-100 outline-none transition-all"
              required
            />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
          <div class="relative">
            <Icon name="lucide:mail" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="form.email"
              type="email"
              placeholder="seu@email.com"
              class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border-2 border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:ring-2 focus:ring-lilac-100 outline-none transition-all"
              required
            />
          </div>
        </div>

        <!-- Phone (only register) -->
        <div v-if="!isLogin">
          <label class="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
          <div class="relative">
            <Icon name="lucide:phone" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="form.phone"
              type="tel"
              placeholder="(00) 00000-0000"
              class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border-2 border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:ring-2 focus:ring-lilac-100 outline-none transition-all"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Senha</label>
          <div class="relative">
            <Icon name="lucide:lock" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white border-2 border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:ring-2 focus:ring-lilac-100 outline-none transition-all"
              required
            />
            <button 
              type="button"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              @click="showPassword = !showPassword"
            >
              <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Role (only register) -->
        <div v-if="!isLogin">
          <label class="block text-sm font-medium text-gray-700 mb-3">Sou...</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              :class="[
                'p-4 rounded-2xl border-2 transition-all text-left',
                form.role === 'client' 
                  ? 'border-lilac-400 bg-gradient-to-r from-lilac-50 to-rose-50' 
                  : 'border-lilac-100 hover:border-lilac-200'
              ]"
              @click="form.role = 'client'"
            >
              <Icon name="lucide:heart" class="w-6 h-6 text-lilac-500 mb-2" />
              <p class="font-medium text-gray-800">Cliente</p>
              <p class="text-xs text-gray-500">Quero agendar</p>
            </button>
            <button
              type="button"
              :class="[
                'p-4 rounded-2xl border-2 transition-all text-left',
                form.role === 'manager' 
                  ? 'border-lilac-400 bg-gradient-to-r from-lilac-50 to-rose-50' 
                  : 'border-lilac-100 hover:border-lilac-200'
              ]"
              @click="form.role = 'manager'"
            >
              <Icon name="lucide:sparkles" class="w-6 h-6 text-rose-500 mb-2" />
              <p class="font-medium text-gray-800">Gestora</p>
              <p class="text-xs text-gray-500">Tenho um salão</p>
            </button>
          </div>
        </div>

        <!-- Error Message -->
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-4 rounded-2xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-glow"
        >
          <Icon v-if="isLoading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
          <span>{{ isLogin ? 'Entrar' : 'Criar conta' }}</span>
        </button>
      </form>

      <!-- Toggle Login/Register -->
      <div class="mt-6 text-center">
        <p class="text-gray-500 text-sm">
          {{ isLogin ? 'Não tem conta?' : 'Já tem conta?' }}
          <button 
            class="text-lilac-600 font-medium hover:text-lilac-700"
            @click="isLogin = !isLogin"
          >
            {{ isLogin ? 'Criar conta' : 'Entrar' }}
          </button>
        </p>
      </div>

      <!-- Divider -->
      <div class="relative my-6">
        <div class="divider-gradient" />
        <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs text-gray-400">
          ou continue com
        </span>
      </div>

      <!-- Social Login -->
      <div class="flex gap-3">
        <button class="flex-1 py-3 rounded-xl border-2 border-lilac-100 hover:border-lilac-200 hover:bg-lilac-50 transition-all flex items-center justify-center gap-2">
          <Icon name="mdi:google" class="w-5 h-5 text-gray-600" />
          <span class="text-sm font-medium text-gray-600">Google</span>
        </button>
        <button class="flex-1 py-3 rounded-xl border-2 border-lilac-100 hover:border-lilac-200 hover:bg-lilac-50 transition-all flex items-center justify-center gap-2">
          <Icon name="mdi:apple" class="w-5 h-5 text-gray-600" />
          <span class="text-sm font-medium text-gray-600">Apple</span>
        </button>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>()
const emit = defineEmits<{
  (e: 'success'): void
}>()

const { login, register, isLoading } = useAuth()

const isLogin = ref(true)
const showPassword = ref(false)
const error = ref('')

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  role: 'client'
})

const handleSubmit = async () => {
  error.value = ''
  
  let result
  
  if (isLogin.value) {
    result = await login(form.value.email, form.value.password)
  } else {
    result = await register({
      fullName: form.value.fullName,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password,
      role: form.value.role
    })
  }
  
  if (result.success) {
    modelValue.value = false
    emit('success')
  } else {
    error.value = result.error || 'Erro ao processar'
  }
}

// Reset form when modal closes
watch(modelValue, (value) => {
  if (!value) {
    error.value = ''
    form.value = {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      role: 'client'
    }
  }
})
</script>
