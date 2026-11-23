<script setup lang="ts">
import type { DuaEntry } from '~/utils/duaIndex'

useHead({ title: 'An-Nur – Duas auf Arabisch, Deutsch und in Umschrift', titleTemplate: null })

const router = useRouter()
const searchQuery = ref('')

const hits = computed(() => {
  const q = normalizeSearch(searchQuery.value)
  if (!q) return duaIndex
  return duaIndex.filter(d => normalizeSearch(`${d.name} ${d.alt ?? ''} ${d.ar ?? ''}`).includes(q))
})

const groups = computed(() =>
  duaGroups
    .map(g => ({ name: g, items: hits.value.filter(d => d.group === g) }))
    .filter(g => g.items.length > 0)
)

// Duas links, Ziyarat und Suren rechts
const leftGroups = computed(() => groups.value.filter(g => g.name === 'Duas'))
const rightGroups = computed(() => groups.value.filter(g => g.name !== 'Duas'))

const popular = popularDuaIds
  .map(id => duaIndex.find(d => d.id === id))
  .filter((d): d is DuaEntry => Boolean(d))

const openFirstHit = () => {
  const first = hits.value[0]
  if (searchQuery.value.trim() && first) router.push(`/${first.id}`)
}
</script>

<template>
  <div>
    <!-- Kopfbereich mit Rahmen wie auf einer Handschrift-Titelseite -->
    <section class="hero px-4 pt-12 pb-10 md:pt-16">
      <div class="mx-auto flex max-w-6xl justify-center">
        <div class="frame relative flex w-full max-w-[640px] flex-col items-center gap-4 px-5 py-9 text-center md:px-8">
          <Khatam class="corner -left-[9px] -top-[9px]" />
          <Khatam class="corner -right-[9px] -top-[9px]" />
          <Khatam class="corner -bottom-[9px] -left-[9px]" />
          <Khatam class="corner -bottom-[9px] -right-[9px]" />

          <span class="font-arabic text-[44px] leading-tight text-link md:text-6xl dark:text-gold" lang="ar">النور</span>
          <h1 class="font-head text-3xl leading-tight md:text-[40px]">Finde dein Dua</h1>
          <p class="max-w-[42ch] text-mute">Bittgebete, Ziyarat und Suren auf Arabisch, Deutsch und in Umschrift, zum Lesen und Mitbeten.</p>

          <label
            for="dua-search"
            class="flex w-full max-w-[480px] items-center gap-2 rounded-[10px] border border-line bg-surf py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-gold"
          >
            <span class="sr-only">Dua suchen</span>
            <input
              id="dua-search"
              v-model="searchQuery"
              type="search"
              autocomplete="off"
              placeholder="Dua suchen, z. B. Kumail"
              class="min-w-0 flex-1 bg-transparent py-1.5 text-[15px] text-ink outline-none placeholder:text-mute"
              @keyup.enter="openFirstHit"
            >
            <span v-if="searchQuery.trim()" class="whitespace-nowrap pr-2 text-xs tabular-nums text-mute">
              {{ hits.length }} Treffer
            </span>
          </label>

          <p class="text-sm text-mute">
            Oft gelesen:
            <template v-for="(d, i) in popular" :key="d.id">
              <NuxtLink :to="`/${d.id}`" class="font-semibold text-link hover:underline">{{ d.name.replace('Dua ', '') }}</NuxtLink><span v-if="i < popular.length - 1"> · </span>
            </template>
          </p>
        </div>
      </div>
    </section>

    <!-- Inhaltsverzeichnis wie in einem Gebetbuch -->
    <section class="px-4 pb-16" aria-label="Alle Texte">
      <div v-if="hits.length === 0" class="mx-auto max-w-6xl py-6 text-mute">
        Kein Dua zu <b class="text-ink">„{{ searchQuery }}“</b> gefunden. Versuche eine andere Schreibweise, z. B. „Kumayl“ statt „Kumail“.
      </div>

      <div v-else class="mx-auto grid max-w-6xl gap-x-12 gap-y-8 md:grid-cols-2">
        <div v-for="(col, ci) in [leftGroups, rightGroups]" :key="ci" class="flex flex-col gap-8">
          <div v-for="g in col" :key="g.name">
            <h2 class="mb-1.5 flex items-center gap-2 font-head text-xl">
              <Khatam class="h-3.5 w-3.5 text-gold" />{{ g.name }}
            </h2>
            <NuxtLink
              v-for="d in g.items"
              :key="d.id"
              :to="`/${d.id}`"
              class="grid grid-cols-[auto_minmax(12px,1fr)_auto] items-baseline gap-2.5 rounded border-b border-line px-1.5 py-2.5 transition-colors hover:bg-cur"
            >
              <span class="text-[15px] font-medium">{{ d.name }}</span>
              <span class="-translate-y-1 border-b border-dotted border-mute/50" aria-hidden="true" />
              <span v-if="d.ar" class="font-arabic text-xl text-link dark:text-gold" lang="ar" dir="rtl">{{ d.ar }}</span>
              <span v-else />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background: radial-gradient(ellipse 60% 100% at 50% -25%, var(--glow), rgba(0, 0, 0, 0) 70%);
}
.frame {
  border: 1px solid rgb(var(--c-gold) / 0.8);
  outline: 1px solid rgb(var(--c-gold) / 0.8);
  outline-offset: 4px;
}
.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  color: rgb(var(--c-gold));
  background: rgb(var(--c-bg));
}
</style>
