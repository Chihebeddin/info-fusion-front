<script setup>

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const computeTotal = () => {
  const tab = props.items.map(item => item.quantity * item.price)
  return tab.reduce((acc, value) => acc + value, 0).toFixed(2)
}

</script>

<template>
  <div class="p-4 bg-whiteborder border-gray-light rounded-sm shadow sm:p-8 dark:bg-white dark:border-gray-400">
    <div v-if="props.items.length === 0">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-dark">
          Panier
        </h5>
      </div>
      <div class="font-medium">
        Panier vide
      </div>
    </div>
    <div v-else>
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-dark">
          Votre commande
        </h5>
      </div>
      <div v-for="item in items" :key="item.id" class="flow-root -my-6 divide-y divide-gray-dark">
        <div class="flex py-6">
          <div class="ml-4 flex flex-1 flex-col">
            <div>
              <div class="flex justify-between text-lg font-medium text-gray-900">
                <div class="w-72">
                  {{ item.name }}
                </div>
                <p class="text-gray">
                  x{{ item.quantity }}
                </p>
                <p class="ml-4">
                  {{ (item.price * item.quantity).toFixed(2) }} €
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-400 py-2.5 mt-3">
        <div class="flex justify-between font-bold text-xl text-gray-dark mb-5">
          <p>Total</p>
          <p class="ml-4">
            {{ computeTotal() }} €
          </p>
        </div>
        <button
          type="submit"
          class="w-full mt-1 text-white bg-teal hover:bg-teal-700 focus:ring-2 focus:outline-none focus:ring-teal-light font-bold rounded-sm text-xl px-5 py-3 text-center dark:bg-teal dark:hover:bg-teal-700 dark:focus:ring-teal"
        >
          Finaliser la commande
        </button>
      </div>
    </div>
  </div>
</template>
