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
