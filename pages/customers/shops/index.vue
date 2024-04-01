<script>
import axios from 'axios'
import _ from 'lodash'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'
import { useAuthStore } from '../../../store/auth.module.ts'

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

export default {
  name: 'Shops',
  components: {
    Splide,
    SplideSlide
  },
  setup () {
    useHead({
      title: 'Accueil'
    })

    const options = {
      rewind: true,
      gap: '1.5rem',
      autoplay: true,
      height: '15rem',
      perPage: 5,
      perMove: 3,
      breakpoints: {
        1000: {
          perPage: 1
        }
      }
    }

    return {
      options
    }
  },
  data () {
    return {
      shops: {},
      shopTypes: [
        { name: 'Boucheries', src: 'https://cdn-icons-png.flaticon.com/512/5223/5223562.png' },
        { name: 'Fleuristes', src: 'https://cdn-icons-png.flaticon.com/512/1940/1940885.png' },
        { name: 'Boulangeries', src: 'https://cdn-icons-png.flaticon.com/128/4673/4673843.png' },
        { name: 'Epiceries', src: 'https://cdn-icons-png.flaticon.com/512/1546/1546564.png' },
        { name: 'Grandes Surfaces', src: 'https://cdn-icons-png.flaticon.com/512/3514/3514407.png' },
        { name: 'Poissonneries', src: 'https://cdn-icons-png.flaticon.com/512/7780/7780149.png' }
      ],
      advantages: [
        { id: 1, title: '1€ dépensé = 1 point gagné', location: 'dans tous les commerces partenaires', message: 'Je commande', src: 'https://evoclip.fr/c/19-category_default/logos-grande-distribution-gms.jpg' },
        { id: 2, title: 'Dépensez vos points en avantages fidélité', location: 'dans votre boutique préférée', message: 'J\'en profite !', src: 'https://img-0.journaldunet.com/4XTHu6C_96E5ZNimsfJc1TFW2aw=/1500x/smart/cf7c60b704d74099ab1f8bf1e84f9c21/ccmcms-jdn/10770453.jpg' },
        { id: 3, title: 'Achetez régulièrement', location: 'et débloquez des avantages qui vous correspondent !', message: 'Je commence maintenant !', src: 'https://technologieservices.fr/media/wysiwyg/programme-fidelite.png' }
      ],
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
    getShopsList () {
      axios.get('http://localhost:8080/shops').then((res) => {
        this.shops = _.shuffle(res.data).slice(0, 10)
        console.log('hhhhhhh' + this.shops)
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
      console.log('ffffff')
      const shop = this.shops.find(shop => shop.id === shopId)
      return shop ? shop.imageUrl : ''
    }
  }
}
</script>

<template>
  <div class="flex flex-col bg-gray-light">
    <div>
      <main class="block" tabindex="-1">
        <div id="homelayout" class="box-border mx-auto pt-8 px-16">
          <div class="flex relative mb-7">
            <div id="categories" class="flex w-full absolute h-full justify-between" />
            <div class="scroll-smooth overflow-x-scroll">
              <div class="flex relative">
                <div v-for="shoptype in shopTypes" :key="shoptype" class="flex">
                  <div>
                    <li class="block relative max-w-24">
                      <a class="max-w-fit min-w-18 flex flex-col relative items-center">
                        <div class="flex flex-col items-center">
                          <div class="relative mb-1">
                            <div id="space" class="w-full h-full absolute left-1/2 top-1/2 duration-300 ease-out" />
                            <div class="block w-full duration-300 ease-out object-contain aspect-square">
                              <div class="flex overflow-hidden w-full">
                                <div class="flex w-max overflow-hidden">
                                  <img class="w-12 h-12 max-w-full max-h-full object-cover" :alt="shoptype.name" :src="shoptype.src">
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="overflow-hidden break-all line-clamp-1">
                            <span class="whitespace-pre-wrap font-semibold text-sm p-0">{{ shoptype.name }}</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </div>
                  <div class="w-4 h-px p-0 m-0 shrink-0" />
                </div>
              </div>
            </div>
          </div>

          <div id="adgrid" class="grid mb-7">
            <div class="min-w-0 col-span-full">
              <div>
                <div class="pt-6">
                  <div class="flex box-border items-center flex-nowrap -mx-3 -mb-6">
                    <div class="box-border w-full grow-0 shrink-0 basis-auto block px-3 mb-6">
                      <div class="flex justify-center">
                        <div class="flex relative w-full justify-center items-center">
                          <div class="w-full overflow-hidden">
                            <ol id="list" class="flex relative w-full m-0 p-0">
                              <li v-for="ad in advantages" id="advantage" :key="ad.id" class="flex mx-2 my-0 grow-0 shrink-0 basis-auto">
                                <NuxtLink class="block box-border w-full h-full overflow-hidden pointer-events-auto rounded-xl isolate cursor-pointer">
                                  <div class="relative w-full h-full min-h-0">
                                    <div class="flex top-0 h-full left-0 right-0 bottom-0 bg-green/50">
                                      <div class="flex flex-col grow shrink basis-0 box-border relative h-full p-4 justify-between items-start">
                                        <div class="w-full">
                                          <div class="cursor-pointer pointer-events-auto tracking-tight text-lg leading-6 font-semibold">
                                            <div class="line-clamp-3">
                                              <span>{{ ad.title }}</span>
                                            </div>
                                          </div>
                                          <div class="mt-1 text-sm">
                                            <div class="line-clamp-2">
                                              {{ ad.location }}
                                            </div>
                                          </div>
                                        </div>
                                        <div class="px-3 py-1 mt-1 grid grid-flow-col gap-1 box-border bg-gray-300 font-medium text-sm rounded-full">
                                          <div class="line-clamp-1">
                                            {{ ad.message }}
                                          </div>
                                        </div>
                                      </div>
                                      <div id="image" class="relative grow-0 shrink-0 basis-auto">
                                        <img class="w-full object-cover top-0 absolute h-full" :src="ad.src">
                                      </div>
                                    </div>
                                  </div>
                                </NuxtLink>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="-mx-3 -mb-6 flex flex-nowrap box-border">
            <div class="ml-0 mb-6 px-3 block grow-0 shrink-0 basis-auto w-full box-border">
              <div>
                <div class="h-6" />
                <div class="h-6" />
                <div id="agrid1" class="grid">
                  <!-- Popular shops -->
                  <div class="min-w-0 col-span-full">
                    <div>
                      <section>
                        <SectionHeader :title="'Commerce les plus fréquentés'" :link="'#'" />

                        <div id="carousel" class="flex overflow-x-scroll">
                          <Splide
                            aria-labelledby="basic-example-heading"
                            :options="options"
                            class="flex w-full shrink-0 grow-0 basis-full mr-6"
                            @splide:mounted="onSplideMounted"
                            @splide:move="onSplideMove"
                          >
                            <SplideSlide v-for="shop in shops" id="popular" :key="shop.id" class="block relative mr-4">
                              <div class="overflow-hidden relative">
                                <NuxtLink :to="`/customers/shops/${ shop.id }`">
                                  <div class="relative flex overflow-hidden pointer-events-none">
                                    <div id="carouselbg" class="relative flex flex-col overflow-hidden w-full items-center p-4 min-w-0 justify-evenly h-48 rounded-xl">
                                      <img class="overflow-hidden grow-0 shrink-0 basis-auto h-20 object-contain w-132 rounded-lg" :src="getShopImage(shop.id)" :alt="shop.name">
                                      <div class="w-4 h-px" />
                                      <div class="flex flex-col w-full items-center min-w-0">
                                        <div class="flex w-full">
                                          <div class="mb-0.5 flex-1 min-w-0 text-center">
                                            <div class="line-clamp-2">
                                              <span class="text-lg font-semibold"> {{ shop.name }}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </NuxtLink>
                              </div>
                            </SplideSlide>
                          </Splide>
                          <Splide
                            aria-labelledby="basic-example-heading"
                            :options="options"
                            @splide:mounted="onSplideMounted"
                            @splide:move="onSplideMove"
                          >
                            <SplideSlide v-for="shop in shops" :key="shop.id">
                              <img class="block object-cover" :src="getShopImage(shop.id)" :alt="shop.name">
                            </SplideSlide>
                          </Splide>
                        </div>
                      </section>
                    </div>
                  </div>

                  <!-- Some shops -->
                  <div v-for="shop in shops" :key="shop.id" class="min-w-0">
                    <div class="pb-5">
                      <div>
                        <div class="overflow-hidden relative">
                          <NuxtLink :to="`/customers/shops/${ shop.id }`">
                            <div id="all" class="relative flex overflow-hidden pointer-events-none">
                              <div id="allbg" class="relative overflow-hidden w-full h-36 rounded-xl">
                                <div class="h-full">
                                  <img class="block object-contain h-full w-full rounded-lg" :src="getShopImage(shop.id)" :alt="shop.name">
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

                <button
                  type="submit"
                  class="px-4 py-3 min-h-14 rounded-lg text-lg bg-teal-900/85 text-white my-10 mx-auto font-semibold w-auto box-border flex items-center w-auto justify-center"
                  @click="navigateTo('/customers/shops/all')"
                >
                  Voir tous les commerces disponibles
                </button>
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

#categories {
  z-index: 1;
}

#space {
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

#adgrid {
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 24px;
}

#agrid1 {
  grid-template-columns: repeat(4, 1fr);
  gap: 12px 16px;
}

#list {
  transition: transform 500ms ease-in-out 0s;
  transform: translateX(-8px);
}

#advantage {
  width: calc(33.3333% - 10.6667px);
}

#popular {
  width: calc(25% - 12px);
  flex: 0 0 auto;
}

#carousel {
  scrollbar-width: none;
}

#carouselbg {
  background-color: rgb(243, 243, 243);
  border: 1px solid rgb(232, 232, 232);
}

#allbg {
  background-color: rgb(255, 255, 255);
}

#all {
  flex-flow: column;
}

#image {
  width: 35%;
}

</style>
