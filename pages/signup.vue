<script>
import ClientForm from '~/components/signup/ClientForm.vue'
import ShopForm from '~/components/signup/ShopForm.vue'
export default {
  components: { ClientForm, ShopForm },
  data () {
    return {
      picked: 'Client'
    }
  }
}
</script>

<template>
  <div>
    <section>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray dark:text-gray-900">
          <img class="w-8 h-8 mr-2" src="" alt="">
          ShopLoc
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray md:text-2xl dark:text-gray-900">
              Créez un compte
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
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
                  <label for="inline-radio" class="ml-2 text-sm font-bold text-gray-900 dark:text-gray">Commerçant</label>
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
                  <label for="inline-2-radio" class="ml-2 text-sm font-bold text-gray-900 dark:text-gray">Client</label>
                </div>
                <div class="flex items-center mr-4">
                  <input
                    id="inline-3-radio"
                    v-model="picked"
                    value="Other"
                    type="radio"
                    name="inline-radio-group"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  >
                  <label for="inline-3-radio" class="ml-2 text-sm font-bold text-gray-900 dark:text-gray">Autre</label>
                </div>
              </div>

              <ClientForm v-if="picked === 'Client'" />
              <ShopForm v-else-if="picked === 'Shop'" />

              <div>
                <label for="email" class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@email.com"
                  required
                >
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label for="password" class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray">Mot de passe</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label for="confirm-password" class="block mb-2 text-sm font-bold text-gray-900 dark:text-gray">Confirmer le mot de passe</label>
                  <input
                    id="confirm-password"
                    type="password"
                    name="confirm-password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                </div>
              </div>
              <button type="submit" class="w-full text-gray-900 bg-teal hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal dark:hover:bg-teal-700 dark:focus:ring-teal">
                Créer un compte
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Déjà un compte ? <NuxtLink to="/signin" class="font-bold text-teal hover:underline dark:text-teal">
                  Connectez-vous
                </NuxtLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
