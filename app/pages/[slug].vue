<script setup lang="ts">
import { munajatContent, ziyarat_ameenallahContent } from '#imports'
import { ref, computed, shallowRef, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const slug = route.params.slug as string

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

// shallowRef verhindert, dass Vue die riesigen Textobjekte unnötig tief beobachtet
const activeDua = shallowRef(allDuas[slug] || allDuas['ahad'])

watch(() => route.params.slug, (newSlug) => {
  activeDua.value = allDuas[newSlug as string] || allDuas['ahad']
})

const activeLang = ref<'العربية' | 'English' | 'Deutsch' | 'Transliteration'>('العربية')
const languages = ['English', 'Deutsch', 'Transliteration', 'العربية'] as const

// Splittet den Text in ein Array für bessere Performance
const formattedTextArray = computed(() => {
  const rawText = activeDua.value.data[activeLang.value] || ''
  return rawText.split('\n').filter((line: string) => line.trim() !== '')
})

const showScrollButton = ref(false)
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => {
  window.addEventListener('scroll', () => {
    showScrollButton.value = window.scrollY > 300
  })
})
</script>

<template>
  <h1 class="text-green-700 font-bold py-6 font-serif text-4xl text-center">
    {{ activeDua.name }}
  </h1>

  <div class="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
    <div class="flex flex-wrap bg-gray-100 p-1 rounded-xl mb-6">
      <button 
        v-for="lang in languages" 
        :key="lang"
        @click="activeLang = lang"
        class="flex-1 min-w-[80px] py-3 text-sm font-semibold font-serif rounded-lg transition-all duration-200"
        :class="activeLang === lang ? 'bg-white shadow text-green-700 scale-[1.02]' : 'text-gray-500 hover:bg-gray-200/50'"
      >
        {{ lang }}
      </button>
    </div>

    <div class="p-4 md:p-10 border border-gray-100 bg-[#fcfdfc] rounded-3xl min-h-[300px]">
      <div class="flex flex-col space-y-6">
  <p 
    v-for="(paragraph, index) in formattedTextArray" 
    :key="activeLang + index" 
    class="dua-paragraph text-center font-serif leading-[2.8rem] text-gray-800 text-3xl"
    :class="activeLang === 'العربية' ? 'font-arabic' : ''"
  >
    {{ paragraph }}
  </p>
</div>
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
        @click="scrollToTop"
        class="fixed bottom-8 right-8 p-4 bg-green-700 text-white rounded-full shadow-2xl hover:bg-green-800 transition-all z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.dua-paragraph {
  /* Hilft dem Browser, Performance zu sparen, indem weit entfernte Elemente ignoriert werden */
  content-visibility: auto;
  contain-intrinsic-size: 50px;
}
.font-arabic {
  direction: rtl;
}
</style>