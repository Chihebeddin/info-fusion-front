<script>
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '../../../store/auth.module.ts'

export default {
  setup () {
    definePageMeta({
      middleware: ['auth']
    })
  },
  data () {
    return {
      shopId: '',
      shop: '',
      products: ref([]),
      filteredProducts: ref([]),
      categories: ref([]),
      itemsSelected: ref([]),
      store: useAuthStore(),
      qte: '',
      baseUrl: 'https://info-fusion-back-mr2ieedmfa-od.a.run.app/shops/',
      imageUrl: '',
      walkingDuration: '',
      walkingDistance: '',
      drivingDuration: '',
      drivingDistance: '',
      theHour: '',
      showModal: ref(false)
    }
  },
  mounted () {
    this.shopId = useRoute().params.id
    this.getShop(this.shopId)
    this.getProducts(this.shopId)
    this.userData()
    this.direction()
    this.loadGoogleMaps()
  },
  methods: {
    loadGoogleMaps () {
      if (!window.google) {
        const script = document.createElement('script')
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD47kEC4Hly-NuZyd4qY7HJTqjGyCSIBp8'
        document.head.appendChild(script)
      }
    },
    userData () {
      const store = useAuthStore()
      store.fetchUserInfo()
    },
    getShop (shopId) {
      axios.get(`https://info-fusion-back-mr2ieedmfa-od.a.run.app/shops/${shopId}`).then((res) => {
        this.shop = res.data
        this.theHour = this.shop.closingTime
        this.loadShopImage()
      })
    },
    getProducts (shopId) {
      axios.get(`https://info-fusion-back-mr2ieedmfa-od.a.run.app/products/filtered?shop=${shopId}`).then((res) => {
        this.products = res.data
        this.categories = computed(() => {
          return [...new Set(this.products.map(item => item.category.name))]
        })
      })
    },
    productsByCategory (ctgName) {
      return this.products.filter(item => item.category.name === ctgName)
    },
    loadShopImage () {
      axios.get(this.baseUrl + `${this.shopId}/image`, { responseType: 'arraybuffer' })
        .then((response) => {
          if (response.status === 200) {
            const base64Image = this.arrayBufferToBase64(response.data)
            this.imageUrl = `data:image/jpeg;base64,${base64Image}`
            const img = document.getElementById('headerimg')
            img.style.backgroundImage = 'url(\'' + this.imageUrl + '\')'
          } else {
            const img = document.getElementById('default')
            img.style.opacity = 1
          }
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
    },
    direction () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }

            console.log(currentPosition)
            const directionsService = new google.maps.DirectionsService()

            const request1 = {
              origin: currentPosition,
              destination: { lat: this.shop.latitude, lng: this.shop.longitude },
              travelMode: 'WALKING'
            }

            const request2 = {
              origin: currentPosition,
              destination: { lat: this.shop.latitude, lng: this.shop.longitude },
              travelMode: 'DRIVING'
            }

            directionsService.route(request1, (result, status) => {
              if (status === 'OK') {
                this.walkingDuration = result.routes[0].legs[0].duration.text
                this.walkingDistance = result.routes[0].legs[0].distance.text
              }
            })

            directionsService.route(request2, (result, status) => {
              if (status === 'OK') {
                this.drivingDuration = result.routes[0].legs[0].duration.text
                this.drivingDistance = result.routes[0].legs[0].distance.text
              }
            })
          }
        )
      }
    }
  }
}

</script>

