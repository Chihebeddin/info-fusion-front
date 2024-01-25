<script setup>

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
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline">
                <NuxtLink
                  to="/shops/dashboard"
                  class="text-white hover:bg-gray dark:hover:bg-gray-light hover:text-gray-dark group font-bold text-lg py-2 px-4 rounded"
                >
                  Dashboard
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
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
