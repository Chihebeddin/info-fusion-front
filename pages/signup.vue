<script>
import { addClient, addShop } from '../services/userService'
import ClientForm from '~/components/signup/ClientForm.vue'
import ShopForm from '~/components/signup/ShopForm.vue'
import { useLocationStore } from '@/store/location'

export default {
  components: { ClientForm, ShopForm },

  setup () {
    useHead({
      title: 'Inscription'
    })
  },

  data () {
    return {
      picked: 'Client',
      formData: {
        email: '',
        password: '',
        confirmpassword: ''
      },
      selectedTypes: []
    }
  },

  methods: {
    async onSubmit () {
      const locationStore = useLocationStore()
      const longitude = locationStore.longitude
      const latitude = locationStore.latitude
      console.log(longitude)
      if (this.picked === 'Client') {
        const firstnameValue = this.$refs.clientFormRef.$refs.firstnameInput.value
        const lastnameValue = this.$refs.clientFormRef.$refs.lastnameInput.value
        const birthdateValue = this.$refs.clientFormRef.$refs.birthdateInput.value
        addClient(
          this.formData.email,
          this.formData.password,
          this.formData.confirmpassword,
          firstnameValue,
          lastnameValue,
          this.formData.phone,
          Date.parse(birthdateValue)
        )
      } else if (this.picked === 'Shop') {
        const nameValue = this.$refs.shopFormRef.$refs.shopname.value
        const adresseValue = this.$refs.shopFormRef.$refs.address.value
        const openningValue = this.$refs.shopFormRef.$refs.openning.value
        const closingValue = this.$refs.shopFormRef.$refs.closing.value
        const imgValue = this.$refs.shopFormRef.$refs.image.files[0]
        const selectedTypes = this.$refs.shopFormRef.selectedTypes
        console.log(selectedTypes)
        // const formData = new FormData()
        // formData.append('image', imgValue)
        console.log(imgValue)
        console.log(this.formData.password)
        addShop(
          nameValue,
          adresseValue,
          this.formData.phone,
          openningValue,
          closingValue,
          imgValue,
          this.formData.email,
          longitude,
          latitude,
          selectedTypes,
          this.formData.password,
          this.formData.confirmpassword
        )
      }
      await this.$router.push('/signin')
    }
  }

}
</script>

<template>
  <div class="my-20 w-auto mx-auto">
    <section>
      <div class="flex flex-col items-center justify-center">
        <a href="" class="flex items-center mb-6 text-2xl font-semibold text-gray dark:text-gray-dark">
          <img class="w-20 h-18 mr-2" src="../assets/images/shoploc-logo.png" alt="">
          ShopLoc
        </a>
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-400"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray md:text-2xl dark:text-gray-dark">
              Créez un compte
            </h1>
            <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit">
              <div class="flex">
                <div class="flex items-center mr-4">
                  <input
                    id="inline-radio"
                    v-model="picked"
                    value="Shop"
                    type="radio"
                    name="inline-radio-group"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  >
                  <label for="inline-radio" class="ml-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Commerçant</label>
                </div>
                <div class="flex items-center mr-4">
                  <input
                    id="inline-2-radio"
                    v-model="picked"
                    value="Client"
                    type="radio"
                    name="inline-radio-group"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked
                  >
                  <label for="inline-2-radio" class="ml-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Client</label>
                </div>
              </div>

              <ClientForm v-if="picked === 'Client'" ref="clientFormRef" />
              <ShopForm v-else-if="picked === 'Shop'" ref="shopFormRef" :selectedtypes="selectedTypes" />

              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label for="phone" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray">Numéro de téléphone</label>
                  <input
                    id="phone"
                    v-model="formData.phone"
                    type="tel"
                    name="phone"
                    class="bg-gray-50 border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="01 23 45 67 89"
                    pattern="0[1-9][0-9]{8}"
                    required
                  >
                </div>

                <div class="w-full md:w-1/2 px-3">
                  <label for="email" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Email</label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    name="email"
                    class="bg-gray-50 border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@email.com"
                    required
                  >
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label for="password" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray-dark">Mot de
                    passe</label>
                  <input
                    id="password"
                    v-model="formData.password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label
                    for="confirm-password"
                    class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray-dark"
                  >Confirmer le mot de passe</label>
                  <input
                    id="confirmpassword"
                    v-model="formData.confirmpassword"
                    type="password"
                    name="confirmpassword"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                </div>
              </div>
              <button
                type="submit"
                class="w-full text-gray-dark bg-teal hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal dark:hover:bg-teal-700 dark:focus:ring-teal"
              >
                S'inscrire
              </button>
              <i class="text-sm font-light text-gray dark:text-gray">
                Déjà un compte ? <NuxtLink to="/signin" class="font-bold text-teal hover:underline dark:text-teal">
                  Se connecter
                </NuxtLink>
              </i>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
