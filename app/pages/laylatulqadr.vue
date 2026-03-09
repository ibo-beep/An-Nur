<template>
  <div class="flex text-center align-center mx-auto flex-row">
    <div 
      v-for="(category, catIndex) in duaCategories" 
      :key="catIndex"
      class="bg-white p-12 rounded-4xl shadow-sm border border-gray-200 w-full"
    >
      <h2 class="text-lg font-bold text-gray-800 mb-4 border-b pb-4 border-green-300">
        {{ category.name }}
      </h2>

      <div class="">
        <NuxtLink 
          v-for="(item, itemIndex) in category.links" 
          :key="itemIndex"
          :to="item.url"
          class="block p-3 bg-gray-50 hover:bg-gray-300 transition-colors rounded-lg border-l-4 border-green-600 text-gray-700 text-sm font-bold"
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
      { title: "Dua Abu Hamza al-Thumali", url: "/abu_hamza" },  
      { title: "Dua Jawshan al Kabeer", url: "/jawshan" },
      { title: "Dua Kumail", url: "/kumail" },
      { title: "Dua Allahumma inni amsaytu", url: "/allahumma" },
      { title: "Bittgebet des Korans", url: "/bittgebet_koran" },
      { title: "Ziyarat Imam al Hussain", url: "/ziyarat_hussain" },
      { title: "Ziyarat Ashura", url: "/ashura" },
      
      
    ]
  },
  {
    name: "Nacht 2",
    links: [
      { title: "Sure al-Qadr", url: "/qadr" },
      { title: "Dua Abu Hamza al-Thumali", url: "/abu_hamza" },  
      { title: "Dua Jawshan al Kabeer", url: "/jawshan" },
      { title: "Dua Kumail", url: "/kumail" },
      { title: "Dua Allahumma inni amsaytu", url: "/allahumma" },
      { title: "Bittgebet des Korans", url: "/bittgebet_koran" },
      { title: "Ziyarat Imam al Hussain a.s.", url: "/ziyarat_hussain" },
      { title: "Ziyarat Imam Ali a.s.", url: "/ziyarat_ali" },
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
        { title: "Dua Imam Sajjad a.s.", url: "/dua_sajjad" },
      { title: "Dua Abu Hamza al-Thumali", url: "/abu_hamza" },  
      { title: "Dua Jawshan al Kabeer", url: "/jawshan" },
      { title: "Dua Kumail", url: "/kumail" },
      { title: "Dua Allahumma inni amsaytu", url: "/allahumma" },
      { title: "Bittgebet des Korans", url: "/bittgebet_koran" },
      { title: "Ziyarat Ali Al Akbar", url: "/ali_al_akbar" },
      { title: "Ziyarat Shohadaa Karbala", url: "/shohadaa" },
      { title: "Ziyarat Abu Fadl Abbas", url: "/abal_fadl" },
      { title: "Ziyarat Imam al Hussain", url: "/ziyarat_hussain" },
      { title: "Ziyarat Ashura", url: "/ashura" },
    ]
  }
]
</script>