<template>
  <div class="bg-gray-light">
    <div class="bg-white border-b border-gray-300 shadow relative">
      <div id="header" class="box-content mx-auto px-16">
        <div class="box-content" style="max-width: 1920px;">
          <div class="relative">
            <div class="inline-block pt-4">
              <div>
                <span class="box-border block w-full">
                  <NuxtLink to="/" class="flex text-teal hover:text-teal-700 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-3" width="30" height="30" viewBox="0 0 24 24">
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m7 16l-4-4m0 0l4-4m-4 4h18"
                      />
                    </svg> Retour
                  </NuxtLink>
                </span>
              </div>
            </div>

            <div id="headergrid" class="grid pt-4 pb-8">
              <div class="rounded overflow-hidden w-full relative" style="box-shadow: 0 6px 20px #00000014; grid-area: image; padding-top: 56.25%;">
                <div id="headerimg" class="bg-cover absolute w-full h-full left-0 top-0">
                  <div id="default" class="w-full h-full absolute left-0 top-0 opacity-0 bg-cover" />
                </div>
              </div>

              <div class="relative pr-78" style="grid-area: info;">
                <h1 class="text-4xl font-semibold">
                  {{ shop.name }}
                </h1>
                <div class="pt-2 text-left flex">
                  <span class="inline-flex items-center justify-center pr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-teal" width="20" height="20" viewBox="0 0 320 512">
                      <path fill="currentColor" d="M160 48a48 48 0 1 1 96 0a48 48 0 1 1-96 0m-33.5 151.3c-1 .4-1.9.8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2S12 246.5 17.6 229.7l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9l15.4 36.9l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23l-19.3 65.5l49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1l-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4l-14.5 36.2c-2.4 6-6 11.5-10.6 16.1l-61.7 61.7c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3z" />
                    </svg> {{ walkingDuration }}
                  </span>
                  <span class="inline-flex items-center justify-center pr-1 font-semibold">-</span>
                  <span class="inline-flex items-center justify-center pr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-teal mr-1" width="20" height="20" viewBox="0 0 100 100">
                      <path fill="currentColor" d="M49.369 11.228c-11.647-.171-27.826.079-31.157 9.027l-8.184 19.204a2.84 2.84 0 0 0-1.37-.865l-3.295-.927a2.86 2.86 0 0 0-3.535 1.983L.109 45.754a2.86 2.86 0 0 0 1.983 3.534l3.296.928c.11.03.22.04.33.058c-.63 1.57-1.022 3.296-1.022 4.323v22.32c0 1.144.48 1.674 1.242 1.922v5.946a4.008 4.008 0 0 0 4.017 4.017h10.777a4.008 4.008 0 0 0 4.017-4.017v-5.728h50.503v5.728a4.01 4.01 0 0 0 4.018 4.017h10.775a4.01 4.01 0 0 0 4.019-4.017V78.84c.763-.248 1.24-.778 1.24-1.922v-22.32c0-1.027-.393-2.753-1.022-4.323c.11-.017.22-.027.33-.058l3.297-.928a2.86 2.86 0 0 0 1.982-3.534l-1.717-6.104a2.861 2.861 0 0 0-3.536-1.983l-3.295.927a2.855 2.855 0 0 0-1.371.865l-8.184-19.204c-3.57-9.084-20.773-8.856-32.42-9.027m33.357 29.444c.194.576-.386.96-.993.995c0 0-1.984.168-4.72.389c-2.082-4.864-6.92-8.292-12.525-8.292c-6.151 0-11.373 4.13-13.048 9.754c-.464.006-1.003.026-1.434.026c-10.597 0-31.739-1.877-31.739-1.877c-.606-.036-1.187-.42-.993-.995c8.142-24.821 8.385-22.955 32.276-22.694c23.89.26 24.029-1.513 33.176 22.694m-18.238-2.217a8.886 8.886 0 0 1 7.447 3.991c-4.785.355-10.292.718-15.424.929a8.879 8.879 0 0 1 7.977-4.92M9.407 46.51c.072.107.142.214.222.317h-.31zm5.294 6.234c2.096-.034 13.348 3.753 13.348 3.753c1.405.396 2.642 3.052 2.635 4.512c-.021 4.917-12.709 3.21-17.86 3.23a2.63 2.63 0 0 1-2.635-2.634V55.38c0-1.46 2.416-2.6 4.512-2.636m70.598 0c2.096.035 4.512 1.176 4.512 2.636v6.225a2.63 2.63 0 0 1-2.635 2.635c-5.15-.02-17.839 1.686-17.86-3.231c-.007-1.46 1.23-4.116 2.635-4.512c0 0 11.252-3.787 13.348-3.753" color="currentColor" />
                    </svg> {{ drivingDuration }}
                  </span>
                  <span class="pr-1 text-lg font-semibold">·</span>
                  <span v-for="elt, index in shop.shopType" :key="elt.id" class="inline-flex items-center">
                    <span>{{ elt.type }}</span>
                    <span v-if="index !== shop.shopType.length-1" class="px-1 text-lg font-medium">·</span>
                  </span>
                </div>

                <div class="pt-2 text-left text-gray flex">
                  <span class="inline-flex items-center justify-center pr-1">
                    <span>À {{ walkingDistance }}</span>
                  </span>
                  <span class="px-1 text-lg font-medium">·</span>
                  <span class="inline-flex items-center justify-center pr-1">
                    <span v-if="new Date().getHours() > theHour.substring(0, 2)">Fermé jusqu'à {{ shop.openingTime }}</span>
                    <span v-else>Ouvert jusqu'à {{ shop.closingTime }}</span>
                  </span>
                </div>

                <Teleport to="body">
                  <!-- use the modal component, pass in the prop -->
                  <MapModal :key="shop.id" :shop="shop" :show="showModal" @close="showModal = false" />
                </Teleport>

                <div class="pt-4 flex">
                  <button
                    class="inline-flex items-center justify-center pr-1"
                    @click="showModal = true"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-gray mr-1" width="20" height="20" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8" />
                      <circle cx="12" cy="8" r="1" fill="#currentColor" />
                      <path fill="currentColor" d="M12 10a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0-1-1" />
                    </svg> Informations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center pb-6 scroll-mt-40">
      <div class="px-16 mx-auto grow-1 box-content" style="max-width: 1920px; width: calc(100% - 2 * 64px);">
        <div class="box-content" style="max-width: 1920px;">
          <div id="products" class="grid mt-8">
            <main class="block" style="grid-area: menu;">
              <div v-for="category in categories" :key="category">
                <div class="mb-4 mt-8">
                  <div>
                    <div class="flex justify-between">
                      <div class="flex-1 mxr-auto">
                        <div class="flex items-baseline">
                          <h2 class="text-xl font-bold">
                            {{ category }}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <ul id="productGrid" class="grid">
                  <li v-for="product in productsByCategory(category)" :key="product.id">
                    <div id="prdDescription" class="rounded box-border">
                      <div class="flex flex-col p-0 box-border h-full">
                        <div class="box-border w-full h-full flex flex-col px-2 pt-2 whitespace-pre-line mr-auto">
                          <div class="box-border">
                            <p class="box-border text-sm block font-semibold">
                              <span class="line-clamp-4 box-border"> {{ product.name }}</span>
                            </p>
                          </div>

                          <div class="mt-auto box-border">
                            <div class="flex flex-col box-border flex-wrap pt-px" style="gap: 4px 0;">
                              <span class="box-border text-sm text-gray font-medium">{{ product.price }} €</span>
                            </div>
                          </div>
                        </div>

                        <div class="-order-1 border-0 m-0 w-full rounded-none h-0 box-border overflow-hidden shrink-0 relative" style="border-bottom: 1px solid #f5f5f5; padding-top: 100%;">
                          <div id="productImg" class="bg-cover box-border">
                            <div id="cover" class="bg-cover opcaity-0 box-border " />
                          </div>
                        </div>

                        <div class="p-2 box-border mt-auto relative" style="z-index: 2;">
                          <div class="ml-0 box-border">
                            <span class="box-border flex h-full max-h-full w-full">
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
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </main>

            <aside class="sticky overflow-hidden self-start" style="top: calc(32px + 73px + 73px); z-index: 3;">
              <ShoppingCart :items="itemsSelected" />
            </aside>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

