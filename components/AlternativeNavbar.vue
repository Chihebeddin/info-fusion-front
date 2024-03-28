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
                    <div class="relative" />
                  </div>
                </div>
              </div>

              <div class="w-2.5 grow shrink-0" />

              <div class="flex justify-end grow-0 items-center">
                <div class="flex ml-6">
                  <NuxtLink
                    to="/signup-shop"
                    class="p-3 h-9 rounded-full font-semibold box-border whitespace-nowrap items-center inline-flex hover:bg-gray-400"
                  >
                    Devenir partenaire
                  </NuxtLink>

                  <div class="w-4" />

                  <NuxtLink
                    to="/signin"
                    class="p-3 h-9 rounded-full font-semibold box-border whitespace-nowrap items-center inline-flex hover:bg-gray-400"
                  >
                    Connexion
                  </NuxtLink>

                  <div class="w-4" />

                  <NuxtLink
                    to="/signup-customer"
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
