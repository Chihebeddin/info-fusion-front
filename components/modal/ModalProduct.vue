<script>

import axios from 'axios'
import { useAuthStore } from '~/store/auth.module'

export default {
  props: {
    show: { type: Boolean },
    msg: {
      type: String,
      required: true
    },
    id: { type: Number, default: 0, required: false }
  },
  data () {
    return {
      auth: useAuthStore(),
      categories: [],
      product: {
        name: '',
        price: '',
        quantity: '',
        safetyStock: ''
      },
      selected: '',
      toAdd: ''
    }
  },
  beforeMount () {
    if (this.$props.id !== 0) {
      this.getProduct(this.$props.id)
    }
  },
  mounted () {
    this.getCategories()
    console.log('user : ', this.auth.user)
  },
  methods: {
    async createProduct () {
      await axios.post(`http://localhost:8080/products/create?shop=${this.auth.user.id}&ctg=${this.selected}`, this.product, {
      }).then((res) => {
        if (res.status === 200) {
          localStorage.setItem('success', 'Nouveau produit enregistré avec succès !')
          navigateTo('/shops/products')
        }
      })
    },
    async getProduct (productId) {
      // this.isLoading = true
      await axios.get(`http://localhost:8080/products/${productId}`).then((res) => {
        // this.isLoading = false
        this.product = res.data
        this.selected = res.data.category.id
      })
    },
    async updateProduct () {
      // this.isLoading = true
      await axios.put(`http://localhost:8080/products/${this.product.id}`, this.product).then((res) => {
        if (res.status === 200) {
          // this.isLoading = false
          localStorage.setItem('success', 'Modification enregistrée avec succès !')
          navigateTo('/shops/products')
        }
      })
    },
    async updateStock () {
      await axios.put(`http://localhost:8080/products/stock/${this.product.id}?stock=${this.toAdd}`).then((res) => {
        if (res.status === 200) {
          // this.isLoading = false
          localStorage.setItem('success', 'Modification enregistrée avec succès !')
          navigateTo('/shops/stocks')
        }
      })
    },
    getCategories () {
      axios.get('http://localhost:8080/categories').then((res) => {
        this.categories = res.data
      })
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
          <h3 v-if="msg === 'add'" class="text-lg font-semibold text-gray-dark">
            Nouveau produit
          </h3>
          <h3 v-else-if="msg === 'edit'" class="text-lg font-semibold text-gray-dark">
            Modification de produit
          </h3>
          <h3 v-else-if="msg === 'stock'" class="text-lg font-semibold text-gray-dark">
            Réapprovisionnement
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
          <form class="md:p-5" @submit.prevent="">
            <div class="grid grid-cols-2 md:gap-6">
              <div class="col-span-2 relative z-0 w-full mb-5 group">
                <input
                  v-if="msg === 'stock'"
                  v-model="product.name"
                  type="text"
                  name="floating_product_name"
                  class="block py-2.5 px-0 w-full text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                  disabled
                >
                <input
                  v-else
                  v-model="product.name"
                  type="text"
                  name="floating_product_name"
                  class="block py-2.5 px-0 w-full text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                  required
                >
                <label
                  for="floating_product_name"
                  class="peer-focus:font-bold absolute text-lg text-gray-dark dark:text-gray-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-teal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Nom du produit</label>
              </div>
            </div>
            <div class="grid grid-cols-2 md:gap-6">
              <div v-if="msg === 'add'" class="relative z-0 w-fit mb-5 group">
                <input
                  v-model="product.quantity"
                  type="number"
                  min="0"
                  max="500"
                  name="floating_quantity"
                  class="block py-2.5 px-0 w-fit text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                  required
                >
                <label
                  for="floating_quantity"
                  class="peer-focus:font-bold absolute text-lg text-gray-dark dark:text-gray-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-teal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Quantité</label>
              </div>
              <div v-if="msg === 'stock'" class="relative z-0 w-fit mb-5 group">
                <input
                  v-model="product.quantity"
                  type="number"
                  name="floating_quantity"
                  class="block py-2.5 px-0 w-fit text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                  disabled
                >
                <label
                  for="floating_quantity"
                  class="peer-focus:font-bold absolute text-lg text-gray-dark dark:text-gray-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-teal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Quantité actuelle</label>
              </div>
              <div v-if="msg === 'stock'" class="relative z-0 w-fit mb-5 group">
                <input
                  v-model="toAdd"
                  type="number"
                  min="0"
                  max="500"
                  name="floating_quantity"
                  class="block py-2.5 px-0 w-fit text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                  required
                >
                <label
                  for="floating_quantity"
                  class="peer-focus:font-bold absolute text-lg text-gray-dark dark:text-gray-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-teal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Quantité à ajouter</label>
              </div>
              <div v-if="msg === 'add' || msg === 'edit'" class="relative z-0 w-fit mb-5 group">
                <input
                  v-model="product.safetyStock"
                  type="number"
                  min="0"
                  name="floating_safety_stock"
                  class="block py-2.5 px-0 w-fit text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                  required
                >
                <label
                  for="floating_safety_stock"
                  class="peer-focus:font-bold absolute text-lg text-gray-dark dark:text-gray-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-teal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Stock de sécurité</label>
              </div>
              <div v-if="msg === 'add' || msg === 'edit'" class="w-fit relative z-0 mb-5 group">
                <input
                  v-model="product.price"
                  type="text"
                  name="floating_price"
                  class="block py-2.5 px-0 w-fit text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                  required
                >
                <label
                  for="floating_price"
                  class="peer-focus:font-bold absolute text-lg text-gray-dark dark:text-gray-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-teal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Prix (euros)</label>
              </div>
              <div v-if="msg === 'add' || msg === 'edit'" class="w-fit relative z-0 mb-5 group">
                <select
                  v-model="selected"
                  class="block py-2.5 px-0 w-fit text-lg text-gray-dark bg-transparent border-0 border-b-2 border-gray appearance-none focus:outline-none focus:ring-0 focus:border-teal peer"
                >
                  <option disabled value="">
                    Sélectionnez une catégorie
                  </option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <label
                  for="floating_category"
                  class="peer-focus:font-bold absolute text-lg text-gray-dark dark:text-gray-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-teal peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Catégorie</label>
              </div>
            </div>
            <div v-if="msg === 'add' || msg === 'edit'" class="grid md:grid-cols-2 md:gap-6">
              <div class="col-span-2 relative z-0 w-full mb-5 group">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-auto border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-light">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p class="mb-2 text-sm text-gray dark:text-gray-400"><span class="font-semibold">Cliquez pour télécharger</span> ou glissez une image</p>
                    <p class="text-xs text-gray dark:text-gray-400">PNG or JPG</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                  >
                </label>
              </div>
            </div>
            <button
              v-if="msg === 'add'"
              type="submit"
              class="w-fit flex items-center text-white bg-teal hover:bg-teal-700 focus:ring-2 focus:outline-none focus:ring-teal-light font-bold rounded-lg text-sm px-5 py-2.5 text-center"
              @click="createProduct"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 pr-1">
                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
              </svg> Ajouter
            </button>
            <button
              v-else-if="msg === 'edit'"
              type="submit"
              class="w-fit flex items-center text-white bg-teal hover:bg-teal-700 focus:ring-2 focus:outline-none focus:ring-teal-light font-bold rounded-lg text-sm px-5 py-2.5 text-center"
              @click="updateProduct"
            >
              Modifier
            </button>
            <button
              v-else-if="msg === 'stock'"
              type="submit"
              class="w-fit flex items-center text-white bg-teal hover:bg-teal-700 focus:ring-2 focus:outline-none focus:ring-teal-light font-bold rounded-lg text-sm px-5 py-2.5 text-center"
              @click="updateStock"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 pr-1">
                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
              </svg> Réapprovisionner
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
