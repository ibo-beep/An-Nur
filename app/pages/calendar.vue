<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const currentDate = ref(new Date());
const apiEvents = ref([]);
const isLoading = ref(false);

const fetchCalendarData = async () => {
    isLoading.value = true; 
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth() + 1;

    try {
        const response = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${month}/${year}?method=0`);
        const json = await response.json(); 

        if (json.code === 200) {
            apiEvents.value = json.data;
        }
    } catch (error) {
        console.error("API ERROR:", error);
    } finally {
        isLoading.value = false;
    }
};

const daysInMonth = computed (() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysCount = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1; 

    const res = [];
    for (let i = 0; i < offset; i++) res.push({ empty: true });

    for (let d = 1; d <= daysCount; d++) {
        const dayData = apiEvents.value[d - 1];

        res.push({
            day: d,
            empty: false,
            hijri: dayData?.hijri || {},
            events: dayData?.hijri?.holidays || [],
            isToday: new Date().toDateString() === new Date(year, month, d).toDateString()
        });
    }
    return res; 
});

const hijriMonthDisplay = computed(() => {
  const validDays = daysInMonth.value.filter(d => !d.empty && d.hijri && d.hijri.month);
  if (validDays.length === 0) return "Loading...";

  const firstMonth = validDays[0].hijri.month.en;
  const lastMonth = validDays[validDays.length - 1].hijri.month.en;

  return firstMonth === lastMonth ? firstMonth : `${firstMonth} - ${lastMonth}`;
});

const currentMonthEvents = computed(() => {
  const allEvents = daysInMonth.value
    .filter(d => !d.empty && d.events && d.events.length > 0)
    .flatMap(d => d.events.map(eventName => ({ 
        title: eventName, 
        gregDay: d.day, 
        hijriDate: d.hijri.date,
    })));

  // 🔥 Duplikate entfernen
  const uniqueMap = new Map();

  allEvents.forEach(event => {
    if (!uniqueMap.has(event.title)) {
      uniqueMap.set(event.title, event);
    }
  });

  return Array.from(uniqueMap.values());
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
  <div class="max-w-7xl mx-auto p-10 grid grid-cols-1 lg:grid-cols-3 gap-14 bg-gray-50 min-h-screen">
    
    <!-- CALENDAR -->
    <div class="lg:col-span-2 text-gray-900">
      
      <header class="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
        <div>
          <h1 class="text-4xl font-semibold tracking-tight text-gray-900">
            {{ monthDisplayName }}
          </h1>
          
          <p v-if="!isLoading" 
             class="text-emerald-600 mt-2 text-sm tracking-wide uppercase font-semibold">
            {{ hijriMonthDisplay }} {{ daysInMonth.find(d => !d.empty)?.hijri?.year }}
          </p>

          <p v-else class="text-gray-400 mt-2 text-sm animate-pulse">
            Loading Hijri data...
          </p>
        </div>

        <div class="flex items-center gap-4">
          <button @click="goToToday" 
            class="px-5 py-2 rounded-full border border-gray-300 text-sm font-medium 
                   hover:border-emerald-600 hover:text-emerald-600 transition">
            Today
          </button>

          <div class="flex rounded-full border border-gray-300 overflow-hidden text-lg">
            <button @click="prevMonth" 
              class="px-4 py-2 hover:bg-gray-100 transition">
              &lt;
            </button>
            <button @click="nextMonth" 
              class="px-4 py-2 hover:bg-gray-100 transition">
              &gt;
            </button>
          </div>
        </div>
      </header>

      <!-- Weekdays -->
      <div class="grid grid-cols-7 mb-6 text-gray-400 text-xs uppercase tracking-[0.2em] text-center">
        <div v-for="d in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="d">
          {{ d }}
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-4">
        <div v-for="(item, idx) in daysInMonth" :key="idx"
          :class="[
            'h-28 flex flex-col items-center justify-between p-4 rounded-2xl transition-all duration-200',
            item.empty ? 'opacity-0 pointer-events-none' : 
            'bg-white border border-gray-200 hover:border-emerald-500 hover:shadow-sm cursor-pointer',
            item.isToday ? 'border-emerald-600 ring-1 ring-emerald-600' : ''
          ]">

          <template v-if="!item.empty">
            <span 
              :class="[
                'text-lg font-semibold',
                item.isToday ? 'text-emerald-600' : 'text-gray-800'
              ]">
              {{ item.day }}
            </span>

            <span class="text-[10px] text-gray-400 font-medium tracking-wide">
              H {{ item.hijri?.day }}
            </span>

            <div v-if="item.events.length"
                 class="w-full h-[2px] bg-emerald-500 mt-3 rounded-full">
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- EVENTS SIDEBAR -->
    <div>
      <h2 class="text-xl font-semibold text-gray-900 mb-8 tracking-wide uppercase">
        Upcoming
      </h2>

      <div class="space-y-6">

        <div v-if="currentMonthEvents.length === 0 && !isLoading"
             class="border border-dashed border-gray-300 p-10 text-center text-gray-400 rounded-2xl">
          No major events this month.
        </div>

        <div v-for="event in currentMonthEvents" :key="event.title"
             class="relative bg-white border border-gray-200 rounded-2xl p-6 
                    hover:border-emerald-500 hover:shadow-sm transition">

          <!-- Signature Vertical Line -->
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600 rounded-l-2xl"></div>

          <div class="pl-4">
            <h3 class="font-semibold text-gray-900 text-lg">
              {{ event.title }}
            </h3>

            <p class="text-gray-500 text-sm mt-2 tracking-wide">
              {{ monthDisplayName.split(' ')[0] }} {{ event.gregDay }} 
              / {{ event.hijriDate }}
            </p>

            <button class="mt-4 text-xs uppercase tracking-widest 
                           text-emerald-600 hover:underline">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>