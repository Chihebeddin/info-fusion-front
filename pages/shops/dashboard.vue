<script setup>

useHead({
  title: 'Dashboard'
})

definePageMeta({
  layout: 'side',
  middleware: ['auth']
})

</script>

<template>
  <div class="p-4 sm:ml-64">
    <!-- Sidebar Content Here -->
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4 ">
      <h1 class="p-5 text-2xl font-bold text-gray-dark">
        Gestion du commerce
      </h1>
    </div>
  </div>
</template>
