<template>
  <div class="bg-gray-light">
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-2xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div class="flex flex-col justify-center">
          <NuxtLink to="/customers/shops" class="text-teal hover:text-teal-700 text-lg inline-flex items-center mt-1">
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
    <section class="container mx-auto">
      <div class="w-3/5 max-w-fit grid grid-cols-4 gap-6">
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
              <div class="mb-2">
                <button
                  type="submit"
                  class="w-full text-teal border border-gray-light hover:text-teal-700 hover:border-gray-400 focus:ring-1 focus:outline-none focus:ring-gray-light font-medium rounded-sm text-2xl px-5 py-1 text-center dark:bg-gray-light dark:focus:ring-gray-light"
                  @click="addToCart(product)"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fixed top-74 right-10 z-40 w-1/3 max-w-auto h-screen pt-5 transition-transform -translate-x-full sm:translate-x-0">
        <ShoppingCart :items="itemsSelected" />
      </div>
    </section>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  data () {
    return {
      shopId: '',
      shop: '',
      products: ref([]),
      itemsSelected: ref([])
    }
  },
  mounted () {
    this.shopId = useRoute().params.id
    this.getShop(this.shopId)
    this.getProducts(this.shopId)
  },
  methods: {
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
    addToCart (elt) {
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
    }
  }
}

</script>
