<script setup>
import { useAuthStore } from '~/store/auth.module'

const auth = useAuthStore()

const onLogout = async () => {
  auth.logout()
  await navigateTo('/signin', { replace: true })
}

const isUserLoggedIn = ref(false)

onMounted(() => {
  store.init()
  isUserLoggedIn.value = !!store.user
  console.log("isUserLoggedIn.value "+isUserLoggedIn.value)
})
</script>

<template>
  <div>
    <nav class="fixed top-0 z-50 w-full bg-teal-dark">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <a href="/" class="text-white font-bold text-2xl">ShopLoc</a>
            </div>
          </div>
          <div v-if="auth.token && auth.user.role === 'ROLE_SHOP'" class="hidden md:block">
            <div class="ml-10 flex items-baseline">
              <NuxtLink
                to="/shops/dashboard"
                class="text-white hover:bg-gray dark:hover:bg-gray-light hover:text-gray-dark group font-bold text-lg py-2 px-4 rounded"
              >
                Dashboard
              </NuxtLink>
            </div>
          </div>
          <div v-else-if="auth.token && auth.user.role === 'ROLE_CLIENT'" class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <NuxtLink
                to="/customers/shops"
                class="text-white hover:bg-gray dark:hover:bg-gray-light hover:text-gray-dark group font-bold text-xl py-2 px-4 rounded"
              >
                Tous les magasins
              </NuxtLink>
              <NuxtLink
                to="/customers/profile"
                class="text-white hover:bg-gray dark:hover:bg-gray-light hover:text-gray-dark group font-bold text-xl py-2 px-4 ml-4 rounded"
              >
                Espace fidélité
              </NuxtLink>
              <NuxtLink
                class="text-white hover:bg-gray dark:hover:bg-gray-light hover:text-gray-dark group font-bold text-xl py-2 px-4 ml-4 rounded"
              >
                <button @click="onLogout()">
                  Se déconnecter
                </button>
              </NuxtLink>
            </div>
          </div>
          <div v-else class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <NuxtLink
                to="/signin"
                class="text-white hover:bg-gray dark:hover:bg-gray-light hover:text-gray-dark group font-bold text-xl py-2 px-4 rounded"
              >
                Connexion
              </NuxtLink>
              <NuxtLink
                to="/signup"
                class="text-white hover:bg-gray dark:hover:bg-gray-light hover:text-gray-dark group font-bold text-xl py-2 px-4 ml-4 rounded"
              >
                Inscription
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<style lang="css" scoped>
.router-link-active {
  background-color: #f9fafb;
  color: #030712;
}
</style>
