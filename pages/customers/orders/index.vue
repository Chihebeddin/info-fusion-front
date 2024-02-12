<script>

import axios from 'axios'
import { useAuthStore } from '../../store/auth.module.ts'

export default {
  setup () {
    useHead({
      title: 'Commandes'
    })
  },
  data () {
    return {
      orders: ref([]),
      message: null,
      shop: {}
    }
  },
  beforeMount () {
    this.message = localStorage.getItem('success')
    localStorage.removeItem('success')
  },
  mounted () {
    this.userData()
    this.getOrders()
  },
  methods: {
    async userData () {
      const store = useAuthStore()
      store.init()
      await store.fetchUserInfo()
    },
    async getOrders () {
      const store = await useAuthStore().fetchUserInfo()
      await axios.get(`http://localhost:8080/orders/filtered?client=${store.data.id}`).then((res) => {
        this.orders = res.data
      })
    },
    formatDate (date) {
      const options = { day: 'numeric', month: 'long', year: 'numeric' }
      return new Date(date).toLocaleDateString('fr-FR', options)
    }

  }
}

</script>

<template>
  <div class="p-4 mt-9 sm:ml-64">
    <!-- Main Content Here -->
    <div class="w-full md:w-4/5 px-4 py-8 md:py-12">
      <div v-if="message" id="toast-success" class="mt-1 flex items-center w-full max-w-fit p-4 mb-4 text-gray bg-white rounded-lg shadow" role="alert">
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

      <ClientTabs />
      <div class="mt-8 p-5 mb-4 border border-gray-light rounded-md bg-gray-light shadow dark:bg-gray-light dark:border-gray-light">
        <div v-if="orders.length === 0">
          <p>Pas encore de commandes</p>
        </div>
        <div v-else class="divide-y divider-gray dark:divide-gray-400">
          <ol v-for="order in orders" :key="order.id">
            <li>
              <NuxtLink :to="`/customers/orders/${ order.id }`" class="items-center block p-1 sm:flex">
                <div class="text-gray-dark dark:text-gray">
                  <div class="text-lg">
                    <span class="text-gray-dark">{{ order.id }}</span>
                  </div>
                  <div class="text-base font-normal">
                    {{ order.status }}
                  </div>
                  <span class="inline-flex items-center text-base">
                    {{ order.total }} € • {{ formatDate(order.validationDate) }}
                  </span>
                </div>
              </NuxtLink>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
