<script setup>

useHead({
  title: 'Notifications'
})

definePageMeta({
  layout: 'side',
  middleware: ['auth']
})

</script>

<template>
  <div class="p-4 sm:ml-64">
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4">
      <h1 class="bg-emerald-700 p-5 text-2xl font-bold text-gray-dark">
        Notifications
      </h1>
    </div>
  </div>
</template>
