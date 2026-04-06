<template>
  <div class="min-h-screen py-6">
    <div class="container-app max-w-3xl">
      <!-- Back Button -->
      <NuxtLink
        to="/perfil"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-lilac-100 text-gray-600 font-medium hover:border-lilac-200 transition-all shadow-soft mb-6"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4" />
        Voltar ao perfil
      </NuxtLink>

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-display font-semibold text-gray-800">Notificacoes</h1>
          <p class="text-gray-500 mt-1">
            {{ unreadCount > 0 ? `${unreadCount} nao lida${unreadCount > 1 ? 's' : ''}` : 'Todas lidas' }}
          </p>
        </div>
        <button
          v-if="unreadCount > 0"
          class="px-4 py-2.5 rounded-xl bg-white border border-lilac-100 text-lilac-600 font-medium text-sm hover:border-lilac-200 hover:bg-lilac-50 transition-all shadow-soft"
          @click="markAllAsRead"
        >
          <Icon name="lucide:check-check" class="w-4 h-4 inline mr-1" />
          Marcar todas como lidas
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="p-5 rounded-2xl bg-white border border-lilac-100 shadow-soft animate-pulse">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-gray-200" />
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-2/3" />
              <div class="h-3 bg-gray-100 rounded w-full" />
              <div class="h-3 bg-gray-100 rounded w-1/4" />
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications List -->
      <div v-else-if="notifications.length > 0" class="space-y-3">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'p-5 rounded-2xl border transition-all',
            notification.read
              ? 'bg-white border-lilac-100 shadow-soft'
              : 'bg-gradient-to-r from-lilac-50 to-rose-50 border-lilac-200 shadow-soft-lg'
          ]"
        >
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div
              :class="[
                'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center',
                getNotificationStyle(notification.type).bg
              ]"
            >
              <Icon
                :name="getNotificationStyle(notification.type).icon"
                class="w-5 h-5"
                :class="getNotificationStyle(notification.type).color"
              />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <h3 :class="['font-medium', notification.read ? 'text-gray-700' : 'text-gray-800']">
                {{ notification.title }}
              </h3>
              <p class="text-sm text-gray-500 mt-0.5">{{ notification.message }}</p>
              <p class="text-xs text-gray-400 mt-2">{{ formatDate(notification.createdAt) }}</p>
            </div>

            <!-- Unread dot -->
            <div v-if="!notification.read" class="flex-shrink-0 mt-2">
              <div class="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-lilac-500 to-rose-500" />
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 rounded-2xl bg-white border border-lilac-100 shadow-soft text-center">
        <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-lilac-100 to-rose-100 flex items-center justify-center">
          <Icon name="lucide:bell-off" class="w-10 h-10 text-lilac-400" />
        </div>
        <h2 class="text-xl font-display font-semibold text-gray-800 mb-2">Nenhuma notificacao</h2>
        <p class="text-gray-500">Quando houver novidades, elas aparecerao aqui.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { authHeaders } = useAuth()

interface Notification {
  id: string
  type: string
  title: string
  message: string
  read: boolean
  createdAt: string
}

const notifications = ref<Notification[]>([])
const loading = ref(true)

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const notificationStyles: Record<string, { icon: string; bg: string; color: string }> = {
  appointment: { icon: 'lucide:calendar-check', bg: 'bg-lilac-100', color: 'text-lilac-600' },
  appointment_confirmed: { icon: 'lucide:check-circle', bg: 'bg-emerald-100', color: 'text-emerald-600' },
  appointment_cancelled: { icon: 'lucide:x-circle', bg: 'bg-red-100', color: 'text-red-600' },
  reminder: { icon: 'lucide:alarm-clock', bg: 'bg-amber-100', color: 'text-amber-600' },
  review: { icon: 'lucide:star', bg: 'bg-amber-100', color: 'text-amber-600' },
  promotion: { icon: 'lucide:percent', bg: 'bg-rose-100', color: 'text-rose-600' },
  system: { icon: 'lucide:info', bg: 'bg-blue-100', color: 'text-blue-600' },
  favorite: { icon: 'lucide:heart', bg: 'bg-rose-100', color: 'text-rose-600' },
  payment: { icon: 'lucide:credit-card', bg: 'bg-emerald-100', color: 'text-emerald-600' }
}

const getNotificationStyle = (type: string) => {
  return notificationStyles[type] || notificationStyles.system
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHour = Math.floor(diffMs / 3600000)
  const diffDay = Math.floor(diffMs / 86400000)

  if (diffMin < 1) return 'Agora mesmo'
  if (diffMin < 60) return `Ha ${diffMin} min`
  if (diffHour < 24) return `Ha ${diffHour}h`
  if (diffDay < 7) return `Ha ${diffDay} dia${diffDay > 1 ? 's' : ''}`
  return date.toLocaleDateString('pt-BR')
}

const fetchNotifications = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/notifications', {
      headers: authHeaders.value
    }) as any

    notifications.value = response.data || response.notifications || []
  } catch (error) {
    console.error('Erro ao buscar notificacoes:', error)
  } finally {
    loading.value = false
  }
}

const markAllAsRead = async () => {
  try {
    await $fetch('/api/notifications/read-all', {
      method: 'POST',
      headers: authHeaders.value
    })

    notifications.value = notifications.value.map(n => ({ ...n, read: true }))
  } catch (error) {
    console.error('Erro ao marcar notificacoes:', error)
  }
}

onMounted(() => {
  fetchNotifications()
})
</script>
