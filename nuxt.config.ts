// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      title: 'Duas auf Arabisch, Deutsch und in Umschrift',
      titleTemplate: '%s | An-Nur',
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Bittgebete, Ziyarat und Suren auf Arabisch, Deutsch, Englisch und in Umschrift, zum Lesen und Mitbeten.' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  // Design-Umschalter: "light" = Tag (Lapis & Gold), "dark" = Nacht (Nacht & Licht), "system" = Auto
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'annur-look'
  },
  srcDir: 'app/',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
