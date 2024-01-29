<script setup>
import { useAuthStore } from '../store/auth.module.ts'

// const router = useRouter()
const store = useAuthStore()
const formData = {
  username: '',
  password: ''
}

const onSubmit = async () => {
  await store.login(formData.username, formData.password).then(async () => {
    try {
      const response = await store.fetchUserInfo()

      console.log("hghghghghg "+response.data)

      if (response && response.data && response.data.role) {
        store.user = response.data
        console.log('response ' + JSON.stringify(store.user.role))
        console.log('token: ', store.token)
        if (store.user.role === 'ROLE_SHOP') {
          navigateTo('/shops/dashboard', { replace: true })
        } else if (store.user.role === 'ROLE_CLIENT') {
          navigateTo('/customers/shops/', { replace: true })
        }
      } else {
        console.log('User not found')
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des informations utilisateur:', error)
    }
  })
}

useHead({
  title: 'Connexion'
})

</script>

<template>
  <div class="my-20 w-auto mx-auto">
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center ">
        <a href="" class="flex items-center mb-6 text-2xl font-semibold text-gray dark:text-gray-dark">
          <img class="w-20 h-18 mr-2" src="../assets/images/shoploc-logo.png" alt="">
          ShopLoc
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-400">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray md:text-2xl dark:text-gray-dark">
              Connexion
            </h1>
            <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit()">
              <div>
                <label for="username" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray">Login</label>
                <input
                  id="username"
                  v-model="formData.username"
                  type="username"
                  name="username"

                  class="bg-gray-50 border border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                >
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-bold text-gray-dark dark:text-gray">Mot de passe</label>
                <input
                  id="password"
                  v-model="formData.password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border border-gray-400 text-gray-dark sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
              </div>
              <div class="flex items-center justify-between">
                <a href="#" class="text-sm font-medium text-teal hover:underline dark:text-teal">Mot de passe oublié ?</a>
              </div>
              <button type="submit" class="w-full text-gray-dark bg-teal hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal dark:hover:bg-teal-700 dark:focus:ring-teal">
                Se connecter
              </button>
              <i class="text-sm font-light text-gray dark:text-gray">
                Pas encore de compte ? <NuxtLink to="/signup" class="font-bold text-teal hover:underline dark:text-teal-500">
                  S'inscrire
                </NuxtLink>
              </i>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
