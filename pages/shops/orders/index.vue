<script>

import axios from 'axios'
import { useAuthStore } from '~/store/auth.module'

useHead({
  title: 'Commandes'
})

export default {
  data () {
    return {
      auth: useAuthStore(),
      orders: ref([]),
      contents: ref([]),
      total: ref(0)
    }
  },
  mounted () {
    this.getOrders()
  },
  methods: {
    getOrders () {
      axios.get(`http://localhost:8080/orders?shop=${this.auth.user.id}`).then((res) => {
        this.orders = res.data
      })
    },
    accept (id) {
      axios.put(`http://localhost:8080/orders/${id}/accept`)
    },
    decline (id) {
      axios.put(`http://localhost:8080/orders/${id}?status=Rejetée`)
    },
    end (id) {
      axios.put(`http://localhost:8080/orders/${id}/end`)
    },
    formatDate (date) {
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    },
    getContent (orderId, t) {
      this.total = t
      axios.get(`http://localhost:8080/contains/${orderId}`).then((res) => {
        this.contents = res.data
      })
    }
  }
}

definePageMeta({
  layout: 'side',
  middleware: ['auth']
})

</script>

<template>
  <div class="p-4 h-screen bg-gray-light sm:ml-64">
    <!-- Main Content Here -->
    <div class="w-full">
      <div class="flex justify-between">
        <h1 class="p-5 text-2xl font-bold text-gray-dark">
          Gestion des commandes
        </h1>
      </div>

      <div class="p-5 relative sm:rounded-lg">
        <table class="text-sm text-left rtl:text-right text-gray dark:text-gray-400">
          <thead class="text-sm text-gray-dark uppercase bg-gray-400 dark:text-gray-dark">
            <tr>
              <th scope="col" class="px-4 py-3">
                Date
              </th>
              <th scope="col" class="px-4 py-3">
                Numéro de commande
              </th>
              <th scope="col" class="w-40 px-4 py-3">
                Client
              </th>
              <th scope="col" class="px-4 py-3">
                Mode de paiement
              </th>
              <th scope="col" class="text-end w-28 pl-4 pr-1 py-3">
                Total
              </th>
              <th scope="col" class="text-start pr-4 pl-1 py-3">
                Statut
              </th>
              <th scope="col" class="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              class="border-b dark:border-gray-300 hover:cursor-pointer hover:bg-gray-400"
              @click="getContent(order.id, order.total)"
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
                <span class="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-0.5 rounded">
                  {{ order.paymentOption }}
                </span>
              </td>
              <td class="text-end pl-4 pr-1 text-gray-dark">
                {{ order.total.toFixed(2) }} €
              </td>
              <td class="text-start pr-4 pl-1 text-gray-dark">
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
                  class="w-fit text-blue-800 font-bold hover:text-blue-900 text-center"
                  @click="end(order.id)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                    <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Order Content Here -->
    <div class="fixed top-0 right-0 z-0 transition-transform -translate-x-full sm:translate-x-0">
      <OrderModal :items="contents" :total="total" />
    </div>
  </div>
</template>
