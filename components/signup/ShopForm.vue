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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedFile: null
    }
  },
  methods: {
    handleFileUpload (event) {
      this.selectedFile = event.target.files[0]
      const formData = new FormData()
      formData.append('image', this.selectedFile)
      console.log(formData)
    }
  }
}
</script>
