<script>
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  data () {
    return {
      productId: '',
      product: {},
      isLoading: false,
      categories: [],
      category: ''
    }
  },
  mounted () {
    this.productId = useRoute().params.id
    this.getProduct(this.productId)
    this.getCategories()
  },
  methods: {
    async getProduct (productId) {
      this.isLoading = true
      await axios.get(`http://localhost:8080/products/${productId}`).then((res) => {
        this.isLoading = false
        this.product = res.data
        this.category = res.data.category
      })
    },
    async updateProduct () {
      this.isLoading = true
      await axios.put(`http://localhost:8080/products/${this.product.id}`, this.product).then((res) => {
        if (res.status === 200) {
          this.isLoading = false
          localStorage.setItem('success', 'Modification enregistré avec succès !')
          navigateTo('/shops/products')
        }
      })
    },
    getCategories () {
      axios.get('http://localhost:8080/categories').then((res) => {
        this.categories = res.data
      })
    }
  }
}

definePageMeta({
  layout: false,
  middleware: ['auth']
})

</script>

<template>
  <div class="p-4 sm:ml-64">
    <!-- Sidebar Content Here -->
    <DefaultSidebar />
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4">
      <div class="flex justify-between">
        <h1 class="p-5 text-2xl font-bold text-gray-dark">
          Modification
        </h1>
      </div>

      <div class="bg-gray-light dark:bg-gray-light rounded-sm">
        <div v-if="isLoading">
          <button type="button" class="bg-indigo-500 ..." disabled>
            <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
              <!-- ... -->
            </svg>
            Loading data...
          </button>
        </div>
        <div v-else>
          <form class="py-8 px-4 mx-auto max-w-2xl lg:py-16" @submit.prevent="updateProduct">
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-5 group">
                <input
                  v-model="product.name"
                  type="text"
                  name="floating_product_name"
                  class="block py-2.5 px-0 w-full text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                  required
                >
                <label
                  for="floating_product_name"
                  class="peer-focus:font-bold absolute text-lg text-gray-dark dark:text-gray-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-teal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Nom du produit</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input
                  v-model="product.price"
                  type="text"
                  name="floating_price"
                  class="block py-2.5 px-0 w-full text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                  required
                >
                <label
                  for="floating_price"
                  class="peer-focus:font-bold absolute text-lg text-gray-dark dark:text-gray-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-teal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Prix (euros)</label>
              </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-5 group">
                <input
                  v-model="product.quantity"
                  type="number"
                  min="0"
                  name="floating_quantity"
                  class="block py-2.5 px-0 w-full text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                  required
                >
                <label
                  for="floating_quantity"
                  class="peer-focus:font-bold absolute text-lg text-gray-dark dark:text-gray-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-teal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Quantité</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input
                  v-model="category.name"
                  type="text"
                  name="floating_category"
                  class="block py-2.5 px-0 w-full text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                  disabled
                >
                <label
                  for="floating_category"
                  class="peer-focus:font-bold absolute text-lg text-gray-dark dark:text-gray-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-teal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Catégorie</label>
              </div>
            </div>
            <button
              type="submit"
              class="w-fit text-white bg-teal hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal dark:hover:bg-teal-700 dark:focus:ring-teal"
            >
              Modifier
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