#header {
  max-width: 1920px;
  width: calc(100% - 2 * 64px);
}

#headergrid {
  grid-template-columns: 30% 1fr;
  grid-template-rows: auto;
  grid-gap: 24px;
  grid-template-areas:"image info";
}

#headerimg {
  background-position: 50%;
  opacity: 1;
}

#default {
  background-position: 50%;
  transition: opacity .5s ease-out;
  background-image: url('https://img.freepik.com/premium-photo/doodle-food-icons-seamless-background_3248-3676.jpg');
}

#productImg {
  background-position: 50%;
  opacity: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

#products {
  grid-template-columns: minmax(60%,70%) minmax(420px,1fr);
  grid-gap: 32px 24px;
  grid-template-areas: "menu basket";
  grid-template-columns: 60% 1fr;
  grid-template-rows: auto 1fr;
}

#productGrid {
  --grid-col-width: 125px;
  grid-gap: 16px;
  grid-template: auto/repeat(auto-fill,minmax(var(--grid-col-width),1fr));
}

#prdDescription {
  box-shadow: 0 1px 4px #00000014;
  background-color: #fff;
  border: 1px solid #0000000a;
  cursor: pointer;
  height: 100%;
  outline: none;
  overflow: hidden;
  position: relative;
  transition: box-shadow .2s ease-in-out;
  width: 100%;
  word-break: break-word;
}

#prdDescription:hover {
  box-shadow: 0 8px 10px #00000014;
}

#cover {
  background-image: url('https://cdn4.vectorstock.com/i/1000x1000/95/18/food-grocery-icons-vector-21859518.jpg');
  transition: opacity .5s ease-out;
  background-position: 50%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

</style>
