<script setup>
import { useAuthStore } from '~/store/auth.module'

const auth = useAuthStore()

/* const onLogout = async () => {
  auth.logout()
  await navigateTo('/signin', { replace: true })
} */

onMounted(() => {
  auth.init()
})
</script>

<template>
  <header>
    <div class="h-18">
      <div class="w-full" style="z-index: 3; position: fixed; top: 0px; left: 0px;">
        <div>
          <div class="w-full mx-auto my-0 border border-b-transparent bg-gray-light" style="border-bottom-color: rgb(232, 232, 232); transition: 400ms;">
            <div class="h-18 box-border relative flex flex-row text-teal-900 my-0 mx-auto max-w-8xl min-w-5xl px-10 items-center">
              <div class="w-8" />

              <div class="ml-2 mr-7 grow-0 shrink">
                <NuxtLink to="/">
                  <img class="block w-auto h-14" src="../assets/images/shoploc.png" alt="">
                </NuxtLink>
              </div>

              <div class="flex grow-0 shrink basis-auto w-96" />

              <div class="flex flex-auto min-w-96 items-center">
                <div class="min-w-52 grow shrink-0 w-full flex">
                  <div class="w-full mx-auto my-0">
                    <div class="relative">
                      <SearchForm :input="'Rechercher dans ShopLoc'" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-2.5 grow shrink-0" />

              <div v-if="auth.token && auth.user.role === 'ROLE_CLIENT'" class="flex justify-end grow-0 items-center">
                <button id="bag" class="w-12 h-12 bg-transparent flex flex-row items-center inline-flex justify-center border-0 border-none outline-none shadow-none appearance-none m-0 p-0 hover:bg-gray-400">
                  <div class="top-0.5 relative inline-block" style="line-height: initial;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                      <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
                    </svg>
                    <div class="absolute -top-2.5 -right-2.5" style="line-height: initial;">
                      <div class="items-center inline-flex justify-center text-xs bg-green w-5 h-5 rounded-2xl text-white font-semibold">
                        0
                      </div>
                    </div>
                  </div>
                </button>

                <div class="flex ml-6">
                  <NuxtLink
                    to="/customers/profile"
                    class="p-3 h-9 rounded-full font-semibold box-border whitespace-nowrap items-center inline-flex hover:bg-gray-400"
                  >
                    Espace fidélité
                  </NuxtLink>
                </div>
              </div>

              <div v-else class="flex justify-end grow-0 items-center">
                <div class="flex ml-6">
                  <NuxtLink
                    to="/signin"
                    class="p-3 h-9 rounded-full font-semibold box-border whitespace-nowrap items-center inline-flex hover:bg-gray-400"
                  >
                    Connexion
                  </NuxtLink>

                  <div class="w-4" />

                  <NuxtLink
                    to="/signup"
                    class="p-3 h-9 rounded-full font-semibold box-border whitespace-nowrap items-center inline-flex hover:bg-gray-400"
                  >
                    Inscription
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--<nav class="fixed top-0 z-50 w-full">
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
                  class="hover:bg-gray dark:hover:bg-gray-light hover:text-gray-dark group font-bold text-xl py-2 px-4 rounded"
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
      </nav>-->
      <slot />
    </div>
  </header>
</template>

<style lang="css" scoped>
.router-link-active {
  background-color: #d1d5db;
  border-radius: 500px;
}

#bag {
  transition-property: background;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0, 0, 1, 1);
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  border-radius: 50%;
}

</style>
