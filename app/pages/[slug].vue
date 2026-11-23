<script setup lang="ts">
import { munajatContent, ziyarat_ameenallahContent } from '#imports'
import { ArrowUp } from 'lucide-vue-next'

const route = useRoute()

// Mapping der Inhalte
const allDuas: Record<string, any> = {
  'ahad': { name: 'Dua Ahad', data: ahadContent },
  'iftitah': { name: 'Dua Iftitah', data: iftitahContent },
  'abu_hamza': { name: 'Dua Abu Hamza Al Thumali', data: abu_hamzaContent },
  'an_taj´ala': { name: 'Dua An Taj`ala', data: an_tajalaContent },
  'ashura': { name: 'Ziyarat Ashura', data: ashuraContent },
  'jawshan': { name: 'Dua Jawshan al Kabeer', data: jawshanContent },
  'kumail': { name: 'Dua Kumail', data: kumailContent },
  'tawassul': { name: 'Dua Tawassul', data: tawassulContent },
  'warith': { name: 'Ziyarat Warith', data: warithContent },
  'ya_dhal': { name: 'Dua Ya Dhal', data: ya_dhalContent },
  'hadha_shahr': { name: 'Dua Hadha Shahr Ramadan', data: hadha_shahrContent },
  'ziyarat_ale': { name: 'Ziyarat Aal e Yaseen', data: ziyarat_aleContent },
  'ziyarat_hussain': { name: 'Ziyarat Imam al Hussain an Qadr', data: ziyarat_hussainContent },
  'ziyarat_ali': { name: 'Ziyarat Imam Ali an 21. Ramadan', data: ziyarat_aliContent },
  'allahumma': { name: 'Dua Allahumma inni amsaytu', data: allahummaContent },
  'dua_sajjad': { name: 'Dua Imam Al Sajjad as.', data: dua_sajjadContent },
  'al_ankabut': { name: 'Sure Al-Ankabut', data: al_ankabutContent },
  'al_room': { name: 'Sure Al-Rum', data: al_roomContent },
  'ad_dukhan': { name: 'Sure Ad-Dukhan', data: ad_dukhanContent },
  'qadr': { name: 'Sure Al-Qadr', data: qadrContent },
  'bittgebet_koran': { name: 'Das Bittgebet des Quran', data: bittgebet_koranContent },
  'ali_al_akbar': { name: 'Ziyarat Ali Al Akbar', data: ali_al_akbarContent },
  'shohadaa': { name: 'Ziyarat Shohadaa Karbala', data: shohadaaContent },
  'abal_fadl': { name: 'Ziyarat Abu al Fadl al Abbas', data: abal_fadlContent },
  'munajat_taibeen': { name: 'Munajat al-Taibeen', data: munajatContent },
  'ziyarat_ameenallah': { name: 'Ziyarat Ameenallah', data: ziyarat_ameenallahContent },
}

const slug = computed(() => String(route.params.slug))

// Unbekannte Adresse: echte 404-Seite statt eines falschen Duas
if (!allDuas[slug.value]) {
  throw createError({ statusCode: 404, statusMessage: 'Dua nicht gefunden', fatal: true })
}
watch(slug, (s) => {
  if (!allDuas[s]) showError({ statusCode: 404, statusMessage: 'Dua nicht gefunden' })
})

const activeDua = computed(() => allDuas[slug.value])
const entry = computed(() => duaIndex.find(d => d.id === slug.value))
const title = computed(() => entry.value?.name ?? activeDua.value?.name ?? 'Dua')
const groupLabel = computed(() => entry.value?.group ?? 'Duas')

useSeoMeta({
  title: () => `${title.value} – Arabisch, Deutsch & Umschrift`,
  description: () => `${title.value} auf Arabisch, Deutsch, Englisch und in Umschrift lesen und mitbeten.`,
  ogTitle: () => `${title.value} | An-Nur`,
  ogDescription: () => `${title.value} auf Arabisch, Deutsch, Englisch und in Umschrift.`
})

