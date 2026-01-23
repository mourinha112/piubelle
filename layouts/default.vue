<template>
  <div class="min-h-screen relative">
    <!-- Background Decorations -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="blob-lilac w-[600px] h-[600px] -top-64 -right-64 opacity-30" />
      <div class="blob-rose w-[500px] h-[500px] top-1/2 -left-64 opacity-20" />
      <div class="blob-lilac w-[400px] h-[400px] bottom-0 right-1/4 opacity-20" />
    </div>
    
    <!-- Top Navbar -->
    <AppNavbar />
    
    <!-- Main Content -->
    <main class="flex-1 safe-bottom relative z-10">
      <slot />
    </main>
    
    <!-- Bottom Navigation -->
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
const { init, fetchUser, isAuthenticated } = useAuth()

// Initialize auth state from localStorage
onMounted(async () => {
  init()
  
  // If user has token, fetch fresh user data
  if (isAuthenticated.value) {
    await fetchUser()
  }
})
</script>
