<template>
  <div class="flex flex-row flex-nowrap gap-1 p-1 w-full h-screen overflow-hidden">
    
    <div 
      v-for="(category, catIndex) in duaCategories" 
      :key="catIndex"
      class="bg-white p-1 rounded-lg shadow-sm border border-gray-200 w-1/3 flex-shrink-0 flex flex-col"
    >
      <h2 class="text-[10px] md:text-sm font-bold text-gray-800 mb-1 border-b pb-1 border-green-300 text-center truncate">
        {{ category.name }}
      </h2>

      <div class="space-y-0.5 overflow-y-auto">
        <NuxtLink 
          v-for="(item, itemIndex) in category.links" 
          :key="itemIndex"
          :to="item.url"
          class="block p-1.5 bg-gray-50 hover:bg-gray-200 transition-colors rounded border-l-2 border-green-600 text-gray-700 text-[9px] md:text-xs font-bold truncate"
        >
          {{ item.title }}
        </NuxtLink>
      </div>
    </div>
    
  </div>
</template>

<script setup>
const duaCategories = [
  {
    name: "Nacht 1",
    links: [
      { title: "Sure al-Qadr", url: "/qadr" },
      { title: "Dua Abu Hamza", url: "/abu_hamza" },  
      { title: "Dua Jawshan", url: "/jawshan" },
      { title: "Dua Kumail", url: "/kumail" },
      { title: "Dua amsaytu", url: "/allahumma" },
      { title: "Koran-Bittgebet", url: "/bittgebet_koran" },
      { title: "Ziyarat Hussain", url: "/ziyarat_hussain" },
      { title: "Ziyarat Ashura", url: "/ashura" },
    ]
  },
  {
    name: "Nacht 2",
    links: [
      { title: "Sure al-Qadr", url: "/qadr" },
      { title: "Dua Abu Hamza", url: "/abu_hamza" },  
      { title: "Dua Jawshan", url: "/jawshan" },
      { title: "Dua Kumail", url: "/kumail" },
      { title: "Dua amsaytu", url: "/allahumma" },
      { title: "Koran-Bittgebet", url: "/bittgebet_koran" },
      { title: "Ziyarat Hussain", url: "/ziyarat_hussain" },
      { title: "Ziyarat Ali", url: "/ziyarat_ali" },
      { title: "Ziyarat Ashura", url: "/ashura" },
      { title: "Ziyarat Ameenallah", url: "/ziyarat_ameenallah" },
    ]
  },
  {
    name: "Nacht 3",
    links: [
      { title: "Sure al-Ankabut", url: "/al_ankabut" },  
      { title: "Sure al-Room", url: "/al_room" },
      { title: "Sure ad-Dukhan", url: "/ad_dukhan" },
      { title: "Sure al-Qadr", url: "/qadr" },
      { title: "Dua al-Iftitah", url: "/iftitah" },
      { title: "Dua Sajjad", url: "/dua_sajjad" },
      { title: "Dua Abu Hamza", url: "/abu_hamza" },  
      { title: "Dua Jawshan", url: "/jawshan" },
      { title: "Dua Kumail", url: "/kumail" },
      { title: "Dua amsaytu", url: "/allahumma" },
      { title: "Koran-Bittgebet", url: "/bittgebet_koran" },
      { title: "Ziyarat Ali Akbar", url: "/ali_al_akbar" },
      { title: "Ziyarat Shohadaa", url: "/shohadaa" },
      { title: "Ziyarat Abbas", url: "/abal_fadl" },
      { title: "Ziyarat Hussain", url: "/ziyarat_hussain" },
      { title: "Ziyarat Ashura", url: "/ashura" },
    ]
  }
]
</script>