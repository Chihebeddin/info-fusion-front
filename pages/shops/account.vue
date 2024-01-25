<script setup>

definePageMeta({
  layout: false,
  middleware: ['auth']
})

</script>

<template>
  <div class="p-4 sm:ml-64">
    <!-- Sidebar Content Here -->
    <DefaultSidebar />
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4">
      <h1 class="bg-emerald-700 p-5 text-2xl font-bold text-gray-dark">
        Paramètres du compte
      </h1>
    </div>
  </div>
</template>
