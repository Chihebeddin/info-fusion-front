<script>
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  data () {
    return {
      orderId: '',
      contents: ref([]),
      isLoading: false
    }
  },
  mounted () {
    this.orderId = useRoute().params.id
    this.getContent(this.orderId)
  },
  methods: {
    async getContent (orderId) {
      this.isLoading = true
      await axios.get(`http://localhost:8080/contains/${orderId}`).then((res) => {
        this.isLoading = false
        this.contents = res.data
      })
    }
  }
}

definePageMeta({
  layout: false,
  middleware: ['auth']
})

</script>

<template>
  <div class="p-4 sm:ml-64">
    <!-- Sidebar Content Here -->
    <DefaultSidebar />
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4">
      <div class="flex justify-between">
        <h1 class="p-5 text-2xl font-bold text-gray-dark">
          Détails de la commande
        </h1>
      </div>

      <div class="bg-gray-light dark:bg-gray-light rounded-sm">
        <div v-if="isLoading">
          <LoadingSkeleton />
        </div>
        <div v-else>
          <section class="w-2/4 mt-8 mx-auto lg:py-0 rounded-lg shadow">
            <div class="p-4 px-8 py-1">
              <div v-for="content in contents" :key="content.id" class="flow-root -my-6 divide-y divide-gray-dark">
                <div class="flex py-5">
                  <div class="ml-4 flex flex-1 flex-col">
                    <div>
                      <div class="flex justify-between text-lg font-medium text-gray-900">
                        <div class="w-72">
                          <div class="flex p-1 divide-x divide-gray-400">
                            {{ content.quantity }}x
                            <div class="ps-4">
                              {{ content.product.name }}
                            </div>
                          </div>
                        </div>
                        <p class="ml-4">
                          {{ content.product.price }} €
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="border-t border-gray-400 py-2.5 my-5">
                <button
                  type="submit"
                  class="mt-5 font-semibold text-center"
                >
                  Télécharger le reçu
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
