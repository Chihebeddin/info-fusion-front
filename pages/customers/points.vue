<script>

import QRCode from 'qrcode'
import axios from 'axios'
import { useAuthStore } from '../../store/auth.module.ts'

export default {
  setup () {
    useHead({
      title: 'Points'
    })
  },
  data () {
    return {
      fidelityCard: ref([]),
      qrCodeUrl: ref('')
    }
  },
  mounted () {
    this.userData()
    this.getPoints()
  },
  methods: {
    async userData () {
      const store = useAuthStore()
      store.init()
      const response = await store.fetchUserInfo()
      const userId = response.data.id.toString()

      QRCode.toDataURL(userId).then((url) => {
        this.qrCodeUrl = url
      })
    },
    async getPoints () {
      const store = await useAuthStore().fetchUserInfo()
      await axios.get(`http://localhost:8080/fidelitycards/client/${store.data.id}`).then((res) => {
        this.fidelityCard = res.data
      })
    },
    formatDate (date) {
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
      const year = date.getFullYear()

      return `${day}/${month}/${year}`
    }
  }
}

definePageMeta({
  layout: false
})

</script>

<template>
  <div class="bg-gray-light h-screen">
    <ClientTabs />

    <div class="w-full mx-auto min-w-74 max-w-5xl">
      <div class="pt-18 px-12 flex flex-row">
        <div class="flex shrink grow basis-auto">
          <div class="w-full flex flex-col">
            <PointsCard :nb-points="fidelityCard.nbPoints" :date-points="fidelityCard.datePoints" />

            <FidelityCard :balance="fidelityCard.solde" :qr-code="qrCodeUrl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
