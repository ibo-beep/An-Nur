<template>
  <section class="mx-auto max-w-6xl px-4 pt-10 pb-16">
    <div class="mb-8 flex flex-col gap-2">
      <span class="font-arabic text-[26px] text-gold" lang="ar" dir="rtl">ليلة القدر</span>
      <h1 class="font-head text-3xl md:text-4xl">Laylatul Qadr</h1>
      <p class="max-w-[60ch] text-mute">Die Texte für die drei Nächte der Bestimmung, in der Reihenfolge zum Lesen.</p>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <div
        v-for="(category, catIndex) in duaCategories"
        :key="catIndex"
        class="rounded-xl border border-line bg-surf p-4"
      >
        <h2 class="mb-2 flex items-center gap-2 border-b border-line pb-3 font-head text-xl">
          <Khatam class="h-3.5 w-3.5 text-gold" />{{ category.name }}
        </h2>
        <ol class="flex flex-col">
          <li v-for="(item, itemIndex) in category.links" :key="itemIndex">
            <NuxtLink
              :to="item.url"
              class="flex items-baseline gap-3 rounded border-b border-line/60 px-1.5 py-2.5 text-[14.5px] transition-colors last:border-0 hover:bg-cur"
            >
              <span class="w-5 shrink-0 text-right text-xs tabular-nums text-gold">{{ itemIndex + 1 }}</span>
              <span>{{ item.title }}</span>
            </NuxtLink>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
useHead({ title: 'Laylatul Qadr – Duas für die drei Nächte' })

const duaCategories = [
  {
    name: "Nacht 1",
    links: [
      { title: "Sure al-Qadr", url: "/qadr" },
      { title: "Dua Abu Hamza al-Thumali", url: "/abu_hamza" },
      { title: "Dua Jawshan al Kabeer", url: "/jawshan" },
      { title: "Dua Kumail", url: "/kumail" },
      { title: "Dua al-Iftitah", url: "/iftitah" },
      { title: "Dua Allahumma inni amsaytu", url: "/allahumma" },
      { title: "Bittgebet des Korans", url: "/bittgebet_koran" },
      { title: "Ziyarat Imam al Hussain", url: "/ziyarat_hussain" },{ title: "Ziyarat Ali Al Akbar", url: "/ali_al_akbar" },
      { title: "Ziyarat Shohadaa Karbala", url: "/shohadaa" },
      { title: "Ziyarat Abu Fadl Abbas", url: "/abal_fadl" },
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
      { title: "Dua al-Iftitah", url: "/iftitah" },
      { title: "Dua Allahumma inni amsaytu", url: "/allahumma" },
      { title: "Bittgebet des Korans", url: "/bittgebet_koran" },
      { title: "Ziyarat Imam al Hussain a.s.", url: "/ziyarat_hussain" },
      { title: "Ziyarat Imam Ali a.s.", url: "/ziyarat_ali" },
      { title: "Ziyarat Ali Al Akbar", url: "/ali_al_akbar" },
      { title: "Ziyarat Shohadaa Karbala", url: "/shohadaa" },
      { title: "Ziyarat Abu Fadl Abbas", url: "/abal_fadl" },
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
