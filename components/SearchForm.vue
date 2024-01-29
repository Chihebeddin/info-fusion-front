<script setup>

const emit = defineEmits(['search'])

const search = (e) => {
  emit('search', e.target.value)
}

</script>

<template>
  <div>
    <label class="sr-only">Search</label>
    <div class="relative ml-1 mt-3">
      <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray dark:text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        type="text"
        class="block py-2 ps-10 text-md text-gray border border-gray-400 rounded-lg w-80 bg-gray-light focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for items"
        @input="search"
      >
    </div>
  </div>
</template>
