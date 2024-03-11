import { defineStore } from 'pinia'

export const useLocationStore = defineStore({
  id: 'location',
  state: () => ({
    longitude: null,
    latitude: null
  }),
  actions: {
    setLongitudeLongitude (latitude: null, longitude: null) {
      this.latitude = latitude
      this.longitude = longitude
    }
  }
})
