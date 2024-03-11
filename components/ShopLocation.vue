<template>
  <div id="map" style="height: 400px;" />
</template>

<script>
export default {
  data () {
    return {
      map: null,
      marker: null
    }
  },
  mounted () {
    // Load Google Maps API script
    this.loadGoogleMaps(() => {
      this.initMap()
    })
  },
  methods: {
    loadGoogleMaps (callback) {
      if (!window.google) {
        const script = document.createElement('script')
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD47kEC4Hly-NuZyd4qY7HJTqjGyCSIBp8'
        script.onload = callback
        document.head.appendChild(script)
      } else {
        callback()
      }
    },
    initMap () {
      const mapOptions = {
        zoom: 15,
        center: { lat: 50.6257206, lng: 3.0403187 }
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions)

      this.marker = new google.maps.Marker({
        position: { lat: 50.6257206, lng: 3.0403187 },
        map: this.map
      })

      const infowindow = new google.maps.InfoWindow({
        content: '<p>Marker Location:' + this.marker.getPosition() + '</p>'
      })

      google.maps.event.addListener(this.marker, 'click', () => {
        infowindow.open(this.map, this.marker)
      })
    }
  }
}
</script>
