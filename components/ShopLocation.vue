<template>
  <div id="map" style="height: 400px;" />
  <button @click="showDirection">
    Afficher la direction
  </button>
</template>

<script>
export default {
  props: {
    longitude: {
      type: Number,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    }
  },
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
        center: { lat: this.latitude, lng: this.longitude }
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions)

      this.marker = new google.maps.Marker({
        position: { lat: this.latitude, lng: this.longitude },
        map: this.map
      })

      const infowindow = new google.maps.InfoWindow({
        content: '<p>Marker Location:' + this.marker.getPosition() + '</p>'
      })

      google.maps.event.addListener(this.marker, 'click', () => {
        infowindow.open(this.map, this.marker)
      })
    },
    showDirection () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }

            console.log(currentPosition)
            const directionsService = new google.maps.DirectionsService()
            const directionsDisplay = new google.maps.DirectionsRenderer()

            directionsDisplay.setMap(this.map)

            const request = {
              origin: currentPosition,
              destination: { lat: this.latitude, lng: this.longitude },
              travelMode: 'DRIVING'
            }

            directionsService.route(request, (result, status) => {
              if (status === 'OK') {
                directionsDisplay.setDirections(result)
                const duration = result.routes[0].legs[0].duration.text
                window.alert('Durée estimée pour atteindre la destination: ' + duration)
              } else {
                window.alert('Impossible de trouver un itinéraire.')
              }
            })
          }
        )
      } else {
        window.alert('La géolocalisation n\'est pas supportée par votre navigateur.')
      }
    }
  }
}
</script>
