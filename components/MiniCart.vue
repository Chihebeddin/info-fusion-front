<script setup>
// import axios from 'axios'
// import ModalProduct from './modal/ModalProduct.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const searchFilter = ref('')

const filteredItems = computed(() => {
  if (searchFilter.value !== '') {
    return props.items.filter(item =>
      item.name.includes(searchFilter.value) || item.category.name.includes(searchFilter.value))
  } else {
    return props.items
  }
})

const handleSearch = (search) => {
  searchFilter.value = search
}

const showModal = ref(false)
const msg = ref('')

let nb = ref(0)
const change = (id) => {
  nb = id
}

</script>

<template>
  <div>
    <div class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 pb-4">
      <SearchForm @search="handleSearch" />
    </div>

    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <ModalProduct :id="nb" :key="nb" :show="showModal" :msg="msg" @close="showModal = false; nb=0" />
    </Teleport>
    <div class="mt-2 grid grid-cols-4 md:grid-cols-3 gap-5">
      <div
        v-for="product in filteredItems"
        :key="product.id"
      >
        <div class="bg-gray-light rounded-md">
          <div class="grid grid-cols-2">
            <div class="row-span-3">
              <img src="../assets/images/croissant.jpg" class="rounded-l-md object-contain overflow-hidden size-32">
            </div>
            <h1 class="mt-1 mr-2 h-20 leading-6 tracking-tight text-ellipsis overflow-hidden">
              {{ product.name }}
            </h1>
            <div class="flex justify-between">
              <span v-if="product.quantity >= product.safetyStock " class="inline-flex items-center text-green-dark text-sm font-medium rounded-full">
                <span class="w-2 h-2 me-1 bg-green rounded-full" />
                {{ product.quantity }}
              </span>
              <span v-else-if="product.quantity < product.safetyStock && product.quantity >= 1 " class="inline-flex items-center text-orange-dark text-sm font-medium rounded-full">
                <span class="w-2 h-2 me-1 bg-orange rounded-full" />
                {{ product.quantity }}
              </span>
              <span v-else class="inline-flex items-center text-red-dark text-sm font-medium rounded-full">
                <span class="w-2 h-2 me-1 bg-red rounded-full" />
                {{ product.quantity }}
              </span>
              <button
                class="w-fit text-gray hover:text-gray-dark font-semibold rounded-lg px-2.5 py-2.5 text-center"
                @click="showModal = true; change(product.id); msg = 'stock'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
