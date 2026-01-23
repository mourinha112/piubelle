import { ref, computed } from 'vue'

interface User {
  id: string
  email: string
  fullName: string
  phone?: string
  role: string
  avatarUrl?: string
}

interface Salon {
  id: string
  name: string
  slug: string
  logoUrl?: string
}

const user = ref<User | null>(null)
const token = ref<string | null>(null)
const salons = ref<Salon[]>([])
const currentSalon = ref<Salon | null>(null)
const isLoading = ref(false)

export const useAuth = () => {
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isManager = computed(() => user.value?.role === 'manager' || user.value?.role === 'admin')

  // Inicializar do localStorage
  const init = () => {
    if (typeof window !== 'undefined') {
      try {
        const savedToken = localStorage.getItem('piubelle_token')
        const savedUser = localStorage.getItem('piubelle_user')
        const savedSalon = localStorage.getItem('piubelle_salon')

        if (savedToken && savedToken !== 'undefined') {
          token.value = savedToken
        }
        if (savedUser && savedUser !== 'undefined') {
          user.value = JSON.parse(savedUser)
        }
        if (savedSalon && savedSalon !== 'undefined') {
          currentSalon.value = JSON.parse(savedSalon)
        }
      } catch (e) {
        // Limpar dados corrompidos
        localStorage.removeItem('piubelle_token')
        localStorage.removeItem('piubelle_user')
        localStorage.removeItem('piubelle_salon')
      }
    }
  }

  // Login
  const login = async (email: string, password: string) => {
    isLoading.value = true
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      }) as any

      if (response.success && response.data) {
        token.value = response.data.token
        user.value = response.data.user

        localStorage.setItem('piubelle_token', response.data.token)
        localStorage.setItem('piubelle_user', JSON.stringify(response.data.user))

        // Buscar salões se for gestor
        if (response.data.user.role === 'manager' || response.data.user.role === 'admin') {
          await fetchSalons()
        }

        return { success: true }
      }

      return { success: false, message: 'Erro ao fazer login' }
    } catch (error: any) {
      return { success: false, message: error.data?.message || 'Erro ao fazer login' }
    } finally {
      isLoading.value = false
    }
  }

  // Registro
  const register = async (data: {
    email: string
    password: string
    fullName: string
    phone?: string
    role?: string
  }) => {
    isLoading.value = true
    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: data
      }) as any

      if (response.success && response.data) {
        token.value = response.data.token
        user.value = response.data.user

        localStorage.setItem('piubelle_token', response.data.token)
        localStorage.setItem('piubelle_user', JSON.stringify(response.data.user))

        return { success: true }
      }

      return { success: false, message: 'Erro ao criar conta' }
    } catch (error: any) {
      return { success: false, message: error.data?.message || 'Erro ao criar conta' }
    } finally {
      isLoading.value = false
    }
  }

  // Logout
  const logout = () => {
    token.value = null
    user.value = null
    salons.value = []
    currentSalon.value = null

    localStorage.removeItem('piubelle_token')
    localStorage.removeItem('piubelle_user')
    localStorage.removeItem('piubelle_salon')

    navigateTo('/')
  }

  // Buscar dados do usuário
  const fetchUser = async () => {
    if (!token.value) return

    try {
      const response = await $fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token.value}` }
      }) as any

      if (response.success) {
        user.value = response.user
        salons.value = response.salons || []

        localStorage.setItem('piubelle_user', JSON.stringify(response.user))
      }
    } catch {
      // Token inválido, fazer logout
      logout()
    }
  }

  // Buscar salões do gestor
  const fetchSalons = async () => {
    if (!token.value) return

    try {
      const response = await $fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token.value}` }
      }) as any

      if (response.success && response.salons) {
        salons.value = response.salons

        // Selecionar primeiro salão se não tiver selecionado
        if (response.salons.length > 0 && !currentSalon.value) {
          setCurrentSalon(response.salons[0])
        }
      }
    } catch {
      // Silently fail
    }
  }

  // Selecionar salão atual
  const setCurrentSalon = (salon: Salon) => {
    currentSalon.value = salon
    localStorage.setItem('piubelle_salon', JSON.stringify(salon))
  }

  // Header de autenticação
  const authHeaders = computed(() => {
    if (!token.value) return {}
    return { Authorization: `Bearer ${token.value}` }
  })

  return {
    user,
    token,
    salons,
    currentSalon,
    isLoading,
    isAuthenticated,
    isManager,
    authHeaders,
    init,
    login,
    register,
    logout,
    fetchUser,
    fetchSalons,
    setCurrentSalon
  }
}
