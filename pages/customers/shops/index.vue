<template>
  <div>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="absolute ml-[570px]">
        <div class="absolute top-[100px]">
          <canvas width="256" height="" class=""></canvas>
          <img class="w-[275px] ml-[143px]" :src="state.qrCodeUrl" width="275" height="275" />
        </div>
      </div>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Splide aria-labelledby="autoplay-example-heading" :options="options" :has-track="false">
          <SplideTrack>
            <SplideSlide v-for="shop in shops" :key="shop.id" data-splide-interval="5000">
              <NuxtLink :to="`/shops/${shop.id}`">
                <img class="rounded-t-lg" src="../../../assets/images/grande_surface.jpg" alt="Grande surface">
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

<script setup>
import axios from 'axios'
import _ from 'lodash'
import { ref } from 'vue'
import { useAuthStore } from '../store/auth.module.ts'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css/sea-green'
import QRCode from 'qrcode'

const store = useAuthStore()
const userDataList = ref([])

const onRefresh = () => {
  console.log(store.user)
  console.log(store.token)
}

const options = {
  rewind: true,
  gap: '1rem',
  autoplay: true,
  height: '15rem',
  perPage: 3,
  perMove: 1,
  width: '55%'
}

const { title } = useHead({
  title: 'Accueil'
})

const state = ref({
  shops: {},
  qrCodeUrl: ''
})

onMounted(() => {
  userData()
  getShopsList()
  console.log()
})

const userData = async () => {
  //store.init()
  const response = await store.fetchUserInfo()
  console.log('response : ', response.data)
  const userId = response.data.id.toString(); // Assuming the user id is present in the response data
    console.log('User ID:', userId);

    QRCode.toDataURL(userId).then(url => {
      console.log('QR Code URL:', url);
      state.value.qrCodeUrl = url;
    });
  const userEntries = Object.entries(response.data)
  userDataList.value = userEntries.map(([key, value]) => ({ key, value }))
  onRefresh()
}

const getShopsList = async () => {
  await axios.get('http://localhost:8080/shops').then((res) => {
    state.value.shops = _.shuffle(res.data).slice(0, 10)
  })
}
</script>