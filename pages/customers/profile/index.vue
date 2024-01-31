<script steup>
import QRCode from 'qrcode'

const store = useAuthStore()
const userDataList = ref([])

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
  // store.init()
  const response = await store.fetchUserInfo()
  console.log('response : ', response.data)
  const userId = response.data.id.toString() // Assuming the user id is present in the response data
  console.log('User ID:', userId)

  QRCode.toDataURL(userId).then((url) => {
    console.log('QR Code URL:', url)
    state.value.qrCodeUrl = url
  })
  const userEntries = Object.entries(response.data)
  userDataList.value = userEntries.map(([key, value]) => ({ key, value }))
  onRefresh()
}

</script>

<template>
  <div class="p-4 mt-9 sm:ml-64">
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4 px-4 py-8 md:py-12">
      <ClientTabs />

      <div class="mt-8">
        <div class="grid grid-cols-2 gap-4">
          <div class="h-90 bg-gray-400 rounded-md">
            <div class="absolute ml-[570px]">
              <div class="absolute top-[100px]">
                <canvas width="256" height="" class="" />
                <img class="w-[275px] ml-[143px]" :src="state.qrCodeUrl" width="275" height="275">
              </div>
            </div>
            <div class="h-28 bg-gray-400 rounded-md">
              02
            </div>
            <div class="h-28 bg-gray-400 rounded-md">
              03
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
