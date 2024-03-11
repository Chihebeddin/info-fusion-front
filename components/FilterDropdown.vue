<script setup>

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  selected: {
    type: Array,
    required: true
  }
})

const show = ref(false)

const emit = defineEmits(['filter'])

const filter = (e) => {
  emit('filter', e.target.value)
}

const categories = computed(() => {
  return [...new Set(props.items.map(item => item.category.name))]
})

</script>

<template>
  <div class="relative flex items-center w-full px-4">
    <button class="w-full flex items-center justify-center py-2 px-4 text-sm font-medium bg-white border border-gray-400 rounded-md hover:bg-gray-300 focus:ring-2 focus:outline-none focus:ring-gray-300" @click="show = !show">
      Filtre
    </button>
    <div v-if="show" class="absolute top-11 right-0 z-10 w-48 p-3 bg-white rounded-lg shadow">
      <h6 class="mb-3 text-sm font-medium">
        Catégories
      </h6>
      <ul class="space-y-2 text-sm">
        <li v-for="(category, index) in categories" :key="index">
          <input
            :id="`filter_otption_${index}`"
            type="checkbox"
            :value="category"
            class="w-4 h-4 text-sm"
            :checked="selected.includes(category)"
            @change="filter"
          >
          <label :for="`filter_otption_${index}`" class="ml-2 text-sm font-medium">{{ category }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>
