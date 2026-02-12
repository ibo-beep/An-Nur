<script setup lang="ts">
import { warithContent } from '~/utils/warith'

const activeLang = ref<'العربية' | 'English' | 'Deutsch' | 'Transliteration'>('العربية')
const languages = ['English', 'Deutsch', 'Transliteration', 'العربية'] as const

// Wir nutzen direkt die importierten Daten
const content = warithContent

const showScrollButton = ref(false)

// Funktion zum Hochscrollen
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Überwache das Scroll-Verhalten
onMounted(() => {
  window.addEventListener('scroll', () => {
    showScrollButton.value = window.scrollY > 300
  })
})
</script>

<template>
    <h1 class="text-green-700 font-bold py-6 font-serif text-4xl text-center">Ziyarah Warith</h1>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
    <div class="flex bg-gray-100 p-1 rounded-xl mb-6">
      <button 
        v-for="lang in languages" 
        :key="lang"
        @click="activeLang = lang"
        class="flex-1 py-3 text-sm font-semibold font-serif rounded-lg transition-all duration-200"
        :class="activeLang === lang ? 'bg-white shadow text-green-700 scale-[1.02]' : 'text-gray-500 hover:bg-gray-200/50'"
      >
        {{ lang }}
      </button>
    </div>

    <div class="p-10 border border-gray-100 bg-[#fcfdfc] rounded-3xl min-h-[300px] flex items-center justify-center">
      <p class="whitespace-pre-line text-center font-serif leading-[3rem] text-gray-800 text-3xl font-arabic">
        
        {{ content[activeLang] }}
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
        @click="scrollToTop"
        class="fixed bottom-8 right-8 p-4 bg-green-700 text-white rounded-full shadow-2xl hover:bg-green-800 transition-all active:scale-95 z-50 flex items-center justify-center"
        aria-label="Nach oben scrollen"
>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>
</Transition>
  </div>
</template>