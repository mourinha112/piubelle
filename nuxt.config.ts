// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  devServer: {
    port: 3001
  },

  nitro: {
    preset: 'vercel'
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@vueuse/nuxt'
  ],

  runtimeConfig: {
    // Variáveis privadas (server-side only)
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    jwtSecret: process.env.JWT_SECRET || 'piubelle-secret-key-2026',
    asaasApiKey: process.env.ASAAS_API_KEY || '',
    public: {
      // Variáveis públicas (client-side)
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_ANON_KEY || ''
    }
  },

  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  ui: {
    icons: ['lucide', 'mdi']
  },

  app: {
    head: {
      title: 'PiuBelle - Gestão de Instituto de Beleza',
      meta: [
        { name: 'description', content: 'Sistema completo para gestão de salões de beleza, manicure e estética' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#fdf2f8' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-12-22'
})
