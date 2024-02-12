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
  layout: false,
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

</script>

<template>
  <div class="p-4 sm:ml-64">
    <!-- Sidebar Content Here -->
    <DefaultSidebar />
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4">
      <div class="flex justify-between">
        <h1 class="p-5 text-2xl font-bold text-gray-dark">
          Gestion des commandes
        </h1>
      </div>

      <div v-if="orders" class="relative overflow-x-auto sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray dark:text-gray-400">
          <thead class="text-sm text-gray-dark uppercase dark:bg-gray-light dark:text-gray-dark">
            <tr>
              <th scope="col" class="px-4 py-3">
                Numéro de la commande
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
              <th scope="col" class="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id" class="border-b dark:border-gray-400 hover:bg-gray-light dark:hover:bg-gray-light">
              <NuxtLink :to="`/shops/orders/${ order.id }`">
                <th scope="row" class="px-4 py-3 font-semibold text-gray-dark dark:text-gray-dark">
                  #{{ order.id }}
                </th>
              </NuxtLink>
              <td class="px-4 py-3 text-gray-dark font-semibold">
                {{ order.client.firstName }} {{ order.client.lastName }}
              </td>
              <td class="px-4 py-3 text-gray-dark">
                {{ order.total }} €
              </td>
              <td class="px-4 py-3 text-gray-dark">
                {{ order.status }}
              </td>
              <td v-if="order.status === 'En cours' " class="px-4 py-3 space-x-2.5">
                <button
                  class="w-fit text-white font-semibold bg-green hover:bg-green-dark rounded-lg px-5 py-2.5 text-center dark:bg-green dark:hover:bg-green-dark"
                  @click="accept(order.id)"
                >
                  Accepter
                </button>
                <button
                  class="w-fit text-white font-semibold bg-red hover:bg-red-dark rounded-lg px-5 py-2.5 text-center dark:bg-red dark:hover:bg-red-dark"
                  @click="decline(order.id)"
                >
                  Refuser
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
  </div>
</template>
