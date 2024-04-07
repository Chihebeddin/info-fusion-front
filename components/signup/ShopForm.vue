<template>
  <div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label for="shopname" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Nom du commerce</label>
        <input
          id="shopname"
          ref="shopname"
          type="text"
          name="shopname"
          class="bg-gray-50 border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Le Fournil"
          required
        >
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label for="address" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Adresse</label>
        <input
          id="address"
          ref="address"
          v-model="address"
          type="text"
          name="address"
          placeholder="100 Avenue de la Paix"
          class="bg-gray-50 border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label for="openning" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Horraire
          d'ouverture</label>
        <input
          id="openning"
          ref="openning"
          type="time"
          name="openning"
          placeholder="08:00"
          class="bg-gray-50 border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label for="closing" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Horraire de
          fermeture</label>
        <input
          id="closing"
          ref="closing"
          type="time"
          name="closing"
          placeholder="17:00"
          class="bg-gray-50 border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label for="image" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Image</label>
        <input
          id="image"
          ref="image"
          type="file"
          name="image"
          class="bg-gray-50 border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          @change="handleFileUpload"
        >
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label for="types" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Type du shop</label>
        <div class="grid grid-cols-2 gap-x-4">
          <label v-for="(type, index) in shopTypes" :key="index" class="inline-flex items-center">
            <input v-model="selectedTypes" type="checkbox" :value="type" class="mr-2"> {{ type }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useLocationStore } from '@/store/location'

export default {
  data () {
    return {
      selectedFile: null,
      address: '',
      error: '',
      spinner: false,
      selectedTypes: []
    }
  },
  computed: {
    shopTypes () {
      return ['Boulangerie', 'Boucherie', 'Fleuriste', 'Epicerie', 'Poissonnerie', 'Fromagerie', 'Grande_Surface'] // Liste des types de magasins
    }
  },

  created () {
    this.loadGoogleMaps()
  },

  methods: {
    handleFileUpload (event) {
      this.selectedFile = event.target.files[0]
      const formData = new FormData()
      formData.append('image', this.selectedFile)
      console.log(formData)
    },

    initializeAutocomplete () {
      const autocomplete = new google.maps.places.Autocomplete(
        this.$refs.address,
        {
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(45.4215296, -75.6971931)
          )
        }
      )

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()

        const locationStore = useLocationStore()
        locationStore.setLongitudeLongitude(
          place.geometry.location.lat(),
          place.geometry.location.lng()
        )

        this.showLocationOnTheMap(
          place.geometry.location.lat(),
          place.geometry.location.lng()
        )
      })
    },

    loadGoogleMaps () {
      // Check if Google Maps API is already loaded
      if (typeof google === 'undefined') {
        // If not, load Google Maps API script
        const script = document.createElement('script')
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD47kEC4Hly-NuZyd4qY7HJTqjGyCSIBp8&libraries=places'
        script.onload = this.initializeAutocomplete
        document.head.appendChild(script)
      } else {
        // If already loaded, initialize the autocomplete directly
        this.initializeAutocomplete()
      }
    },
    locatorButtonPressed () {
      this.spinner = true

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            )

            this.showLocationOnTheMap(
              position.coords.latitude,
              position.coords.longitude
            )
          },
          () => {
            this.error =
                'Locator is unable to find your address. Please type your address manually.'
            this.spinner = false
            // console.log(error.message);
          }
        )
      } else {
        this.error = error.message
        this.spinner = false
        console.log('Your browser does not support geolocation API ')
      }
    },
    getAddressFrom (lat, long) {
      axios
        .get(
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
              lat +
              ',' +
              long +
              '&key=AIzaSyD47kEC4Hly-NuZyd4qY7HJTqjGyCSIBp8'
        )
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message
            console.log(response.data.error_message)
          } else {
            this.address = response.data.results[0].formatted_address
            // console.log(response.data.results[0].formatted_address);
          }
          this.spinner = false
        })
        .catch((error) => {
          this.error = error.message
          this.spinner = false
          console.log(error.message)
        })
    }

  }
}
</script>

<style>
  .ui.button,
  .dot.circle.icon {
    background-color: #ff5a5f;
    color: white;
  }

  .pac-icon {
    display: none;
  }

  .pac-item {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }

  .pac-item:hover {
    background-color: #ececec;
  }

  .pac-item-query {
    font-size: 16px;
  }

  #map {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  </style>
