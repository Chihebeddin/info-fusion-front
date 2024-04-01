<script setup>

import { useAuthStore } from '../store/auth.module.ts'

const store = useAuthStore()

const onLogout = async () => {
  store.logout()
  await navigateTo('/signin', { replace: true })
}

</script>

<template>
  <div>
    <section class="text-gray-light bg-teal-700 bg-opacity-90">
      <div class="py-5 px-10 lg:pb-12">
        <div class="flex items-center justify-between">
          <NuxtLink to="/customers/shops/all">
            <svg xmlns="http://www.w3.org/2000/svg" width="46.67" height="40" viewBox="0 0 28 24">
              <path fill="currentColor" d="M.482 24a.393.393 0 0 1-.389-.393v-1.783c0-.217.176-.393.393-.393h1.347V8.671a.79.79 0 0 1 .039-.244l-.002.006a3.265 3.265 0 0 1-1.8-1.287l-.007-.011A.39.39 0 0 1 0 6.921V.394C0 .177.176.001.393 0h27.014c.217 0 .393.176.393.393V6.92a.396.396 0 0 1-.064.215l.001-.002a3.49 3.49 0 0 1-2.687 1.468h-.008V21.43h1.091c.217 0 .393.176.393.393v1.783a.393.393 0 0 1-.393.393h-.001zm22.99-2.965V8.673c0-.07.009-.138.026-.202l-.001.006a3.498 3.498 0 0 1-1.53-.836l.002.002a3.82 3.82 0 0 1-2.68.976h.006a3.811 3.811 0 0 1-2.69-.996l.003.003a3.81 3.81 0 0 1-2.574.995l-.119-.002h.006a3.816 3.816 0 0 1-2.69-.996l.003.003a3.812 3.812 0 0 1-2.575.995l-.128-.002h.006a3.814 3.814 0 0 1-2.69-.996l.003.003a3.742 3.742 0 0 1-2.441.993h-.005v12.417H4.56v-5.253c0-.217.176-.393.393-.393h4.651c.217 0 .393.176.393.393v5.253zM19.295 7.833a3.028 3.028 0 0 0 2.2-.835l-.001.001a.364.364 0 0 1-.009-.083V.787h-4.41V6.92l.001.027l-.001.028v-.001a3.025 3.025 0 0 0 2.117.861l.11-.002h-.005zm-10.758 0l.106.002c.824 0 1.571-.328 2.118-.861l-.001.001l-.001-.027l.001-.028v.001V.788H6.312v6.133l.001.027l-.001.028v-.001a3.025 3.025 0 0 0 2.117.861l.112-.002h-.005zm2.873 10.495a.393.393 0 0 1-.393-.393v-6.821c0-.217.176-.393.393-.393h11.009c.217 0 .393.176.393.393v6.822a.393.393 0 0 1-.393.393h-.001z" />
            </svg>
          </NuxtLink>

          <div class="inline-flex text-md font-semibold text-center">
            <div class="flex items-center me-2">
              <NuxtLink to="/customers/profile" class="inline-flex items-center justify-center p-2 hover:text-teal-700 hover:bg-white hover:rounded-full group">
                <svg class="w-5 h-5 me-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>Mon compte
              </NuxtLink>
            </div>
            <div class="me-2">
              <NuxtLink
                to="/customers/points"
                class="inline-flex items-center justify-center p-2 hover:text-teal-700 hover:bg-white hover:rounded-full group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32" class="me-2">
                  <path fill="currentColor" d="M19.668 4.108a.5.5 0 0 0-.705.08L14.36 10h-2.551l5.587-7.054a2.5 2.5 0 0 1 3.522-.4l5.147 4.123a2.5 2.5 0 0 1 .522 3.33h-2.614l.907-1.052a.5.5 0 0 0-.066-.717L22.31 6.224L19.342 10h-2.544l3.95-5.026zM6 7a3 3 0 0 0-3 3v14.5A4.5 4.5 0 0 0 7.5 29h17a4.5 4.5 0 0 0 4.5-4.5v-9a4.5 4.5 0 0 0-4.5-4.5H6a1 1 0 1 1 0-2h4.58l1.596-2zm15 12h3a1 1 0 1 1 0 2h-3a1 1 0 1 1 0-2" />
                </svg>Carte de fidélité/paiement
              </NuxtLink>
            </div>
            <div class="flex items-center me-2">
              <NuxtLink to="/customers/orders" class="inline-flex items-center justify-center p-2 hover:text-teal-700 hover:bg-white hover:rounded-full group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 me-2">
                  <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
                </svg>Commandes
              </NuxtLink>
            </div>
            <div class="flex items-center me-2">
              <NuxtLink to="/customers/advantages" class="inline-flex items-center justify-center p-2 hover:text-teal-700 hover:bg-white hover:rounded-full group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 me-2">
                  <path d="M11.25 3v4.046a3 3 0 0 0-4.277 4.204H1.5v-6A2.25 2.25 0 0 1 3.75 3h7.5ZM12.75 3v4.011a3 3 0 0 1 4.239 4.239H22.5v-6A2.25 2.25 0 0 0 20.25 3h-7.5ZM22.5 12.75h-8.983a4.125 4.125 0 0 0 4.108 3.75.75.75 0 0 1 0 1.5 5.623 5.623 0 0 1-4.875-2.817V21h7.5a2.25 2.25 0 0 0 2.25-2.25v-6ZM11.25 21v-5.817A5.623 5.623 0 0 1 6.375 18a.75.75 0 0 1 0-1.5 4.126 4.126 0 0 0 4.108-3.75H1.5v6A2.25 2.25 0 0 0 3.75 21h7.5Z" />
                  <path d="M11.085 10.354c.03.297.038.575.036.805a7.484 7.484 0 0 1-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 0 1 2.122-2.12c.517.517.759 1.36.842 2.194ZM12.877 10.354c-.03.297-.038.575-.036.805.23.002.508-.006.805-.036.833-.084 1.677-.325 2.195-.843A1.5 1.5 0 0 0 13.72 8.16c-.518.518-.76 1.362-.843 2.194Z" />
                </svg>Avantages
              </NuxtLink>
            </div>
            <div class="flex items-center me-2">
              <NuxtLink to="" class="inline-flex items-center justify-center p-2 hover:text-teal-700 hover:bg-white hover:rounded-full group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 me-2">
                  <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
                </svg>Paramètres
              </NuxtLink>
            </div>
            <div class="flex items-center me-2">
              <NuxtLink
                class="inline-flex items-center justify-center p-2 hover:text-teal-700 hover:bg-white hover:rounded-full group"
                @click="onLogout()"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 me-2">
                  <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
                </svg>Se déconnecter
              </NuxtLink>
            </div>
          </div>
        </div>

        <div>
          <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl lg:text-6xl mt-5">
            Espace fidélité
          </h1>
          <p class="text-lg font-normal lg:text-xl sm:px-4 lg:px-4">
            {{ store.user && store.user.firstName }} {{ store.user && store.user.lastName }}
          </p>
        </div>
      </div>
    </section>

    <slot />
  </div>
</template>

<style lang="css" scoped>
.router-link-active {
  background-color: #f9fafb;
  color: #0f766e;
  border-radius: 9999px;
}

</style>
