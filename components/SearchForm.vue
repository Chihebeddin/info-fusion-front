<script setup>

const props = defineProps({
  input: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['search'])

const search = (e) => {
  emit('search', e.target.value)
}

</script>

<template>
  <div>
    <label class="sr-only">{{ props.input }}</label>
    <div
      class="absolute flex items-center w-full font-semibold rounded-full h-9 bg-gray-400 left-1/2 max-w-full min-w-44"
      style="transform: translate(-50%, -50%);"
    >
      <div class="w-4 h-px" />

      <div class="self-center shrink-0 flex">
        <svg class="w-4 h-4 grow-0 shrink-0 basis-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>

      <div class="w-4 h-px" />

      <input
        type="text"
        class="overflow-hidden outline-none text-ellipsis flex-1 appearance-none bg-gray-400 placeholder-gray-500"
        :placeholder="props.input"
        @input="search"
      >

      <div class="w-2 h-px" />
    </div>
  </div>
</template>
