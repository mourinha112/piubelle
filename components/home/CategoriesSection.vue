<template>
  <section class="py-8">
    <div class="container-app">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="font-display text-2xl font-semibold text-gray-800 heading-fancy">
            Serviços
          </h2>
          <p class="text-sm text-gray-500 mt-2">O que você procura hoje?</p>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-4 md:grid-cols-8 gap-4">
        <button 
          v-for="category in categories" 
          :key="category.id"
          class="category-item group"
          @click="selectCategory(category.id)"
        >
          <div 
            class="category-icon"
            :style="{ background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}08 100%)` }"
          >
            <Icon :name="category.icon" class="w-7 h-7" :style="{ color: category.color }" />
          </div>
          <span class="text-xs text-gray-600 group-hover:text-gray-800 transition-colors text-center leading-tight mt-3 font-medium">
            {{ category.name }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const categories = [
  { id: 'hair', name: 'Cabelo', icon: 'lucide:scissors', color: '#a855f7' },
  { id: 'nails', name: 'Unhas', icon: 'lucide:hand', color: '#ec4899' },
  { id: 'makeup', name: 'Maquiagem', icon: 'lucide:palette', color: '#f472b6' },
  { id: 'skincare', name: 'Estética', icon: 'lucide:sparkles', color: '#06b6d4' },
  { id: 'eyebrows', name: 'Sobrancelha', icon: 'lucide:eye', color: '#8b5cf6' },
  { id: 'spa', name: 'Spa', icon: 'lucide:leaf', color: '#10b981' },
  { id: 'massage', name: 'Massagem', icon: 'lucide:heart', color: '#f97316' },
  { id: 'more', name: 'Mais', icon: 'lucide:grid-3x3', color: '#6b7280' }
]

const emit = defineEmits<{
  (e: 'select', categoryId: string): void
}>()

const selectCategory = (id: string) => {
  emit('select', id)
}
</script>

<style scoped>
.category-item {
  @apply flex flex-col items-center p-3 rounded-2xl transition-all duration-300;
}

.category-item:hover {
  @apply bg-gradient-to-b from-lilac-50/50 to-rose-50/50;
}

.category-icon {
  @apply w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 border border-transparent;
}

.category-item:hover .category-icon {
  @apply scale-110;
  border-color: currentColor;
  border-opacity: 0.2;
}
</style>
