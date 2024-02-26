<script setup>

import { useAuthStore } from '~/store/auth.module'

const auth = useAuthStore()

useHead({
  title: 'Stock'
})

const products = ref([])
// let message = null

/* onBeforeMount(() => {
  message = localStorage.getItem('success')
  localStorage.removeItem('success')
}) */

onMounted(async () => {
  const response = await fetch(`http://localhost:8080/products/filtered?shop=${auth.user.id}`)
  products.value = await response.json()
})

definePageMeta({
  layout: 'side',
  middleware: ['auth']
})

</script>

<template>
  <div class="p-4 ml-64">
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4">
      <div class="flex justify-between">
        <h1 class="p-5 text-2xl font-bold text-gray-dark">
          Gestion du stock
        </h1>
      </div>

      <div class="p-5 relative overflow-x-auto sm:rounded-lg">
        <MiniCart :items="products" />
      </div>
    </div>
  </div>
</template>
