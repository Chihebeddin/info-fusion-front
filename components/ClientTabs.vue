<script setup>
import { useAuthStore } from '../store/auth.module.ts'
const store = useAuthStore()
// const onLogout = async () => {
//   authStore.$reset()
//   await navigateTo('/account/login', { replace: true })
// }
</script>

<template>
  <div>
    <section class="bg-gray-light">
      <div class="py-2 px-6 mx-auto max-w-screen-xl lg:py-6">
        <h1 class="mb-5 text-2xl font-extrabold tracking-tight leading-none text-gray-dark md:text-2xl lg:text-6xl dark:text-gray-dark">
          Espace fidélité
        </h1>
        <p class="text-lg font-normal text-gray-dark lg:text-xl sm:px-4 lg:px-4 dark:text-gray-dark">
          {{ store.user && store.user.firstName }} {{ store.user && store.user.lastName }}
        </p>
      </div>
    </section>

    <div class="border-b border-gray-200 dark:border-gray-700">
      <div class="flex flex-wrap -mb-px text-md font-semibold text-center text-gray dark:text-gray">
        <div class="me-2">
          <NuxtLink to="/customers/profile" class="inline-flex items-center justify-center p-4 border-b-2 border-transparent hover:text-teal-700 hover:border-teal-700 dark:hover:text-teal-700 group">
            <svg class="w-5 h-5 me-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>Mon compte
          </NuxtLink>
        </div>
        <div class="me-2">
          <NuxtLink to="/customers/points" class="inline-flex items-center justify-center p-4 rounded-t-lg border-b-2 border-transparent hover:text-teal-700 hover:border-teal-700 dark:hover:text-teal-700 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 me-2">
              <path fill-rule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clip-rule="evenodd" />
              <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
            </svg>Mes points
          </NuxtLink>
        </div>
        <div class="me-2">
          <NuxtLink to="/customers/orders" class="inline-flex items-center justify-center p-4 rounded-t-lg border-b-2 border-transparent hover:text-teal-700 hover:border-teal-700 dark:hover:text-teal-700 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 me-2">
              <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
            </svg>Mes commandes
          </NuxtLink>
        </div>
        <div class="me-2">
          <NuxtLink to="/customers/advantages" class="inline-flex items-center justify-center p-4 rounded-t-lg border-b-2 border-transparent hover:text-teal-700 hover:border-teal-700 dark:hover:text-teal-700 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 me-2">
              <path d="M11.25 3v4.046a3 3 0 0 0-4.277 4.204H1.5v-6A2.25 2.25 0 0 1 3.75 3h7.5ZM12.75 3v4.011a3 3 0 0 1 4.239 4.239H22.5v-6A2.25 2.25 0 0 0 20.25 3h-7.5ZM22.5 12.75h-8.983a4.125 4.125 0 0 0 4.108 3.75.75.75 0 0 1 0 1.5 5.623 5.623 0 0 1-4.875-2.817V21h7.5a2.25 2.25 0 0 0 2.25-2.25v-6ZM11.25 21v-5.817A5.623 5.623 0 0 1 6.375 18a.75.75 0 0 1 0-1.5 4.126 4.126 0 0 0 4.108-3.75H1.5v6A2.25 2.25 0 0 0 3.75 21h7.5Z" />
              <path d="M11.085 10.354c.03.297.038.575.036.805a7.484 7.484 0 0 1-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 0 1 2.122-2.12c.517.517.759 1.36.842 2.194ZM12.877 10.354c-.03.297-.038.575-.036.805.23.002.508-.006.805-.036.833-.084 1.677-.325 2.195-.843A1.5 1.5 0 0 0 13.72 8.16c-.518.518-.76 1.362-.843 2.194Z" />
            </svg>Mes avantages
          </NuxtLink>
        </div>
        <div class="me-2">
          <NuxtLink to="" class="inline-flex items-center justify-center p-4 rounded-t-lg border-b-2 border-transparent hover:text-teal-700 hover:border-teal-700 dark:hover:text-teal-700 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 me-2">
              <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
              <path fill-rule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" />
            </svg>Carte de fidélité/paiement
          </NuxtLink>
        </div>
        <div class="me-2">
          <NuxtLink to="" class="inline-flex items-center justify-center p-4 rounded-t-lg border-b-2 border-transparent hover:text-teal-700 hover:border-teal-700 dark:hover:text-teal-700 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 me-2">
              <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
            </svg>Paramètres
          </NuxtLink>
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<style lang="css" scoped>
.router-link-active {
  color: #0f766e;
  border-bottom-width: 2px;
  border-bottom-color: #0f766e;
}

</style>
