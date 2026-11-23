<script setup lang="ts">
import { Sun, Moon, SunMoon } from 'lucide-vue-next'

const colorMode = useColorMode()

const options = [
  { value: 'light', label: 'Tag', title: 'Tag-Design (Lapis & Gold)', icon: Sun },
  { value: 'dark', label: 'Nacht', title: 'Nacht-Design (Nacht & Licht)', icon: Moon },
  { value: 'system', label: 'Auto', title: 'Wie mein Gerät', icon: SunMoon }
] as const
</script>

<template>
  <ClientOnly>
    <div
      role="radiogroup"
      aria-label="Design"
      class="inline-flex items-center gap-0.5 rounded-full border border-line bg-surf p-[3px]"
    >
      <button
        v-for="o in options"
        :key="o.value"
        type="button"
        role="radio"
        :aria-checked="colorMode.preference === o.value"
        :aria-label="o.title"
        :title="o.title"
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors"
        :class="colorMode.preference === o.value ? 'bg-accent text-on-accent' : 'text-mute hover:text-ink'"
        @click="colorMode.preference = o.value"
      >
        <component :is="o.icon" class="h-4 w-4" aria-hidden="true" />
        <span class="hidden sm:inline">{{ o.label }}</span>
      </button>
    </div>
    <template #fallback>
      <div class="h-[34px] w-[108px] sm:w-[196px] rounded-full border border-line bg-surf" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>
