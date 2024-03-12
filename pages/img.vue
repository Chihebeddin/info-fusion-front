<template>
  <div>
    <div id="map" style="height: 400px;" /><br><br><br><br><br><br>
    <button @click="showDirection">
      Afficher la direction
    </button>
  </div>
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
        content: '<p>Marker Location: ' + this.marker.getPosition() + '</p>'
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
              destination: { lat: 50.6257206, lng: 3.0403187 },
              travelMode: 'DRIVING'
            }

            directionsService.route(request, (result, status) => {
              if (status === 'OK') {
                directionsDisplay.setDirections(result)
              } else {
                window.alert('Impossible de trouver un itinéraire.')
              }
            })
          },
          () => {
            window.alert('La géolocalisation a échoué.')
          }
        )
      } else {
        window.alert('La géolocalisation n\'est pas supportée par votre navigateur.')
      }
    }
  }
}
</script>
