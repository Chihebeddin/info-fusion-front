<script>

import axios from 'axios'
import { useAuthStore } from '../../../store/auth.module.ts'

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})
export default {
  name: 'Shops',
  setup () {
    useHead({
      title: 'Accueil'
    })
  },
  data () {
    return {
      shops: {}
    }
  },
  mounted () {
    this.userData()
    this.getShopsList()
  },
  methods: {
    async userData () {
      const store = useAuthStore()
      store.init()
      await store.fetchUserInfo()
    },
    async getShopsList () {
      await axios.get('http://localhost:8080/shops/filtered').then((res) => {
        this.shops = res.data
        console.log(this.shops)
      })
    }
  }
}

</script>

<template>
  <div class="bg-gray-light">
    <section class="pt-14 ml-auto">
      <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <a href="" class="flex items-center mb-6 text-2xl font-semibold text-gray dark:text-gray-dark">
          <img class="bg-gray-light w-20 h-18 mr-2" src="../../../assets/images/bakery.png" alt="Bakery">
        </a>
        <a href="" class="flex items-center mb-6 text-2xl font-semibold text-gray dark:text-gray-dark">
          <img class="bg-gray-light w-20 h-18 mr-2" src="../../../assets/images/butcher.png" alt="Butcher">
        </a>
        <a href="" class="flex items-center mb-6 text-2xl font-semibold text-gray dark:text-gray-dark">
          <img class="bg-gray-light w-20 h-18 mr-2" src="../../../assets/images/fish.png" alt="Fish">
        </a>
        <a href="" class="flex items-center mb-6 text-2xl font-semibold text-gray dark:text-gray-dark">
          <img class="bg-gray-light w-20 h-18 mr-2" src="../../../assets/images/florist.png" alt="Florist">
        </a>
        <a href="" class="flex items-center mb-6 text-2xl font-semibold text-gray dark:text-gray-dark">
          <img class="bg-gray-light w-20 h-18 mr-2" src="../../../assets/images/groceries.png" alt="Groceries">
        </a>
        <a href="" class="flex items-center mb-6 text-2xl font-semibold text-gray dark:text-gray-dark">
          <img class="bg-gray-light w-20 h-18 mr-2" src="../../../assets/images/supermarket.png" alt="Supermarket">
        </a>
      </div>
    </section>
    <section>
      <div class="mt-8 w-4/5 mx-auto max-w-fit grid grid-cols-5 gap-6">
        <div v-for="shop in shops" :key="shop.id">
          <div class="">
            <NuxtLink :to="`/customers/shops/${ shop.id }`">
              <img class="rounded-md" src="../../../assets/images/grande_surface.jpg" alt="shop image">
              <div class="py-3">
                <div class="font-semibold text-xl mb-2">
                  {{ shop.name }}
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
