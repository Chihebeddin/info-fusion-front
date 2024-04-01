<script setup>
import { useAuthStore } from '../store/auth.module.ts'

// const router = useRouter()
const store = useAuthStore()
const formData = {
  username: '',
  password: ''
}
// let errorMsg = ''

const onSubmit = async () => {
  await store.login(formData.username, formData.password).then(async () => {
    try {
      const response = await store.fetchUserInfo()

      if (response && response.data && response.data.role) {
        console.log('response ' + JSON.stringify(store.user))
        if (store.user.role === 'ROLE_SHOP') {
          navigateTo('/shops/dashboard', { replace: true })
        } else if (store.user.role === 'ROLE_CLIENT') {
          navigateTo('/', { replace: true })
        }
      } else {
        // errorMsg = 'User not found'
        console.log('User not found')
      }
    } catch (error) {
      // errorMsg = 'Une erreur'
      console.error('Une erreur s\'est produite lors de la récupération des informations utilisateur:', error)
    }
  })
}

</script>

<template>
  <div class="bg-gray-light h-screen">
    <div class="w-full mx-auto pt-16">
      <div class="flex flex-col items-center justify-center ">
        <div class="w-full bg-gray-light rounded-lg shadow border max-w-lg border-gray-300/70">
          <div class="p-8 space-y-6">
            <h1 class="text-2xl font-semibold leading-tight tracking-tight">
              Connexion
            </h1>
            <form class="space-y-4" @submit.prevent="onSubmit()">
              <div>
                <label for="username" class="block mb-2 text-sm font-semibold">Login</label>
                <input
                  id="username"
                  v-model="formData.username"
                  type="username"
                  name="username"

                  class="bg-gray-light border border border-gray-400 appearance-none rounded-md focus:outline-none focus:outline-offset-0 focus:outline-teal-700/50 block w-full p-2.5"
                  placeholder="yourname@company.com"
                  required
                >
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-semibold ">Mot de passe</label>
                <input
                  id="password"
                  v-model="formData.password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  class="bg-gray-light border border border-gray-400 appearance-none rounded-md focus:outline-none focus:outline-offset-0 focus:outline-teal-700/50 block w-full p-2.5"
                  required
                >
              </div>
              <div class="flex items-center justify-between">
                <a href="#" class="text-sm font-medium text-teal hover:text-teal-700 hover:underline">Mot de passe oublié ?</a>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-teal hover:bg-teal-700 focus:ring-2 focus:outline-none focus:ring-teal-light font-semibold rounded-md px-2.5 py-2.5 text-center"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
