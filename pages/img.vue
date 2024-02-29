<template>
  <div>
    <!-- Assuming shopId is defined in your parent component's data -->
    <ShopImage :shop-id="shopId" />
  </div>
</template>

<script>
import ShopImage from './img2.vue'

export default {
  components: {
    ShopImage
  },
  data () {
    return {
      shopId: 3 // Replace with the actual shopId
    }
  }
}
</script>
