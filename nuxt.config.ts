// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      title: 'Duas auf Arabisch, Deutsch und in Umschrift',
      titleTemplate: '%s | An-Nur',
      link: [
        // Browser-Tab: Stern (A); Homescreen/App: ن im Stern (C)
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#f4f3ee', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0d1424', media: '(prefers-color-scheme: dark)' },
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
