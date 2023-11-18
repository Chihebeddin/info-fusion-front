<template>
  <div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label for="shopname" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray">Nom du commerce</label>
        <input
          id="shopname"
          type="text"
          name="shopname"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Le Fournil"
          required
        >
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label for="address" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray">Adresse</label>
        <input
          id="address"
          type="text"
          name="address"
          placeholder="100 Avenue de la Paix"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
      </div>
    </div>
  </div>
</template>
