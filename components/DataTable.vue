<script setup>
import axios from 'axios'
import ModalProduct from './modal/ModalProduct.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const searchFilter = ref('')
const radioFilter = ref('')
const categoryFilter = ref([])
const check = ref(false)

const filteredItems = computed(() => {
  let items = props.items

  switch (radioFilter.value) {
    case 'in':
      items = items.filter(item => item.quantity >= item.safetyStock)
      break
    case 'low':
      items = items.filter(item => item.quantity < item.safetyStock && item.quantity >= 1)
      break
    case 'out':
      items = items.filter(item => item.quantity < 1)
      break
  }

  if (categoryFilter.value.length) {
    items = items.filter(item => categoryFilter.value.includes(item.category.name))
  }

  if (searchFilter.value !== '') {
    items = items.filter(item =>
      item.name.includes(searchFilter.value) || item.category.name.includes(searchFilter.value))
  }
  return items
})

const handleSearch = (search) => {
  searchFilter.value = search
}

const handleRadioFilter = (filter) => {
  radioFilter.value = filter
}

const handleCheckboxFilter = (filter) => {
  if (categoryFilter.value.includes(filter)) {
    check.value = false
    return categoryFilter.value.splice(categoryFilter.value.indexOf(filter), 1)
  }
  check.value = true
  return categoryFilter.value.push(filter)
}

const deleteProduct = async (productId) => {
  if (confirm('Confirmez la suppression ?')) {
    await axios.delete(`http://localhost:8080/products/${productId}`).then((res) => {
      if (res.status === 200) {
        localStorage.setItem('success', 'Produit supprimé avec succès !')
      }
    })
  }
}

const showModal = ref(false)
const msg = ref('')

let nb = ref(0)
const change = (id) => {
  nb = id
}

</script>

<template>
  <div class="relative">
    <div class="flex items-center justify-between mb-4">
      <!-- Search bar -->
      <SearchForm @search="handleSearch" />

      <div>
        <!-- Add button -->
        <button
          id="show-modal"
          class="w-fit text-white font-semibold bg-teal hover:bg-teal-700 rounded-lg px-5 py-2.5 text-center dark:bg-teal dark:hover:bg-teal-700"
          @click="showModal = true; msg = 'add'"
        >
          Ajouter un produit
        </button>
      </div>

      <div class="flex items-center justify-end text-sm font-semibold">
        <!-- Radio buttons -->
        <FilterRadios @filter="handleRadioFilter" />

        <!-- List of filters for categories -->
        <FilterDropdown :items="items" :selected="categoryFilter" @filter="handleCheckboxFilter" />
      </div>
    </div>

    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <ModalProduct :id="nb" :key="nb" :show="showModal" :msg="msg" @close="showModal = false; nb=0" />
    </Teleport>

    <table class="w-full text-sm text-left rtl:text-right text-gray dark:text-gray-400">
      <thead class="text-sm text-gray-dark uppercase bg-gray-400 dark:text-gray-dark">
        <tr>
          <th scope="col" class="px-4 py-3">
            Nom du produit
          </th>
          <th scope="col" class="px-4 py-3">
            Prix
          </th>
          <th scope="col" class="px-4 py-3">
            Disponibilté
          </th>
          <th scope="col" class="px-4 py-3">
            Catégorie
          </th>
          <th scope="col" class="px-4 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id" class="border-b dark:border-gray-400 hover:bg-gray-light dark:hover:bg-gray-light">
          <th scope="row" class="px-4 py-3 font-semibold text-gray-dark dark:text-gray-dark">
            {{ item.name }}
          </th>
          <td class="px-4 py-3 text-gray-dark font-semibold">
            {{ item.price }} €
          </td>
          <td class="px-4 py-3 text-gray-dark">
            <span v-if="item.quantity >= item.safetyStock" class="inline-flex items-center bg-green-light text-green-dark text-xs font-medium px-2.5 py-0.5 rounded-full">
              <span class="w-2 h-2 me-1 bg-green rounded-full" />
              En stock
            </span>
            <span v-else-if="item.quantity < item.safetyStock && item.quantity >= 1" class="inline-flex items-center bg-orange-light text-orange-dark text-xs font-medium px-2.5 py-0.5 rounded-full">
              <span class="w-2 h-2 me-1 bg-orange rounded-full" />
              Stock faible
            </span>
            <span v-else class="inline-flex items-center bg-red-light text-red-dark text-xs font-medium px-2.5 py-0.5 rounded-full">
              <span class="w-2 h-2 me-1 bg-red rounded-full" />
              Rupture de stock
            </span>
          </td>
          <td class="px-4 py-3 text-gray-dark">
            {{ item.category.name }}
          </td>
          <td class="px-4 py-3 space-x-2.5">
            <button
              class="w-fit text-white font-semibold bg-green hover:bg-green-dark rounded-lg px-2.5 py-2.5 text-center dark:bg-green dark:hover:bg-green-dark"
              @click="showModal = true; msg = 'edit'; change(item.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
            </button>
            <button
              class="w-fit text-white font-semibold bg-red hover:bg-red-dark rounded-lg px-2.5 py-2.5 text-center"
              @click="deleteProduct(item.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
