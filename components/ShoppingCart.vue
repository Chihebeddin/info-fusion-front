<script>

import axios from 'axios'
import { useAuthStore } from '../store/auth.module.ts'

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      store: useAuthStore(),
      picked: ref('Cash')
    }
  },
  methods: {
    computeTotal () {
      const tab = this.$props.items.map(item => item.quantity * item.price)
      return tab.reduce((acc, value) => acc + value, 0).toFixed(2)
    },
    async submitOrder () {
      await axios.post(`http://localhost:8080/orders/create?client=${this.store.user.id}`, this.$props.items).then((res) => {
        if (res.status === 200) {
          localStorage.setItem('success', 'Votre commande a été enregistrée avec succès !')
          navigateTo('/customers/orders')
        }
      })
    }
  }
}

</script>

<template>
  <div class="min-h-fit bg-white border border-gray-light rounded-xs shadow">
    <div v-if="items.length === 0">
      <div class="px-5 font-medium text-center text-xl text-gray-500">
        <div class="pt-8 pb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline-flex" width="40" height="40" viewBox="0 0 20 20">
            <path fill="currentColor" d="M18.121 3.271c-.295-.256-1.906-1.731-2.207-1.991c-.299-.259-.756-.28-1.102-.28H5.188c-.345 0-.802.021-1.102.28c-.301.26-1.912 1.736-2.207 1.991c-.297.256-.543.643-.464 1.192c.079.551 1.89 13.661 1.937 13.973A.67.67 0 0 0 4 19h12a.67.67 0 0 0 .648-.565c.047-.311 1.858-13.422 1.938-13.973c.078-.548-.168-.935-.465-1.191M10 11.973c-3.248 0-3.943-4.596-4.087-5.543H7.75c.276 1.381.904 3.744 2.25 3.744s1.975-2.363 2.25-3.744h1.838c-.145.947-.84 5.543-4.088 5.543M3.17 4.006L5 2h10l1.83 2.006z" />
          </svg>
          <p class="pt-2">
            Panier vide
          </p>
        </div>
      </div>
      <div class="p-4">
        <button
          type="submit"
          class="w-full text-gray-500 bg-gray-300 font-bold rounded-sm text-xl px-5 py-3 text-center"
          disabled=""
        >
          Finaliser la commande
        </button>
      </div>
    </div>
    <div v-else>
      <div id="content" class="overflow-y-auto" tabindex="-1">
        <div class="px-5 py-6 flex items-center justify-between">
          <h5 class="text-xl font-semibold leading-none text-gray-dark">
            Votre commande
          </h5>
        </div>
        <div class="px-5">
          <div>
            <p class="text-sm text-gray">
              Tout produit indisponible sera retiré de la commande finale
            </p>
          </div>
          <div class="pt-4">
            <div class="my-1 h-px bg-gray-500" role="separator" />
          </div>
          <div v-for="item in items" :key="item.id" class="pt-4">
            <div class="flex items-center justify-between">
              <div class="flex-1 mr-auto">
                <p class="inline-block text-base">
                  {{ item.name }}
                </p>
              </div>
              <div class="ml-3">
                <div class="inline-flex items-center">
                  <div class="pr-2 flex items-center justify-between">
                    <span class="text-teal pr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18.5" viewBox="0 0 32 32">
                        <path fill="currentColor" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" />
                      </svg>
                    </span>
                    <span class="text-center min-w-4">
                      {{ item.quantity }}
                    </span>
                    <span class="text-teal pl-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18.5" viewBox="0 0 32 32">
                        <path fill="currentColor" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5z" />
                      </svg>
                    </span>
                  </div>
                  {{ (item.price * item.quantity).toFixed(2) }} €
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col h-full">
          <div class="mt-6 mx-5 h-px bg-gray-500" role="separator" />
          <div class="px-5 pt-3">
            <h1>
              Mode de paiement
            </h1>
            <div class="flex items-center justify-between">
              <div class="flex-1 mr-auto">
                <div class="items-center inline-flex pt-2 align-baseline">
                  <input
                    id="cash"
                    v-model="picked"
                    type="radio"
                    value="Cash"
                    name="list-radio"
                    class="w-4 h-4 text-teal bg-gray-300 border-gray-400 focus:ring-teal-light dark:focus:ring-teal-light dark:ring-offset-gray-800 focus:ring-2"
                  >
                  <span class="pl-2">
                    <label for="cash" class="text-sm">Espèces</label>
                    <p id="cash-text" class="text-sm text-gray-500">
                      Payez directement en magasin
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex-1 mr-auto">
                <div class="items-center inline-flex pt-2 align-baseline">
                  <input
                    id="credit-card"
                    v-model="picked"
                    type="radio"
                    value="CreditCard"
                    name="list-radio"
                    class="w-4 h-4 text-teal bg-gray-300 border-gray-400 focus:ring-teal-light dark:focus:ring-teal-light dark:ring-offset-gray-800 focus:ring-2"
                  >
                  <span class="pl-2">
                    <label for="credit-card" class="text-sm">Carte bancaire</label>
                    <p id="credit-card-text" class="text-sm text-gray-500">
                      Ajoutez vos données de carte
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <CreditCartInput v-if="picked === 'CreditCard'" />
            <div class="flex items-center justify-between">
              <div class="flex-1 mr-auto">
                <div class="items-center inline-flex pt-2 align-baseline">
                  <input
                    id="fidelity-card"
                    v-model="picked"
                    type="radio"
                    value="FidelityCard"
                    name="list-radio"
                    class="w-4 h-4 text-teal bg-gray-300 border-gray-400 focus:ring-teal-light dark:focus:ring-teal-light dark:ring-offset-gray-800 focus:ring-2"
                  >
                  <span class="pl-2">
                    <label for="fidelity-card" class="text-sm">Carte fidélité/paiement</label>
                    <p id="fidelity-card-text" class="text-sm text-gray-500">
                      Solde actuel : €
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="mt-6 mx-5 h-px bg-gray-500" role="separator" />
          <div class="px-5 pt-3">
            <div class="flex items-center justify-between text-xl font-semibold leading-none text-gray-dark">
              <div class="flex-1 mr-auto">
                <p>Total</p>
              </div>
              <div class="ml-3">
                <span class="">
                  {{ computeTotal() }} €
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 relative">
        <div>
          <button
            type="submit"
            class="w-full text-white bg-teal hover:bg-teal-700 focus:ring-2 focus:outline-none focus:ring-teal-light font-semibold leading-none rounded-md text-xl px-6 py-3 text-center dark:bg-teal dark:hover:bg-teal-700 dark:focus:ring-teal"
            @click="submitOrder"
          >
            Finaliser la commande
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

#content {
  max-height: calc(calc(100vh - (24px * 2) - (73px + 73px)) - 80px);
}

</style>
