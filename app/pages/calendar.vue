<script setup>
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { shiiaEvents } from '~/utils/shiiaEvents'

useHead({ title: 'Islamischer Kalender' })

const currentDate = ref(new Date())
const selectedDay = ref(null)

// Korrektur in Tagen: 0 = Standard (Umm al-Qura), -1 = ein Tag zurück, +1 = ein Tag vor.
// Je nach Mondsichtung kann ein Tag Abweichung vorkommen.
const hijriOffset = ref(0)

const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysCount = new Date(year, month + 1, 0).getDate()
  const lead = firstDay === 0 ? 6 : firstDay - 1
  const todayStr = new Date().toDateString()

  const res = []
  for (let i = 0; i < lead; i++) res.push({ empty: true, key: `e${i}` })
  for (let d = 1; d <= daysCount; d++) {
    const date = new Date(year, month, d)
    const hijri = toHijri(date, hijriOffset.value)
    const eventTitle = shiiaEvents[`${hijri.day}-${hijri.month}`] || null
    res.push({
      key: `d${d}`,
      day: d,
      empty: false,
      hijri,
      events: eventTitle ? [eventTitle] : [],
      isToday: todayStr === date.toDateString()
    })
  }
  return res
})

const realDays = computed(() => daysInMonth.value.filter(d => !d.empty))

// Ein gregorianischer Monat umfasst meist zwei Hijri-Monate
const hijriRange = computed(() => {
  const first = realDays.value[0]?.hijri
  const last = realDays.value[realDays.value.length - 1]?.hijri
  if (!first || !last) return ''
  if (first.month === last.month) return `${first.monthName} ${first.year}`
  const y = first.year === last.year ? '' : ` ${first.year}`
  return `${first.monthName}${y} – ${last.monthName} ${last.year}`
})

const currentMonthEvents = computed(() =>
  realDays.value
    .filter(d => d.events.length > 0)
    .map(d => ({
      key: d.key,
      title: d.events[0],
      gregDate: `${d.day}. ${currentDate.value.toLocaleString('de-DE', { month: 'long' })}`,
      hijriDate: `${d.hijri.day}. ${d.hijri.monthName}`
    }))
)

const nextMonth = () => { currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1) }
const prevMonth = () => { currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1) }
const goToToday = () => { currentDate.value = new Date() }

const monthDisplayName = computed(() =>
  currentDate.value.toLocaleString('de-DE', { month: 'long', year: 'numeric' })
)
</script>

<template>
  <ClientOnly>
    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pt-10 pb-16 lg:grid-cols-3 lg:gap-12">
      <div class="lg:col-span-2">
        <header class="mb-8 flex flex-col justify-between gap-5 border-b border-line pb-6 sm:flex-row sm:items-end">
          <div>
            <h1 class="font-head text-3xl md:text-4xl">{{ monthDisplayName }}</h1>
            <div class="mt-2 flex flex-wrap items-center gap-3">
              <p class="text-xs font-semibold uppercase tracking-widest text-gold md:text-sm">{{ hijriRange }}</p>
              <div class="flex items-center gap-1.5 rounded-lg border border-line bg-surf px-2 py-0.5 text-[11px] font-semibold text-mute" title="Falls der Hijri-Tag nach eurer Mondsichtung abweicht">
                <span>Hijri-Korrektur</span>
                <button type="button" class="px-1 text-sm hover:text-ink" aria-label="Einen Tag zurück" @click="hijriOffset--">−</button>
                <span class="min-w-[20px] text-center tabular-nums text-ink">{{ hijriOffset > 0 ? '+' : '' }}{{ hijriOffset }}</span>
                <button type="button" class="px-1 text-sm hover:text-ink" aria-label="Einen Tag vor" @click="hijriOffset++">+</button>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 self-end sm:self-auto">
            <button type="button" class="rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-gold" @click="goToToday">Heute</button>
            <div class="flex overflow-hidden rounded-full border border-line bg-surf">
              <button type="button" class="px-3 py-2 hover:bg-cur" aria-label="Vorheriger Monat" @click="prevMonth"><ChevronLeft class="h-4 w-4" /></button>
              <button type="button" class="px-3 py-2 hover:bg-cur" aria-label="Nächster Monat" @click="nextMonth"><ChevronRight class="h-4 w-4" /></button>
            </div>
          </div>
        </header>

        <div class="grid grid-cols-7 gap-1.5 md:gap-3">
          <div v-for="d in weekdays" :key="d" class="mb-1 text-center text-[11px] font-semibold uppercase text-mute">{{ d }}</div>

          <template v-for="item in daysInMonth" :key="item.key">
            <div v-if="item.empty" aria-hidden="true" />
            <button
              v-else
              type="button"
              class="flex aspect-square flex-col items-center justify-between rounded-xl border p-1.5 transition-colors md:aspect-auto md:h-24 md:p-3"
              :class="[
                item.isToday ? 'border-gold bg-gold-soft' : 'border-line bg-surf hover:border-gold',
                selectedDay === item.key ? 'ring-2 ring-gold' : ''
              ]"
              :aria-label="`${item.day}. – ${item.hijri.day}. ${item.hijri.monthName}${item.events.length ? ': ' + item.events[0] : ''}`"
              @click="selectedDay = item.key"
            >
              <span class="text-sm font-semibold md:text-lg" :class="item.isToday ? 'text-ink' : ''">{{ item.day }}</span>
              <span class="text-[10px] font-semibold tabular-nums text-mute md:text-xs">{{ item.hijri.day }}</span>
              <span v-if="item.events.length" class="h-1.5 w-1.5 rounded-full bg-gold md:h-[3px] md:w-full" />
              <span v-else class="h-1.5 md:h-[3px]" />
            </button>
          </template>
        </div>
      </div>

      <aside class="h-fit rounded-xl border border-line bg-surf p-5 md:p-6">
        <h2 class="mb-5 font-head text-xl">Besondere Tage</h2>
        <div v-if="currentMonthEvents.length === 0" class="rounded-lg border border-dashed border-line p-6 text-center text-sm text-mute">
          In diesem Monat gibt es keine besonderen Tage.
        </div>
        <ul v-else class="flex flex-col gap-3">
          <li
            v-for="event in currentMonthEvents"
            :key="event.key"
            class="rounded-lg border border-line p-4"
            :class="selectedDay === event.key ? 'border-gold bg-gold-soft' : ''"
          >
            <p class="font-semibold leading-snug">{{ event.title }}</p>
            <p class="mt-1.5 text-xs text-mute">{{ event.gregDate }} · <span class="text-gold">{{ event.hijriDate }}</span></p>
          </li>
        </ul>
      </aside>
    </div>

    <template #fallback>
      <div class="mx-auto max-w-6xl px-4 pt-10 pb-16">
        <h1 class="font-head text-3xl md:text-4xl">Kalender</h1>
        <p class="mt-2 text-mute">Kalender wird geladen …</p>
      </div>
    </template>
  </ClientOnly>
</template>
