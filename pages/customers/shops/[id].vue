<template>
  <div>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-2xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div class="flex flex-col justify-center">
          <NuxtLink to="/UserProfile" class="text-teal-700 dark:text-white text-lg inline-flex items-center mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 pr-1"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg> Retour
          </NuxtLink>
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white mt-5">
            {{ shop.name }}
          </h1>
          <p class="mb-6 text-lg font-normal text-gray-900 lg:text-xl dark:text-gray-900 inline-flex items-center">
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
    <section class="container mx-auto bg-gray-50 dark:bg-gray-900">
      <div class="w-2/4 max-w-fit grid grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id" cm>
          <div class="h-90 bg-white border border-gray-light shadow dark:bg-white dark:border-gray-400">
            <a href="#">
              <img src="../../assets/images/baguette.jpg" alt="product image">
            </a>
            <div class="mx-3">
              <div class="mt-2 mb-1 h-24 text-ellipsis overflow-hidden">
                <h1 class="font-semibold leading-6 text-xl text-wrap">
                  {{ product.nom }}
                </h1>
              </div>
              <div class="mb-1">
                <span class="text-xl font-medium text-gray dark:text-white">{{ product.prix }} €</span>
              </div>
              <div class="mb-2">
                <button type="submit" class="w-full text-teal hover:bg-gray-light focus:ring-4 focus:outline-none focus:ring-gray-light font-medium rounded-md text-2xl px-5 py-1 text-center dark:bg-gray-light dark:hover:bg-gray-400 dark:focus:ring-gray-light">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { useRoute } from 'vue-router'
import axios from 'axios'

const products = [
  {
    id: 1,
    nom: 'Produit 1 qui est super bien, cool et fantastique, et le moins cher possible',
    prix: 1.2
  },
  {
    id: 2,
    nom: 'Produit 2',
    prix: 5
  },
  {
    id: 3,
    nom: 'Produit 3',
    prix: 0.5
  },
  {
    id: 4,
    nom: 'Produit 4',
    prix: 1.5
  },
  {
    id: 5,
    nom: 'Produit 5',
    prix: 11
  },
  {
    id: 6,
    nom: 'Produit 6',
    prix: 2
  },
  {
    id: 7,
    nom: 'Produit 7',
    prix: 1.2
  },
  {
    id: 8,
    nom: 'Produit 8',
    prix: 5
  },
  {
    id: 9,
    nom: 'Produit 9',
    prix: 0.5
  },
  {
    id: 10,
    nom: 'Produit 10',
    prix: 1.5
  },
  {
    id: 12,
    nom: 'Produit 12',
    prix: 11
  }
]

export default {
  data () {
    return {
      shopId: '',
      shop: '',
      products
    }
  },
  mounted () {
    this.shopId = useRoute().params.id

    this.getShop(this.shopId)
  },
  methods: {
    getShop (shopId) {
      axios.get(`http://localhost:8080/shops/${shopId}`).then((res) => {
        this.shop = res.data
      })
    }
  }
}

</script>
