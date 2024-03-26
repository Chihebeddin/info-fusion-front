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
  <div class="bg-gray-light h-screen">
    <ClientTabs />

    <div class="w-full mx-auto min-w-74 max-w-5xl">
      <div class="pt-18 px-12 flex flex-row">
        <div class="flex shrink grow basis-auto">
          <div class="w-full flex flex-col">
            Bienvenue !
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
