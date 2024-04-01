<script setup>

const maxAge = 16
const maxDate = ref('')

onMounted(() => {
  setMaxDate()
})

const setMaxDate = () => {
  const today = new Date()
  maxDate.value = (today.getFullYear() - maxAge) + '-12-12'
}

</script>

<template>
  <div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label for="firstname" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Prénom</label>
        <input
          id="firstname"
          ref="firstnameInput"
          type="text"
          name="firstname"
          class="bg-gray-50 border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
        >
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label for="lastname" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Nom</label>
        <input
          id="lastname"
          ref="lastnameInput"
          type="text"
          name="lastname"
          class="bg-gray-50 border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Doe"
          required
        >
      </div>
    </div>

    <div class="w-1/2">
      <label for="birthdate" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Date de naissance</label>
      <input
        id="birthdate"
        ref="birthdateInput"
        type="date"
        name="birthdate"
        :min="'1930-01-01'"
        :max="maxDate"
        class="appearance-none bg-gray-light border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      >
    </div>
  </div>
</template>
