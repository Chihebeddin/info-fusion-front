<template>
  <div>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
          <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            <div v-for="shop in shops" :key="shop.id">
              <NuxtLink :to="`/customers/shops/${ shop.id }`">
                <img :src="getShopImage(shop.id)" class="rounded-t-lg" :alt="shop.name">
                <div class="py-4">
                  <div class="font-bold text-xl mb-2">
                    {{ shop.name }}
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="w-fit mt-1 text-white bg-teal hover:bg-teal-700 focus:ring-2 focus:outline-none focus:ring-teal-light font-bold rounded-2xl text-xl px-5 py-3 text-center dark:bg-teal dark:hover:bg-teal-700 dark:focus:ring-teal"
        >
          Plus
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import '@splidejs/vue-splide/css/sea-green'
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
    const options = {
      rewind: true,
      gap: '1rem',
      autoplay: true,
      height: '15rem',
      perPage: 3,
      perMove: 1,
      width: '55%'
    }
    return {
      options
    }
  },
  data () {
    return {
      shops: [],
      baseUrl: 'http://localhost:8080/shops/'
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
      await axios.get('http://localhost:8080/shops').then((res) => {
        this.shops = _.shuffle(res.data).slice(0, 10)
        // Call method to get images for each shop
        this.loadShopImages()
      })
    },
    loadShopImages () {
      this.shops.forEach((shop) => {
        axios.get(this.baseUrl + `${shop.id}/image`, { responseType: 'arraybuffer' })
          .then((response) => {
            const base64Image = this.arrayBufferToBase64(response.data)
            shop.imageUrl = `data:image/jpeg;base64,${base64Image}`
          })
          .catch((error) => {
            console.error('Error fetching image:', error)
          })
      })
    },
    arrayBufferToBase64 (buffer) {
      let binary = ''
      const bytes = new Uint8Array(buffer)
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return window.btoa(binary)
    },
    getShopImage (shopId) {
      const shop = this.shops.find(shop => shop.id === shopId)
      return shop ? shop.imageUrl : ''
    }
  }
}
</script>
