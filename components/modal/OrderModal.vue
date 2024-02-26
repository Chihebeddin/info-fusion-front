<script setup>

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    default: 0
  }
})

</script>

<template>
  <div class="h-screen w-98 bg-whiteborder border-gray-light rounded-sm shadow dark:bg-white dark:border-gray-400">
    <div v-if="props.items.length === 0">
      <div class="absolute inset-0 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 ml-64">
          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
        </svg>
      </div>
    </div>
    <div v-else class="pt-5">
      <div v-for="item in items" :key="item.id" class="flow-root">
        <div class="flex py-2 mx-2">
          <div class="flex flex-1 flex-col">
            <div>
              <div class="max-h-fit flex justify-between text-base font-medium text-gray-900">
                <div class="">
                  <div class="flex p-1">
                    <span v-if="item.quantity >= 5" class="w-12 max-x-72 inline-flex items-center rounded-full">
                      <span class="w-2 h-2 me-1 bg-green rounded-full" /> {{ item.quantity }}x
                    </span>
                    <span v-else-if="item.quantity >= 1 && item.quantity < 5" class="w-12 max-x-72 inline-flex items-center rounded-full">
                      <span class="w-2 h-2 me-1 bg-orange rounded-full" /> {{ item.quantity }}x
                    </span>
                    <span v-else class="w-12 max-x-72 inline-flex items-center rounded-full">
                      <span class="w-2 h-2 me-1 bg-red rounded-full" /> {{ item.quantity }}x
                    </span>
                    <div class="object-contain w-72 ps-1 hyphens-auto" lang="fr">
                      {{ item.product.name }}
                    </div>
                  </div>
                </div>
                <p class="ml-2">
                  {{ item.product.price }} €
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 right-0 w-full">
        <div class="border-t border-gray-400 py-2.5 mt-3 mx-4">
          <div class="font-bold text-xl text-gray-dark mb-5">
            <p class="text-end">
              Total : {{ total.toFixed(2) }} €
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
