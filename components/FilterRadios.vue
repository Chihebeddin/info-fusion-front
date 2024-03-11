<script setup>

const emit = defineEmits(['filter'])

const filter = (e) => {
  emit('filter', e.target.value)
}

</script>

<template>
  <label class="flex mr-4 items-center flex-nowrap">
    <input type="radio" name="show" value="all" checked @change="filter">
    <span class="whitespace-nowrap ml-1">Tout</span>
  </label>

  <label class="flex mr-4 items-center flex-nowrap">
    <input type="radio" name="show" value="in" @change="filter">
    <span class="whitespace-nowrap ml-1">En stock</span>
  </label>

  <label class="flex mr-4 items-center flex-nowrap">
    <input type="radio" name="show" value="low" @change="filter">
    <span class="whitespace-nowrap ml-1">Stock faible</span>
  </label>

  <label class="flex mr-4 items-center flex-nowrap">
    <input type="radio" name="show" value="out" @change="filter">
    <span class="whitespace-nowrap ml-1">Rupture de stock</span>
  </label>
</template>
