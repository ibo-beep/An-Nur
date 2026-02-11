<script setup>
import { BookOpen } from 'lucide-vue-next';
</script>


<template>
<nav class="shadow-md bg-[#F8F9F8] p-6 h-20 w-screen">
      <div class=" flex flex-row items-center justify-between">
        <NuxtLink to="/" class="text-green-700 flex flex-row items-center text-2xl font-serif font-bold"> <BookOpen/> An-Nur</NuxtLink>
        <NuxtLink to="/calendar" class="font-serif ps-46 text-xl">Calendar</NuxtLink>
      </div>
   </nav>

   <main class="mt-20">
      <slot />
    </main>

    <div>
          <Footer class=" w-full bg-green-700 text-white py-6">
            <div class="max-w-5xl mx-auto text-center">
              <p class="font-serif">© 2026 An-Nur. All rights reserved.</p>
            </div>

          </Footer>
        </div>

</template>