type Lang = 'العربية' | 'Deutsch' | 'English' | 'Transliteration'
const languages: { key: Lang; label: string }[] = [
  { key: 'العربية', label: 'عربي' },
  { key: 'Deutsch', label: 'Deutsch' },
  { key: 'English', label: 'English' },
  { key: 'Transliteration', label: 'Umschrift' }
]
const activeLang = ref<Lang>('العربية')
const isArabic = computed(() => activeLang.value === 'العربية')

// Teilt den Text in Zeilen
const lines = computed<string[]>(() => {
  const raw: string = activeDua.value?.data?.[activeLang.value] || ''
  return raw.split('\n').filter((line: string) => line.trim() !== '')
})

// Schriftgröße (Stufe 0 = Standard)
const sizeStep = ref(0)
const changeSize = (d: number) => { sizeStep.value = Math.max(-2, Math.min(4, sizeStep.value + d)) }
const textStyle = computed(() => {
  const base = isArabic.value ? 30 : 19
  const step = isArabic.value ? 3 : 2
  return { fontSize: `${base + sizeStep.value * step}px` }
})

const showScrollButton = ref(false)
const onScroll = () => { showScrollButton.value = window.scrollY > 300 }
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <article class="mx-auto flex max-w-3xl flex-col gap-3 px-4 pt-8 pb-16">
    <NuxtLink to="/" class="self-start text-sm font-semibold text-link hover:underline">‹ Alle Texte</NuxtLink>
    <span class="text-xs font-semibold uppercase tracking-wider text-mute">{{ groupLabel }}</span>
    <span v-if="entry?.ar" class="font-arabic text-[26px] text-gold" lang="ar" dir="rtl">{{ entry.ar }}</span>
    <h1 class="font-head text-3xl leading-tight md:text-4xl">{{ title }}</h1>

    <!-- Werkzeugleiste bleibt beim Scrollen oben -->
    <div class="sticky top-[60px] md:top-[62px] z-30 mt-3 flex flex-wrap items-center justify-between gap-2 rounded-[10px] border border-line bg-surf p-1.5">
      <div role="tablist" aria-label="Sprache" class="flex flex-wrap gap-0.5">
        <button
          v-for="lang in languages"
          :key="lang.key"
          type="button"
          role="tab"
          :aria-selected="activeLang === lang.key"
          class="rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors"
          :class="[
            activeLang === lang.key ? 'bg-gold-soft text-ink' : 'text-mute hover:text-ink',
            lang.key === 'العربية' ? 'font-arabic text-[15px]' : ''
          ]"
          @click="activeLang = lang.key"
        >
          {{ lang.label }}
        </button>
      </div>
      <div class="flex gap-1">
        <button type="button" class="rounded-md border border-line px-2.5 py-1 text-[13px] font-semibold" aria-label="Schrift kleiner" @click="changeSize(-1)">A−</button>
        <button type="button" class="rounded-md border border-line px-2.5 py-1 text-[13px] font-semibold" aria-label="Schrift größer" @click="changeSize(1)">A+</button>
      </div>
    </div>

    <div role="tabpanel" class="mt-2 flex flex-col">
      <p v-if="lines.length === 0" class="py-10 text-center text-mute">
        Für diesen Text gibt es diese Sprache noch nicht.
      </p>
      <p
        v-for="(line, index) in lines"
        :key="activeLang + index"
        class="dua-line border-b border-line py-4 text-center"
        :class="isArabic ? 'font-arabic leading-[1.9]' : 'leading-relaxed'"
        :style="textStyle"
        :dir="isArabic ? 'rtl' : 'ltr'"
        :lang="isArabic ? 'ar' : activeLang === 'Deutsch' ? 'de' : 'en'"
      >
        {{ line }}
      </p>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-10 opacity-0"
    >
      <button
        v-show="showScrollButton"
        type="button"
        aria-label="Nach oben"
        class="fixed bottom-6 right-6 z-50 rounded-full bg-accent p-3.5 text-on-accent shadow-lg transition-transform hover:-translate-y-0.5"
        @click="scrollToTop"
      >
        <ArrowUp class="h-5 w-5" />
      </button>
    </Transition>
  </article>
</template>

<style scoped>
.dua-line {
  /* Hilft dem Browser, Performance zu sparen, indem weit entfernte Elemente ignoriert werden */
  content-visibility: auto;
  contain-intrinsic-size: 60px;
}
</style>
