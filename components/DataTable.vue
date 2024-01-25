<script setup>
import axios from 'axios'

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
      item.name.includes(searchFilter.value))
  } else {
    return props.items
  }
})

const handleSearch = (search) => {
  searchFilter.value = search
}

const deleteProduct = async (event, productId) => {
  if (confirm('Confirmez la suppression ?')) {
    event.target.innerText = 'Deleting...'
    await axios.delete(`http://localhost:8080/products/${productId}`).then(() => {
      return props.items.filter(item => item.id !== productId)
    })
  }
}

</script>

<template>
  <div>
    <div class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 pb-4">
      <SearchForm @search="handleSearch" />
      <NuxtLink to="/shops/products/new">
        <button class="w-fit text-white font-semibold bg-teal hover:bg-teal-700 rounded-lg px-5 py-2.5 text-center dark:bg-teal dark:hover:bg-teal-700">
          Ajouter un produit
        </button>
      </NuxtLink>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray dark:text-gray-400">
      <thead class="text-sm text-gray-dark uppercase dark:bg-gray-light dark:text-gray-dark">
        <tr>
          <th scope="col" class="px-4 py-3">
            Nom du produit
          </th>
          <th scope="col" class="px-4 py-3">
            Prix
          </th>
          <th scope="col" class="px-4 py-3">
            Quantité
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
            {{ item.quantity }}
          </td>
          <td class="px-4 py-3 space-x-2.5">
            <NuxtLink :to="`/shops/products/${ item.id }`">
              <button class="w-fit text-white font-semibold bg-green hover:bg-green-dark rounded-lg px-5 py-2.5 text-center dark:bg-green dark:hover:bg-green-dark">
                Modifier
              </button>
            </NuxtLink>
            <button
              class="w-fit text-white font-semibold bg-red hover:bg-red-dark rounded-lg px-5 py-2.5 text-center dark:bg-red dark:hover:bg-red-dark"
              @click="$event => deleteProduct($event, item.id)"
            >
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
