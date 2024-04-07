<script>

import axios from 'axios'
import { useAuthStore } from '../../../store/auth.module.ts'

export default {
  name: 'Shops',

  data () {
    return {
      store: useAuthStore(),
      shops: {},
      isLoading: false,
      baseUrl: 'https://info-fusion-back-mr2ieedmfa-od.a.run.app/shops/'
    }
  },
  mounted () {
    this.userData()
    this.getShopsList()
  },
  methods: {
    async userData () {
      this.store.init()
      await this.store.fetchUserInfo()
    },
    getShopsList () {
      this.isLoading = true
      setTimeout(() => {
        axios.get('https://info-fusion-back-mr2ieedmfa-od.a.run.app/shops/filtered').then((res) => {
          this.shops = res.data
          // Call method to get images for each shop
          this.loadShopImages()
          this.isLoading = false
        })
      }, 1000)
    },
    loadShopImages () {
      this.shops.forEach((shop) => {
        axios.get(this.baseUrl + `${shop.id}/image`, { responseType: 'arraybuffer' })
          .then((response) => {
            const base64Image = this.arrayBufferToBase64(response.data)
            shop.imageUrl = `data:image/jpeg;base64,${base64Image}`
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

<template>
  <div class="flex flex-col bg-gray-light h-screen">
    <div>
      <main class="block" tabindex="-1">
        <div id="homelayout" class="box-border mx-auto pt-8 px-16">
          <div class="flex relative mb-7">
            <div class="">
              <div class="flex relative">
                <NuxtLink to="/" class="flex text-teal hover:text-teal-700 text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="flex box-border flex-nowrap -mx-3 -mb-6">
            <div v-if="isLoading" id="agrid1" class="grid">
              <LoadingSkeleton v-for="n in 10" :key="n" />
            </div>
            <div v-else class="box-border w-full grow-0 shrink-0 basis-auto block px-3 mb-6">
              <div>
                <div class="mb-6 overflow-x-auto flex flex-row items-center justify-between">
                  <h1 class="text-xl font-semibold">
                    Tous les {{ shops.width }} partenaires
                  </h1>
                </div>
                <div id="agrid1" class="grid">
                  <div v-for="shop in shops" :key="shop.id" class="min-w-0">
                    <div class="pb-5">
                      <div>
                        <div class="overflow-hidden relative">
                          <NuxtLink :to="`/customers/shops/${ shop.id }`">
                            <div id="all" class="relative flex overflow-hidden pointer-events-none">
                              <div id="allbg" class="relative overflow-hidden w-full h-36 rounded-xl">
                                <div class="h-full">
                                  <img v-if="getShopImage(shop.id)" class="block object-contain h-full w-full rounded-lg" :src="getShopImage(shop.id)" :alt="shop.name">
                                  <img v-else class="block object-cover h-full w-full rounded-lg" src="../../../assets/images/grande_surface.jpg" :alt="shop.name">
                                </div>
                              </div>
                              <div class="flex flex-col items-start">
                                <div class="mt-3 gap-1 w-full flex items-center justify-between">
                                  <div class="overflow-hidden">
                                    <div class="p-0.5 text-lg font-semibold text-ellipsis w-full whitespace-nowrap overflow-hidden">
                                      {{ shop.name }}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style>

#homelayout {
  max-width: 1280px;
  min-width: 1024px
}

#agrid1 {
  grid-template-columns: repeat(4, 1fr);
  gap: 12px 16px;
}

</style>
