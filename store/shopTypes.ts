import { defineStore } from 'pinia'

export const useTypesStore = defineStore({
  id: 'types',
  state: () => ({
    selectedTypes: []
  }),
  actions: {
    setSelectedTypes (types: never[]) {
      this.selectedTypes = types
    }
  }
})
