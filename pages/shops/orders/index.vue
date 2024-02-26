<script setup>

import axios from 'axios'
import { useAuthStore } from '~/store/auth.module'

const auth = useAuthStore()

useHead({
  title: 'Commandes'
})

const orders = ref([])

onMounted(async () => {
  const response = await fetch(`http://localhost:8080/orders?shop=${auth.user.id}`, {
    watch: [orders]
  })
  orders.value = await response.json()
})

definePageMeta({
  layout: 'side',
  middleware: ['auth']
})

const accept = (id) => {
  axios.put(`http://localhost:8080/orders/${id}?status=Acceptée`)
}

const decline = (id) => {
  axios.put(`http://localhost:8080/orders/${id}?status=Rejetée`)
}

const end = (id) => {
  axios.put(`http://localhost:8080/orders/${id}?status=Terminée`)
}

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

let nb = ref(0)
let total = ref(0)
const change = (id, tt) => {
  nb = id
  total = tt
  console.log('clicked')
}

</script>

<template>
  <div class="p-4 sm:ml-64">
    <!-- Main Content Here -->
    <div class="w-full md:w-3/5">
      <div class="flex justify-between">
        <h1 class="p-5 text-2xl font-bold text-gray-dark">
          Gestion des commandes
        </h1>
      </div>

      <div v-if="orders" class="p-5 relative overflow-x-auto sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray dark:text-gray-400">
          <thead class="text-sm text-gray-dark uppercase dark:bg-gray-light dark:text-gray-dark">
            <tr>
              <th scope="col" class="px-4 py-3">
                Date
              </th>
              <th scope="col" class="px-4 py-3">
                Numéro de commande
              </th>
              <th scope="col" class="px-4 py-3">
                Client
              </th>
              <th scope="col" class="px-4 py-3">
                Total
              </th>
              <th scope="col" class="px-4 py-3">
                Statut
              </th>
              <th scope="col" class="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              class="border-b dark:border-gray-400 hover:cursor-pointer hover:bg-gray-light dark:hover:bg-gray-light"
              @click="change(order.id, order.total)"
            >
              <th class="px-4 py-3 text-gray-dark font-normal">
                {{ formatDate(new Date(order.validationDate)) }}
              </th>
              <td class="px-4 py-3 text-gray-dark">
                {{ order.id }}
              </td>
              <td class="px-4 py-3 text-gray-dark">
                {{ order.client.firstName }} {{ order.client.lastName }}
              </td>
              <td class="px-4 py-3 text-gray-dark">
                {{ order.total }} €
              </td>
              <td class="px-4 py-3 text-gray-dark">
                {{ order.status }}
              </td>
              <td v-if="order.status === 'En cours' " class="px-4 py-3">
                <button
                  class="w-fit text-green font-bold hover:text-green-dark text-center"
                  @click="accept(order.id)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button
                  class="w-fit text-red font-bold hover:text-red-dark text-center"
                  @click="decline(order.id)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                  </svg>
                </button>
              </td>
              <td v-else-if="order.status === 'Acceptée' " class="px-4 py-3 space-x-2.5">
                <button
                  class="w-fit text-white font-semibold bg-green hover:bg-green-dark rounded-lg px-5 py-2.5 text-center dark:bg-green dark:hover:bg-green-dark"
                  @click="end(order.id)"
                >
                  Terminer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        Pas de commandes en cours
      </div>
    </div>
    <!-- Order Content Here -->
    <div class="fixed top-0 right-0 z-0 w-1/3 max-w-auto h-full pt-5 transition-transform -translate-x-full sm:translate-x-0">
      <OrderModal :id="nb" :key="nb" :total="total" />
    </div>
  </div>
</template>
