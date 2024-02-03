<template>
  <div>
    <h1>QR Code Page</h1>
    <div v-if="qrCodeData">
      <img :src="qrCodeData" alt="QR Code">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      qrCodeData: null
    }
  },
  async mounted () {
    // Appel API pour obtenir les données du QR code depuis votre backend
    const response = await this.$axios.post('/api/getQRCodeData', {
      // Envoyez les informations nécessaires pour récupérer les données du QR code
    })

    if (response.data && response.data.qrCodeData) {
      // Mettez à jour la variable qrCodeData avec les données du QR code
      this.qrCodeData = response.data.qrCodeData
    }
  }
}
</script>
