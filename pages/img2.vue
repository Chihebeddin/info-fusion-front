<template>
  <div>
    <br><br><br><br><br>
    <img :src="imageUrl" alt="Shop Image" crossorigin="anonymous">
    {{ imageUrl }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    shopId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  created () {
    console.log(this.shopId)
    axios.get(`http://localhost:8080/shops/${this.shopId}/image`, { responseType: 'arraybuffer' }).then((response) => {
      const base64Image = this.arrayBufferToBase64(response.data)
      this.imageUrl = `data:image/jpeg;base64,${base64Image}`
      console.log(this.imageUrl)
    }).catch((error) => {
      console.error('Error fetching image:', error)
    })
  },
  methods: {
    arrayBufferToBase64 (buffer) {
      let binary = ''
      const bytes = new Uint8Array(buffer)
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return window.btoa(binary)
    }
  }
}
</script>
