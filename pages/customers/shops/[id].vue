<template>
  <div class="bg-gray-light">
    <section class="bg-white border-b border-gray-300 shadow">
      <div class="py-8 px-16 max-w-screen-2xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div class="flex flex-col justify-center">
          <NuxtLink to="/customers/shops/all" class="text-teal hover:text-teal-700 text-lg inline-flex items-center mt-1">
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
          </NuxtLink>
          <div class="fixed top-15 right-10 z-40 w-1/3 max-w-auto h-screen pt-5">
            <ShopLocation />
          </div>
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-dark md:text-5xl lg:text-6xl mt-5">
            {{ shop.name }}
          </h1>
          <p class="mb-6 text-lg font-normal text-gray lg:text-xl inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 pr-1"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg> {{ shop.openingTime }} - {{ shop.closingTime }}
          </p>
        </div>
      </div>
    </section>
    <section class="px-16 mb-28 grid grid-cols-3 gap-6">
      <div class="col-span-2">
        <div class="my-8">
          <h1 class="text-xl font-semibold tracking-tight leading-none text-gray-dark lg:text-2xl">
            Catégories
          </h1>
        </div>
        <div class="max-w-5xl grid grid-cols-6 gap-3">
          <div v-for="product in products" :key="product.id">
            <div class="h-90 bg-white border border-gray-light rounded-sm shadow dark:bg-white dark:border-gray-400">
              <div href="#">
                <img class="h-48" src="../../../assets/images/baguette.jpg" alt="product image">
              </div>
              <div class="mx-3">
                <div class="mt-2 mb-1 h-16">
                  <h1 class="font-semibold leading-6 text-lg tracking-tight">
                    {{ product.name }}
                  </h1>
                </div>
                <div class="mb-1">
                  <span class="text-lg font-medium text-gray">{{ product.price }} €</span>
                </div>
                <div class="mb-2 relative flex items-center">
                  <button
                    type="button"
                    data-input-counter-decrement="counter-input"
                    class="flex-shrink-0 inline-flex items-center justify-center"
                    @click="minus(product)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 text-teal hover:text-teal-700">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    min="0"
                    :max="product.quantity"
                    data-input-counter
                    disabled
                    class="flex-shrink-0 text-gray border-0 bg-transparent text-xl font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                  >
                  <button
                    type="button"
                    data-input-counter-increment="counter-input"
                    class="flex-shrink-0 inline-flex items-center justify-center"
                    @click="plus(product)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 text-teal hover:text-teal-700">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <ShoppingCart :items="itemsSelected" />
      </div>
    </section>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '../../../store/auth.module.ts'

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

export default {
  data () {
    return {
      shopId: '',
      shop: '',
      products: ref([]),
      itemsSelected: ref([]),
      store: useAuthStore(),
      qte: ''
    }
  },
  mounted () {
    this.shopId = useRoute().params.id
    this.getShop(this.shopId)
    this.getProducts(this.shopId)
    this.userData()
  },
  methods: {
    async userData () {
      const store = useAuthStore()
      store.init()
      await store.fetchUserInfo()
    },
    async getShop (shopId) {
      await axios.get(`http://localhost:8080/shops/${shopId}`).then((res) => {
        this.shop = res.data
      })
    },
    async getProducts (shopId) {
      await axios.get(`http://localhost:8080/products/filtered?shop=${shopId}`).then((res) => {
        this.products = res.data
      })
    },
    plus (elt) {
      const updatedElt = this.itemsSelected.find(item => item.id === elt.id)
      if (updatedElt !== undefined) {
        updatedElt.quantity++
      } else {
        this.itemsSelected.push({
          id: elt.id,
          name: elt.name,
          price: elt.price,
          quantity: 1
        })
      }
    },
    minus (elt) {
      const updatedElt = this.itemsSelected.find(item => item.id === elt.id)
      if (updatedElt.quantity >= 1) {
        updatedElt.quantity--
      } if (updatedElt.quantity === 0 && updatedElt !== undefined) {
        this.itemsSelected = this.itemsSelected.filter(item => item.id !== elt.id)
      }
    }
  }
}

</script>
