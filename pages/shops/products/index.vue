<script setup>
import { useAuthStore } from '~/store/auth.module'

const auth = useAuthStore()

useHead({
  title: 'Produits'
})

const products = ref([])

onMounted(async () => {
  const response = await fetch(`http://localhost:8080/products/filtered?shop=${auth.user.id}`)
  products.value = await response.json()
})

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
      <div class="flex justify-between">
        <h1 class="p-5 text-2xl font-bold text-gray-dark">
          Gestion des produits
        </h1>
      </div>

      <div class="relative overflow-x-auto sm:rounded-lg">
        <DataTable :items="products" />
      </div>
    </div>
  </div>
</template>
