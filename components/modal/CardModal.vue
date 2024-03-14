<script>

import axios from 'axios'
import { useAuthStore } from '~/store/auth.module'

export default {
  props: {
    show: { type: Boolean }
  },
  data () {
    return {
      auth: useAuthStore(),
      amount: '',
      error: ''
    }
  },
  methods: {
    refund () {
      setTimeout(() => {
        axios.put(`http://localhost:8080/fidelitycards/refund?client=${this.auth.user.id}&solde=${this.amount}`).then((res) => {
          if (res.status === 200) {
          // to do
          }
        })
          .catch((error) => {
            if (error.response) {
            // La requête a été faite et le serveur a répondu avec un code d'erreur
              if (error.response.status === 400) {
                this.error = error.response.data
                console.log('error : ', this.error)
              }
            }
          })
      }, 2000)
    }
  }
}

</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-400">
          <h3 class="text-lg font-semibold text-gray-dark">
            Rechargez votre carte de fidélité/paiement
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-400 hover:text-gray-dark rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-toggle="crud-modal"
            @click="$emit('close')"
          >
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="modal-body">
          <!-- Modal body -->
          <form @submit.prevent="">
            <div v-if="error" class="text-red font-semibold mb-5 text-sm">
              <p>{{ error }}</p>
            </div>

            <div class="w-fit relative z-0 mb-5 group">
              <input
                v-model="amount"
                type="text"
                name="floating_price"
                class="block py-2.5 px-0 w-fit text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                required
              >
              <label
                for="floating_price"
                class="peer-focus:font-bold absolute text-lg text-gray-dark dark:text-gray-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-teal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Montant</label>
            </div>

            <CreditCartInput />

            <button
              type="submit"
              class="w-fit mt-5 flex items-center text-white bg-teal hover:bg-teal-700 focus:ring-2 focus:outline-none focus:ring-teal-light font-bold rounded-lg text-sm px-5 py-2.5 text-center"
              @click="refund"
            >
              Recharger
            </button>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  inset: 0px;
  transition: opacity 0.3s ease;
}

.modal-container {
  max-width: 42rem;
  max-height: 100%;
  margin: auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-body {
  padding: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
