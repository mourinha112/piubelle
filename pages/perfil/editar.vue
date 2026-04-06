<template>
  <div class="min-h-screen py-6">
    <div class="container-app max-w-2xl">
      <!-- Back Button -->
      <NuxtLink
        to="/perfil"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-lilac-100 text-gray-600 font-medium hover:border-lilac-200 transition-all shadow-soft mb-6"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4" />
        Voltar ao perfil
      </NuxtLink>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-display font-semibold text-gray-800">Editar Perfil</h1>
        <p class="text-gray-500 mt-1">Atualize suas informações pessoais</p>
      </div>

      <!-- Avatar Section -->
      <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft mb-6">
        <h2 class="font-display text-lg font-semibold text-gray-800 mb-4">Foto de Perfil</h2>
        <div class="flex items-center gap-6">
          <div class="relative">
            <div class="w-24 h-24 rounded-2xl overflow-hidden border-2 border-lilac-100 bg-gray-50">
              <img
                v-if="avatarPreview || form.avatarUrl"
                :src="avatarPreview || form.avatarUrl"
                alt="Avatar"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-lilac-400 to-rose-400 flex items-center justify-center">
                <span class="text-2xl font-bold text-white">{{ userInitials }}</span>
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <label class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white text-sm font-medium cursor-pointer hover:from-lilac-600 hover:to-rose-600 transition-all shadow-glow">
              <Icon name="lucide:upload" class="w-4 h-4" />
              Escolher foto
              <input
                type="file"
                accept="image/*"
                class="sr-only"
                @change="handleImageUpload"
              />
            </label>
            <p class="text-xs text-gray-400">JPG, PNG. Max 3 MB.</p>
          </div>
        </div>
      </div>

      <!-- Personal Info -->
      <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft mb-6">
        <h2 class="font-display text-lg font-semibold text-gray-800 mb-4">Informacoes Pessoais</h2>

        <form @submit.prevent="saveProfile" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
            <div class="relative">
              <Icon name="lucide:user" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="form.fullName"
                type="text"
                class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:bg-white focus:ring-2 focus:ring-lilac-100 outline-none transition-all"
                placeholder="Seu nome completo"
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
                class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:bg-white focus:ring-2 focus:ring-lilac-100 outline-none transition-all"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
            <div class="relative">
              <Icon name="lucide:phone" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="form.phone"
                type="tel"
                class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:bg-white focus:ring-2 focus:ring-lilac-100 outline-none transition-all"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div class="flex items-center justify-end gap-3">
            <span v-if="savedProfile" class="text-emerald-600 text-sm font-medium flex items-center gap-1">
              <Icon name="lucide:check-circle" class="w-4 h-4" />
              Perfil salvo!
            </span>
            <button
              type="submit"
              :disabled="savingProfile"
              class="px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 disabled:opacity-50 transition-all flex items-center gap-2 shadow-glow"
            >
              <Icon v-if="savingProfile" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
              <Icon v-else name="lucide:save" class="w-5 h-5" />
              Salvar Perfil
            </button>
          </div>
        </form>
      </div>

      <!-- Change Password -->
      <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <h2 class="font-display text-lg font-semibold text-gray-800 mb-4">Alterar Senha</h2>

        <form @submit.prevent="changePassword" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Senha atual</label>
            <div class="relative">
              <Icon name="lucide:lock" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="passwordForm.currentPassword"
                type="password"
                class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:bg-white focus:ring-2 focus:ring-lilac-100 outline-none transition-all"
                placeholder="Sua senha atual"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nova senha</label>
            <div class="relative">
              <Icon name="lucide:lock" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="passwordForm.newPassword"
                type="password"
                class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:bg-white focus:ring-2 focus:ring-lilac-100 outline-none transition-all"
                placeholder="Nova senha (min. 6 caracteres)"
                required
                minlength="6"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar nova senha</label>
            <div class="relative">
              <Icon name="lucide:lock" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-lilac-100 text-gray-800 placeholder-gray-400 focus:border-lilac-400 focus:bg-white focus:ring-2 focus:ring-lilac-100 outline-none transition-all"
                placeholder="Repita a nova senha"
                required
              />
            </div>
          </div>

          <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
          <p v-if="passwordSuccess" class="text-emerald-600 text-sm">{{ passwordSuccess }}</p>

          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="savingPassword"
              class="px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 disabled:opacity-50 transition-all flex items-center gap-2 shadow-glow"
            >
              <Icon v-if="savingPassword" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
              <Icon v-else name="lucide:key" class="w-5 h-5" />
              Alterar Senha
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, authHeaders } = useAuth()

const avatarPreview = ref('')
const savingProfile = ref(false)
const savedProfile = ref(false)
const savingPassword = ref(false)
const passwordError = ref('')
const passwordSuccess = ref('')

const userInitials = computed(() => {
  const name = user.value?.fullName || ''
  return name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
})

const form = ref({
  fullName: user.value?.fullName || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  avatarUrl: user.value?.avatarUrl || ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Watch for user data loading
watch(() => user.value, (val) => {
  if (val) {
    form.value.fullName = val.fullName || ''
    form.value.email = val.email || ''
    form.value.phone = val.phone || ''
    form.value.avatarUrl = val.avatarUrl || ''
  }
}, { immediate: true })

const handleImageUpload = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (file.size > 3 * 1024 * 1024) {
    alert('Imagem muito grande. Use ate 3 MB.')
    input.value = ''
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    avatarPreview.value = event.target?.result as string
  }
  reader.readAsDataURL(file)
}

const saveProfile = async () => {
  savingProfile.value = true
  savedProfile.value = false

  try {
    const body: Record<string, any> = {
      fullName: form.value.fullName,
      email: form.value.email,
      phone: form.value.phone
    }

    // Only send avatar if it's a URL (not base64 preview)
    if (form.value.avatarUrl && !form.value.avatarUrl.startsWith('data:')) {
      body.avatarUrl = form.value.avatarUrl
    }

    const response = await $fetch('/api/auth/profile', {
      method: 'PUT',
      headers: authHeaders.value,
      body
    }) as any

    if (response.success && response.user) {
      // Update local user data
      if (user.value) {
        user.value.fullName = response.user.fullName
        user.value.email = response.user.email
        user.value.phone = response.user.phone
        user.value.avatarUrl = response.user.avatarUrl
        localStorage.setItem('piubelle_user', JSON.stringify(user.value))
      }
    }

    savedProfile.value = true
    setTimeout(() => { savedProfile.value = false }, 3000)
  } catch (error: any) {
    alert(error?.data?.message || 'Erro ao salvar perfil')
  } finally {
    savingProfile.value = false
  }
}

const changePassword = async () => {
  passwordError.value = ''
  passwordSuccess.value = ''

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = 'As senhas nao coincidem'
    return
  }

  if (passwordForm.value.newPassword.length < 6) {
    passwordError.value = 'A nova senha deve ter pelo menos 6 caracteres'
    return
  }

  savingPassword.value = true

  try {
    await $fetch('/api/auth/change-password', {
      method: 'POST',
      headers: authHeaders.value,
      body: {
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword
      }
    })

    passwordSuccess.value = 'Senha alterada com sucesso!'
    passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
    setTimeout(() => { passwordSuccess.value = '' }, 3000)
  } catch (error: any) {
    passwordError.value = error?.data?.message || 'Erro ao alterar senha'
  } finally {
    savingPassword.value = false
  }
}
</script>
