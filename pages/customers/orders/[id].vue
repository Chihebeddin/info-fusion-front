<script>

import { useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '../../../store/auth.module.ts'

export default {
  data () {
    return {
      contents: ref([]),
      orderId: '',
      shop: '',
      total: 0
    }
  },
  mounted () {
    this.orderId = useRoute().params.id
    this.userData()
    this.getContent(this.orderId)
  },
  methods: {
    async userData () {
      const store = useAuthStore()
      store.init()
      await store.fetchUserInfo()
    },
    async getContent (orderId) {
      await axios.get(`http://localhost:8080/contains/${orderId}`).then((res) => {
        this.contents = res.data

        const tab = this.contents.map(item => item.quantity * item.product.price)
        this.total = tab.reduce((acc, value) => acc + value, 0).toFixed(2)

        const elt = this.contents.at(0).product.id
        axios.get(`http://localhost:8080/products/${elt}`).then((res) => {
          this.shop = res.data.shop
        })
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
      <section class="bg-gray-light">
        <div class="py-2 px-6 mx-auto max-w-screen-xl lg:py-6">
          <p class="text-lg font-semibold mb-1">
            Votre commande
          </p>
          <h1 class="mb-5 text-2xl font-semibold tracking-tight leading-none text-gray-dark md:text-2xl dark:text-gray-dark">
            {{ shop.name }}
          </h1>
          <NuxtLink to="/customers/orders" class="text-teal hover:text-teal-700 text-lg inline-flex items-center mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 mt-1"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            <p class="text-lg font-light lg:text-xl sm:px-2 lg:px-2">
              Retour aux commandes
            </p>
          </NuxtLink>
        </div>
      </section>

      <section class="w-2/4 mt-8 mx-auto lg:py-0 bg-whiteborder border-gray-light rounded-sm shadow dark:bg-white dark:border-gray-400">
        <div class="bg-teal flex items-center justify-between mb-4">
          <h5 class="mx-auto py-7 text-xl font-bold leading-none text-white">
            Votre commande
          </h5>
        </div>
        <div class="p-4 px-8 py-1">
          <div class="border-b border-gray-400 mb-3">
            <div class="flex justify-between font-semibold text-xl text-gray-dark mb-3">
              <p>Total</p>
              <p class="ml-4">
                {{ total }} €
              </p>
            </div>
          </div>
          <div v-for="content in contents" :key="content.id" class="flow-root -my-6 divide-y divide-gray-dark">
            <div class="flex py-5">
              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div class="flex justify-between text-lg font-medium text-gray-900">
                    <div class="w-72">
                      <div class="flex p-1 divide-x divide-gray-400">
                        {{ content.quantity }}x
                        <div class="ps-4">
                          {{ content.product.name }}
                        </div>
                      </div>
                    </div>
                    <p class="ml-4">
                      {{ content.product.price }} €
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-400 py-2.5 my-5">
            <button
              type="submit"
              class="mt-5 font-semibold text-center"
            >
              Télécharger le reçu
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
