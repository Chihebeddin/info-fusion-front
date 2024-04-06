<script>

// import axios from 'axios'
// import { useAuthStore } from '../../store/auth.module'

export default {
  props: {
    show: { type: Boolean },
    shop: { type: Object, required: true }
  },
  mounted () {
    console.log('current user : ', this.$props.shop)
  }
}

</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="overflow-auto h-screen right-0 left-0 top-0 fixed" style="z-index: 4; background: rgba(38, 38, 38, 0.8);">
      <div class="min-h-screen mx-auto flex flex-col justify-start items-center">
        <div class="h-20" />
        <div class="rounded-2xl mx-auto relative bg-white" style="contain: paint;">
          <div />
          <div class="h-0 sticky w-full top-0" style="z-index: 3;">
            <div class="h-0 w-full flex absolute opacity-0 bg-white items-center" style="transition: height 300ms, opacity 300ms;" />
            <button
              class="left-2 top-2 rounded-full w-12 h-12 ease-in duration-200 bg-white absolute flex box-border items-center justify-center"
              style="z-index: 1; transition-property: background;"
              @click="$emit('close')"
            >
              <div class="w-6 h-6 leading-px">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
                  <path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496" />
                </svg>
              </div>
            </button>
          </div>
          <div class="h-full">
            <div class="box-border absolute" style="left: -10000px; top: -10000px;" />
            <div style="width: 458px;">
              <div class="h-48 visible w-full">
                <div class="z-0 w-full overflow-hidden relative h-full">
                  <div class="relative overflow-hidden w-full h-full">
                    <ShopLocation :longitude="shop.longitude" :latitude="shop.latitude" />
                  </div>
                </div>
              </div>

              <div class="py-4 px-6">
                <div class="text-4xl font-bold">
                  {{ shop.name }}
                </div>
                <div class="text-sm text-gray">
                  <span v-for="elt, index in shop.shopType" :key="elt.id" class="inline-flex items-center">
                    <span>{{ elt.type }}</span>
                    <span v-if="index !== shop.shopType.length-1" class="px-1 font-medium">•</span>
                  </span>
                </div>
              </div>
              <hr class="m-0 h-0.5 bg-gray-300" style="border: medium;">

              <div class="w-full cursor-pointer">
                <div class="min-h-15 w-full box-border flex items-center">
                  <div class="w-18 px-6 self-center justify-center flex box-border">
                    <div class="w-7 h-7 text-teal">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2c3.31 0 6 2.66 6 5.95C18 12.41 12 19 12 19S6 12.41 6 7.95C6 4.66 8.69 2 12 2m0 4a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m8 13c0 2.21-3.58 4-8 4s-8-1.79-8-4c0-1.29 1.22-2.44 3.11-3.17l.64.91C6.67 17.19 6 17.81 6 18.5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5c0-.69-.67-1.31-1.75-1.76l.64-.91C18.78 16.56 20 17.71 20 19" />
                      </svg>
                    </div>
                  </div>
                  <div class="min-h-11 py-3 pr-3 flex flex-col overflow-hidden w-full justify-center" style="text-align: initial;">
                    {{ shop.location }}
                  </div>
                </div>
              </div>
              <hr class="m-0 h-0.5 bg-gray-300" style="border: medium;">

              <div class="w-full cursor-pointer">
                <div class="min-h-15 w-full box-border flex items-center">
                  <div class="w-18 px-6 self-center justify-center flex box-border">
                    <div class="w-7 h-7 text-teal">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10S4.477 0 10 0m-.93 5.581a.698.698 0 0 0-.698.698v5.581c0 .386.312.698.698.698h5.581a.698.698 0 1 0 0-1.395H9.767V6.279a.698.698 0 0 0-.697-.698" />
                      </svg>
                    </div>
                  </div>
                  <div class="min-h-11 py-3 pr-3 flex flex-col overflow-hidden w-full justify-center" style="text-align: initial;">
                    Tous les jours
                    <span class="text-gray text-sm">
                      {{ shop.openingTime }} - {{ shop.closingTime }}
                    </span>
                  </div>
                </div>
              </div>
              <hr class="m-0 h-0.5 bg-gray-300" style="border: medium;">

              <div class="w-full cursor-pointer">
                <div class="min-h-15 w-full box-border flex items-center">
                  <div class="w-18 px-6 self-center justify-center flex box-border">
                    <div class="w-7 h-7 text-teal">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1200 1200">
                        <path fill="currentColor" d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0M384.375 238.33c12.362-.729 23.536 6.66 32.007 19.775l82.031 155.566c8.637 18.434 3.729 38.172-9.155 51.343l-37.573 37.573c-2.319 3.178-3.845 6.757-3.882 10.693c14.409 55.775 58.117 107.223 96.681 142.603c38.562 35.38 80.009 83.281 133.812 94.629c6.65 1.855 14.797 2.52 19.556-1.903l43.652-44.458c15.068-11.421 36.866-16.956 52.954-7.617h.732l148.021 87.378c21.728 13.619 23.979 39.944 8.423 55.957L849.683 941.016c-15.056 15.44-35.058 20.631-54.491 20.654c-85.948-2.575-167.158-44.759-233.862-88.11c-109.49-79.653-209.923-178.446-272.975-297.803c-24.182-50.05-52.589-113.91-49.878-169.774c.242-21.016 5.928-41.605 20.728-55.151l101.953-101.953c7.942-6.758 15.799-10.111 23.217-10.549" />
                      </svg>
                    </div>
                  </div>
                  <div class="min-h-11 py-3 pr-3 flex flex-col overflow-hidden w-full justify-center" style="text-align: initial;">
                    Contactez {{ shop.name }} pour toutes informations
                    <span class="text-gray text-sm">
                      {{ shop.phone }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <slot />
</template>

<style>

</style>
