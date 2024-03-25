<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
}

</script>

<template>
  <div class="mb-4 relative flex justify-between items-center">
    <div class="flex">
      <div>
        <div class="flex relative">
          <div class="text-2xl font-semibold">
            <span>{{ title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end">
      <div class="flex">
        <NuxtLink :to="link" class="text-sm font-semibold">
          Voir tout
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
