// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'An-Nur - Dua Sammlung',
      link: [
        
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  modules: ['@nuxtjs/tailwindcss', ],
  srcDir: 'app/',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
