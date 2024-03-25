<script setup>
import QRCode from 'qrcode'
import { ref } from 'vue'
import { useAuthStore } from '../store/auth.module.ts'

const store = useAuthStore()
const userDataList = ref([])

const state = ref({
  shops: {},
  qrCodeUrl: ''
})

useHead({
  title: 'ShopLoc'
})

onMounted(() => {
  userData()
  // getShopsList()
})

const onRefresh = () => {
  console.log(store.user)
  console.log(store.token)
}

const userData = async () => {
  // store.init()
  const response = await store.fetchUserInfo()
  console.log('response : ', response.data)
  const userId = response.data.id.toString()
  console.log('User ID:', userId)

  QRCode.toDataURL(userId).then((url) => {
    console.log('QR Code URL:', url)
    state.value.qrCodeUrl = url
    console.log('state.value.qrCodeUrl ' + state.value.qrCodeUrl)
  })
  const userEntries = Object.entries(response.data)
  userDataList.value = userEntries.map(([key, value]) => ({ key, value }))
  onRefresh()
}

definePageMeta({
  layout: false,
  middleware: ['auth']
})

</script>

<template>
  <div class="p-4 mt-9 sm:ml-64">
    <!-- Main Content Here -->
    <div class="w-full md:w-4/5 px-4 py-8 md:py-12">
      <ClientTabs />
      <div class="">
        <div class="grid grid-cols-2 gap-4">
          <!-- <div class="h-90 bg-gray-400 rounded-md"> -->
          <div class="">
            <img v-if="state.qrCodeUrl" :src="state.qrCodeUrl" width="260" height="260">
            <!-- </div> -->
            <!-- <div class="h-28 bg-gray-400 rounded-md">
              02
            </div>
            <div class="h-28 bg-gray-400 rounded-md">
              03
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
