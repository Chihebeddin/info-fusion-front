<template>
  <div>
    <nav class="border-teal bg-teal fixed w-full font-bold text-xl">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NuxtLink to="/" class="dark:hover:text-teal-light">
          Accueil
        </NuxtLink>
        <div id="navbar-solid-bg" class="hidden w-full md:block md:w-auto">
          <ul class="flex flex-col mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li class="dark:hover:text-teal-light">
              <NuxtLink to="/signin">
                Connexion
              </NuxtLink>
            </li>
            <li class="dark:hover:text-teal-light">
              <NuxtLink to="/signup">
                Inscription
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>
