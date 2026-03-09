<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { shiiaEvents } from '~/utils/shiiaEvents'

const currentDate = ref(new Date());
const apiEvents = ref([]);
const isLoading = ref(false);
const selectedDate = ref(null);

// --- NEU: HIJRI OFFSET ---
// 0 = Standard, -1 = Ein Tag zurück, 1 = Ein Tag vor
const hijriOffset = ref(0); 

const fetchCalendarData = async () => {
    isLoading.value = true; 
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth() + 1;
    try {
        // Wir nutzen method=0 (Shia/Jafari) für die Basis-Umrechnung der API
        const response = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${month}/${year}?method=0`);
        const json = await response.json(); 
        if (json.code === 200) apiEvents.value = json.data;
    } catch (error) {
        console.error("API ERROR:", error);
    } finally {
        isLoading.value = false;
    }
};

const daysInMonth = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysCount = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1; 

    const res = [];
    for (let i = 0; i < offset; i++) res.push({ empty: true });

    for (let d = 1; d <= daysCount; d++) {
        const dayData = apiEvents.value[d - 1];
        
        // --- LOGIK FÜR DEN OFFSET ---
        // Wir berechnen den Hijri-Tag basierend auf dem Offset neu
        let hDay = parseInt(dayData?.hijri?.day || 0);
        let hMonth = parseInt(dayData?.hijri?.month?.number || 0);

        if (hijriOffset.value !== 0 && hDay !== 0) {
            hDay += hijriOffset.value;
            // Einfache Korrektur für Monatsübergänge (29/30 Tage)
            if (hDay > 30) { hDay = 1; hMonth++; }
            if (hDay < 1) { hDay = 29; hMonth--; }
        }

        const eventTitle = shiiaEvents[`${hDay}-${hMonth}`] || null;

        res.push({
            day: d,
            empty: false,
            hijri: { ...dayData?.hijri, day: hDay }, // Überschriebener Tag
            events: eventTitle ? [eventTitle] : [],
            isToday: new Date().toDateString() === new Date(year, month, d).toDateString()
        });
    }
    return res; 
});

const selectDay = (item) => {
    selectedDate.value = item;
};

const currentMonthEvents = computed(() => {
  return daysInMonth.value
    .filter(d => !d.empty && d.events.length > 0)
    .map(d => ({ 
        title: d.events[0], 
        gregDay: d.day, 
        hijriDate: `${d.hijri.day} ${d.hijri.month?.en}`
    }));
});

onMounted(fetchCalendarData);
watch(currentDate, fetchCalendarData);

const nextMonth = () => currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
const prevMonth = () => currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
const goToToday = () => currentDate.value = new Date();

const monthDisplayName = computed(() => 
  currentDate.value.toLocaleString('en-US', { month: 'long', year: 'numeric' })
);
</script>

<template>
  <div class="max-w-7xl mx-auto p-4 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-14 bg-gray-50 min-h-screen font-sans">
    
    <div class="lg:col-span-2 text-gray-900">
      <header class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 border-b border-gray-200 pb-6 gap-6">
        <div>
          <h1 class="text-3xl md:text-4xl font-semibold tracking-tight">{{ monthDisplayName }}</h1>
          <div class="flex flex-wrap items-center gap-3 mt-2">
            <p class="text-emerald-600 text-xs md:text-sm uppercase font-bold tracking-widest">
              {{ !isLoading ? daysInMonth.find(d => !d.empty)?.hijri?.month?.en : "Loading..." }}
            </p>
            
            <div class="flex items-center bg-gray-200 rounded-lg px-2 py-1 gap-2 text-[10px] font-bold text-gray-600">
              <span class="hidden xs:inline">HIJRI ADJ:</span>
              <button @click="hijriOffset--" class="hover:text-emerald-600 px-1 font-bold text-sm">-</button>
              <span class="bg-white px-2 rounded text-emerald-700 min-w-[20px] text-center">{{ hijriOffset > 0 ? '+' : '' }}{{ hijriOffset }}</span>
              <button @click="hijriOffset++" class="hover:text-emerald-600 px-1 font-bold text-sm">+</button>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 self-end sm:self-auto">
          <button @click="goToToday" class="px-4 py-2 rounded-full border border-gray-300 hover:border-emerald-600 transition text-xs md:text-sm font-medium">Today</button>
          <div class="flex rounded-full border border-gray-300 overflow-hidden bg-white">
            <button @click="prevMonth" class="px-3 py-2 hover:bg-gray-100 transition">&lt;</button>
            <button @click="nextMonth" class="px-3 py-2 hover:bg-gray-100 transition">&gt;</button>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-7 gap-1.5 md:gap-4">
        <div v-for="d in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :key="d" 
             class="text-center text-[10px] font-bold text-gray-400 uppercase mb-2">
          {{ d }}
        </div>

        <div v-for="(item, idx) in daysInMonth" :key="idx"
          @click="!item.empty && selectDay(item)"
          :class="[
            // Höhe auf Mobile dynamisch (aspect-square), auf Desktop fest (h-28)
            'aspect-square md:h-28 flex flex-col items-center justify-between p-2 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300',
            item.empty ? 'opacity-0 pointer-events-none' : 'bg-white border border-gray-100 shadow-sm hover:border-emerald-500 cursor-pointer',
            selectedDate === item ? 'ring-2 ring-emerald-500 scale-[1.02] z-10' : '',
            item.isToday ? 'border-emerald-600 bg-emerald-50/30' : ''
          ]">
          <template v-if="!item.empty">
            <span :class="['text-sm md:text-lg font-bold', item.isToday ? 'text-emerald-700' : 'text-gray-800']">
              {{ item.day }}
            </span>
            <span class="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase">
              {{ item.hijri?.day }}
            </span>
            <div v-if="item.events.length" 
                 class="w-1.5 h-1.5 md:w-full md:h-[3px] bg-emerald-500 rounded-full shadow-sm">
            </div>
            <div v-else class="h-1.5 md:h-[3px]"></div>
          </template>
        </div>
      </div>
    </div>

    <div class="mt-8 lg:mt-0 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
      <h2 class="text-xs font-black text-gray-400 mb-6 uppercase tracking-[0.2em]">Events this month</h2>
      <div class="space-y-4 md:space-y-6">
        <div v-if="currentMonthEvents.length === 0" class="border border-dashed p-8 text-center text-gray-400 rounded-2xl text-sm italic">
          No major events found.
        </div>
        <div v-for="event in currentMonthEvents" :key="event.title"
             class="group relative bg-gray-50 rounded-2xl p-4 md:p-5 hover:bg-emerald-50 transition-colors cursor-default">
          <div class="absolute left-0 top-3 bottom-3 w-1 bg-emerald-500 rounded-r-full group-hover:w-1.5 transition-all"></div>
          <h3 class="font-bold text-gray-900 leading-tight text-sm md:text-base">{{ event.title }}</h3>
          <p class="text-emerald-600 text-[10px] md:text-[11px] font-bold mt-2 uppercase tracking-wide">
             {{ event.hijriDate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>