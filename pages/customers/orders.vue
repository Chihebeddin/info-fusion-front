<script>

import axios from 'axios'
import { useAuthStore } from '../../store/auth.module.ts'

export default {
  data () {
    return {
      orders: ref([])
    }
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
      <ClientTabs />
      <div class="mt-8 p-5 mb-4 border border-gray-light rounded-md bg-gray-light shadow dark:bg-gray-light dark:border-gray-light">
        <div v-if="orders.length === 0">
          <p>Pas encore de commmandes</p>
        </div>
        <div v-else class="mt-3 divide-y divider-gray dark:divide-gray-400">
          <ol v-for="order in orders" :key="order.id">
            <li>
              <a href="#" class="items-center block p-3 sm:flex">
                <div class="text-gray-dark dark:text-gray">
                  <div class="text-lg">
                    <span class="text-gray-dark">{{ order.id }}</span>
                  </div>
                  <div class="text-base font-normal">{{ order.status }}</div>
                  <span class="inline-flex items-center text-base">
                    {{ order.total }} € • {{ formatDate(order.validationDate) }}
                  </span>
                </div>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
