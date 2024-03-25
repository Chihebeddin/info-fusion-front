<script setup>
import { useAuthStore } from '~/store/auth.module'

const auth = useAuthStore()

const onLogout = async () => {
  auth.logout()
  await navigateTo('/signin', { replace: true })
}

onMounted(() => {
  auth.init()
})
</script>

<template>
  <header>
    <div>
      <div style="z-index: 3; position: fixed; top: 0px; left: 0px; width: 100%;">
        <div style="box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 16px;">
          <div>
            <div id="header" class="mx-auto my-0 border border-b-transparent bg-gray-light w-full">
              <div class="h-18 box-border relative flex flex-row text-teal-900 my-0 mx-auto max-w-8xl min-w-5xl py-0 px-10 items-center">
                <div class="w-8" />

                <NuxtLink to="/">
                  <img class="block w-auto h-14" src="../assets/images/shoploc.png" alt="">
                </NuxtLink>

                <div class="w-6 h-px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="fixed top-0 z-50 w-full">
        <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <a href="/" class="text-teal-900 font-bold text-2xl" />
              </div>
            </div>
            <div v-if="auth.token && auth.user.role === 'ROLE_CLIENT'" class="hidden md:block">
              <div class="ml-4 flex items-center ml-6">
                <NuxtLink
                  to="/customers/shops/all"
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
  </header>
</template>

<style lang="css" scoped>
.router-link-active {
  background-color: #f9fafb;
  color: #030712;
}

#header {
  transition: 400ms;
}

</style>
