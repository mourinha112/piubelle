import { ref } from 'vue'
import { useAuth } from './useAuth'

export function useSubscription() {
  const { authHeaders } = useAuth()
  const subscription = ref<any>(null)
  const loading = ref(false)

  const load = async (salonId: string) => {
    if (!salonId) return
    loading.value = true
    try {
      const res = await $fetch(`/api/painel/subscription?salonId=${salonId}`, {
        headers: authHeaders.value
      }).catch(() => null)
      if (res?.data) subscription.value = res.data
    } catch (err) {
      console.error('useSubscription load error', err)
    } finally { loading.value = false }
  }

  const canAddEmployees = (count = 1) => {
    if (!subscription.value) return false
    const max = subscription.value.plan?.max_employees ?? Infinity
    const current = subscription.value.extra_employees ?? 0
    return (current + count) <= max
  }

  return { subscription, loading, load, canAddEmployees }
}

