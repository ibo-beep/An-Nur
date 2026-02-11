<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
// Falls du Lucide Icons nutzt, stelle sicher, dass BookOpen importiert ist
import { BookOpen } from 'lucide-vue-next'

const router = useRouter()
const searchQuery = ref('')

// Liste deiner Duas - hier einfach neue hinzufügen
const duas = [
  { name: 'Dua Tawassul', id: 'tawassul' },
  { name: 'Dua Kumail', id: 'kumail' },
  { name: 'Dua Al Iftitah', id: 'iftitah' },
  { name: 'Ziyarat Ashura', id: 'ashura' },
  {name: 'Dua Ya Dhal', id: 'ya_dhal'   }
]  

// Filtert die Duas basierend auf der Eingabe
const filteredResults = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return []
  return duas.filter(dua => dua.name.toLowerCase().includes(query))
})

// Navigation bei Klick oder Enter
const goToDua = (id: string) => {
  router.push(`/${id}`)
  searchQuery.value = ''
}
</script>

<template>
  <section class="pt-24 pb-20 px-6">
    <div class="max-w-5xl mx-auto text-center">
      <h1 class="text-5xl font-bold text-green-700 font-serif">Finde deinen Dua</h1>
      <p class="text-gray-500 text-xl pt-8 font-serif">Durchsuchen Sie eine Sammlung von Bittgebeten</p>
      
      <div class="pt-8 w-full flex justify-center relative">
        <div class="w-full max-w-xl relative">
          <input 
            v-model="searchQuery"
            class="text-sm outline-none bg-gray-100 focus:border-green-700 shadow-md w-full rounded-full h-16 text-center border border-gray-300 hover:border-gray-400 placeholder:text-gray-500"
            placeholder="🔎 Suche nach einem Du'a..."
            type="text"
            @keyup.enter="filteredResults[0] && goToDua(filteredResults[0].id)"
          /> 
          
          <div v-if="filteredResults.length > 0" class="absolute w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
            <ul>
              <li v-for="dua in filteredResults" :key="dua.id">
                <button 
                  @click="goToDua(dua.id)"
                  class="w-full text-left px-6 py-4 hover:bg-green-50 text-gray-700 hover:text-green-700 font-medium transition-colors border-b last:border-none"
                >
                  {{ dua.name }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-[#F8F9F8] py-12 pb-44">
    <div class="max-w-8xl">
      <h2 class="text-3xl font-serif font-bold text-center text-green-700 mb-16">Meist gelesene Dua's</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
      <div class="flex flex-col items-center text-center">
        <NuxtLink to="/tawassul" class="h-20 w-20 hover:bg-green-700 bg-[#e9f0e9] rounded-full flex items-center justify-center mb-6 group transition-colors">
          <BookOpen class="group-hover:text-white transition-colors"/> 
        </NuxtLink>
        <h3 class="font-bold font-serif text-black">Dua Tawassul</h3>
      </div>

      <div class="flex flex-col items-center text-center">
        <NuxtLink to="/kumail" class="h-20 w-20 hover:bg-green-700 bg-[#e9f0e9] rounded-full flex items-center justify-center mb-6 group transition-colors">
          <BookOpen class="group-hover:text-white transition-colors"/> 
        </NuxtLink>
        <h3 class="font-bold font-serif text-black">Dua Kumail</h3>
      </div>

      <div class="flex flex-col items-center text-center">
        <NuxtLink to="/iftitah" class="h-20 w-20 hover:bg-green-700 bg-[#e9f0e9] rounded-full flex items-center justify-center mb-6 group transition-colors">
          <BookOpen class="group-hover:text-white transition-colors"/> 
        </NuxtLink>
        <h3 class="font-bold font-serif text-black">Dua Al Iftitah</h3>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: Ein schöner Übergang für das Such-Dropdown */
ul {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>