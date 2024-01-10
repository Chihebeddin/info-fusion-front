<template>
  <div>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Splide
          aria-labelledby="autoplay-example-heading"
          :options="options"
          :has-track="false"
        >
          <SplideTrack>
            <SplideSlide v-for="shop in shops" :key="shop.id" data-splide-interval="5000">
              <NuxtLink to="/customers/shop">
                <img class="rounded-t-lg" src="../assets/images/grande_surface.jpg" alt="Grande surface">
                <div class="py-4">
                  <div class="font-bold text-xl mb-2">
                    {{ shop.name }}
                  </div>
                </div>
              </NuxtLink>
            </SplideSlide>
          </SplideTrack>
        </Splide>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css/sea-green'

export default {
  name: 'Shops',
  components: {
    Splide,
    SplideTrack,
    SplideSlide
  },
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
      shops: {}
    }
  },
  mounted () {
    this.getShopsList()
  },
  methods: {
    getShopsList () {
      axios.get('http://localhost:8080/shops').then((res) => {
        this.shops = _.shuffle(res.data).slice(0, 10)
      })
    }
  }
}

</script>
