<script setup lang="ts">
const todayHijri = computed(() => formatHijri(toHijri(new Date())))

const links = [
  { to: '/', label: 'Duas' },
  { to: '/calendar', label: 'Kalender' },
  { to: '/laylatulqadr', label: 'Laylatul Qadr' }
]
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <NuxtLink to="/" class="flex items-center gap-2.5" aria-label="An-Nur, zur Startseite">
          <span class="font-arabic text-[26px] leading-none text-gold" lang="ar">النور</span>
          <span class="font-head text-xl">An-Nur</span>
        </NuxtLink>

        <div class="flex items-center gap-4 md:gap-6">
          <nav aria-label="Hauptmenü" class="hidden md:flex items-center gap-5 text-sm">
            <NuxtLink
              v-for="l in links"
              :key="l.to"
              :to="l.to"
              class="text-mute transition-colors hover:text-ink"
              exact-active-class="!text-ink font-semibold"
            >
              {{ l.label }}
            </NuxtLink>
          </nav>
          <ClientOnly>
            <span class="hidden lg:inline border-l border-line pl-5 text-xs text-mute">{{ todayHijri }}</span>
          </ClientOnly>
          <LookSwitch />
        </div>
      </div>

      <!-- Menü auf dem Handy -->
      <nav aria-label="Hauptmenü mobil" class="flex md:hidden gap-5 overflow-x-auto px-4 pb-2.5 text-sm">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="whitespace-nowrap text-mute"
          exact-active-class="!text-ink font-semibold"
        >
          {{ l.label }}
        </NuxtLink>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-line">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-mute">
        <div class="flex items-center gap-3">
          <span class="font-arabic text-xl text-gold" lang="ar">النور</span>
          <span>Bittgebete zum Lesen und Mitbeten</span>
        </div>
        <nav aria-label="Rechtliches" class="flex gap-5">
          <NuxtLink to="/impressum" class="hover:text-ink">Impressum</NuxtLink>
          <NuxtLink to="/datenschutz" class="hover:text-ink">Datenschutz</NuxtLink>
        </nav>
        <span>© 2026 An-Nur</span>
      </div>
    </footer>
  </div>
</template>
