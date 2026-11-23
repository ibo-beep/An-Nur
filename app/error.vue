<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>()
const is404 = computed(() => props.error?.statusCode === 404)

useHead({ title: is404.value ? 'Seite nicht gefunden' : 'Fehler' })
</script>

<template>
  <NuxtLayout>
    <section class="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <Khatam class="h-8 w-8 text-gold" />
      <h1 class="font-head text-3xl md:text-4xl">
        {{ is404 ? 'Diese Seite gibt es nicht' : 'Etwas ist schiefgelaufen' }}
      </h1>
      <p class="text-mute">
        {{ is404
          ? 'Vielleicht ist die Adresse falsch geschrieben. Auf der Startseite findest du alle Duas, Ziyarat und Suren.'
          : 'Bitte lade die Seite neu oder versuche es später noch einmal.' }}
      </p>
      <button
        type="button"
        class="mt-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent"
        @click="clearError({ redirect: '/' })"
      >
        Zur Startseite
      </button>
    </section>
  </NuxtLayout>
</template>
