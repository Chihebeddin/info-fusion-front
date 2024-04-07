<script setup>
import { useAuthStore } from '~/store/auth.module'

const auth = useAuthStore()

useHead({
  title: 'Produits'
})

const products = ref([])
let message = null

onBeforeMount(() => {
  message = localStorage.getItem('success')
  localStorage.removeItem('success')
})

onMounted(() => {
  getProducts()
  console.log('user : ', auth.user)
})

const getProducts = async () => {
  const response = await fetch(`https://info-fusion-back-mr2ieedmfa-od.a.run.app/products/filtered?shop=${auth.user.id}`, {
    watch: [products]
  })
  products.value = await response.json()
}

definePageMeta({
  layout: 'side',
  middleware: ['auth']
})

</script>

<template>
  <div class="p-4 h-screen ml-64 bg-gray-light">
    <!-- Main Content Here -->
    <div class="w-full">
      <div v-if="message" id="toast-success" class="flex items-center w-full max-w-fit p-4 mb-4 text-gray bg-white rounded-lg shadow" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green bg-green-light rounded-lg dark:bg-green-light dark:text-green">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">
          {{ message }}
        </div>
        <button
          id="close"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>
      <div class="flex justify-between">
        <h1 class="p-5 text-2xl font-bold text-gray-dark">
          Gestion des produits
        </h1>
      </div>

      <div class="p-5">
        <DataTable :items="products" />
      </div>
    </div>
  </div>
</template>
