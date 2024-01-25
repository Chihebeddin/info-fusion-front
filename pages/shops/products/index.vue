<script setup>

useHead({
  title: 'Produits'
})

/* const products = []
const categories = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3']
const scategories = ['Sous-catégorie 1', 'Sous-catégorie 2', 'Sous-catégorie 3', 'Sous-catégorie 4', 'Sous-catégorie 5']

for (let i = 0; i < 20; i++) {
  products.push({
    id: i,
    name: 'Produit ' + i,
    price: Math.floor(Math.random() * (100 - 1 + 1) + 1),
    category: categories[Math.floor(Math.random() * 3)],
    souscat: scategories[Math.floor(Math.random() * 5)]
  })
} */

const products = ref([])

onMounted(async () => {
  const response = await fetch('http://localhost:8080/products')
  products.value = await response.json()
})

</script>

<template>
  <div class="p-4 sm:ml-64">
    <!-- Sidebar Content Here -->
    <DefaultSidebar />
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4 px-4 py-8 md:py-12">
      <div class="flex justify-between">
        <h1 class="p-5 text-2xl font-bold text-gray-dark">
          Gestion des produits
        </h1>
      </div>

      <div class="relative overflow-x-auto sm:rounded-lg">
        <DataTable :items="products" />
      </div>
    </div>
  </div>
</template>
