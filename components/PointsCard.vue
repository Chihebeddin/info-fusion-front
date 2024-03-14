<script>

export default {
  props: {
    nbPoints: {
      type: Number,
      default: 0
    },
    // eslint-disable-next-line vue/require-default-prop
    datePoints: {
      type: String
    }
  },
  data () {
    return {
      show: ref(false)
    }
  },
  methods: {
    formatDate (date) {
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
      const year = date.getFullYear()

      return `${day}/${month}/${year}`
    }
  }
}

</script>

<template>
  <div class="flex flex-row w-3/4">
    <div class="flex flex-col flex-wrap w-full">
      <div class="flex flex-wrap flex-row w-full">
        <div id="points" class="w-full flex flex-row mx-3 mb-4 overflow-hidden h-auto cursor-pointer rounded-2xl">
          <div class="w-full basis-full px-6 pb-6 pt-4 flex flex-col shrink">
            <span class="py-2 font-semibold text-lg text-gray">
              <span class="whitespace-pre-wrap">
                <span>Points de fidélité</span>
              </span>
            </span>
            <span v-if="nbPoints > 0" class="text-gray mt-0.5 inline-block">
              <span class="text-4xl font-semibold inline-flex">
                <span class="text-teal mr-2.5 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M3.399 9.176a1 1 0 0 1-.496-1.324C4.89 3.482 9.799 1.06 14.59 2.343a10.002 10.002 0 0 1 7.414 9.581c.007.903-.995 1.402-1.713.918l-2.678-1.804c-1.006-.678-.334-2.247.85-1.987l1.064.234A8.002 8.002 0 0 0 4.723 8.68a1 1 0 0 1-1.324.496m17.206 5.653a1 1 0 0 1 .497 1.324c-1.988 4.37-6.897 6.793-11.688 5.509A10.003 10.003 0 0 1 2 12.08c-.007-.903.995-1.402 1.713-.918l2.678 1.804c1.006.678.334 2.247-.85 1.987l-1.064-.234a8.002 8.002 0 0 0 14.804.605a1 1 0 0 1 1.324-.496M12.53 8.5c-.99 0-2.092.927-2.428 2.5H13a1 1 0 1 1 0 2h-2.898c.335 1.573 1.438 2.5 2.428 2.5c.6 0 1.203-.304 1.69-.91a1 1 0 1 1 1.56 1.25c-.787.983-1.927 1.66-3.25 1.66c-2.388 0-4.08-2.092-4.453-4.5H8a1 1 0 1 1 0-2h.077c.372-2.408 2.065-4.5 4.453-4.5c1.323 0 2.463.677 3.25 1.66a1 1 0 0 1-1.56 1.25c-.487-.606-1.09-.91-1.69-.91" /></g>
                  </svg>
                </span>
                <span>
                  {{ nbPoints }} <span class="text-lg uppercase">points cumulés</span>
                  <span class="block text-lg"> depuis le {{ formatDate(new Date(datePoints)) }}</span>
                </span>
              </span>

              <span class="text-gray text-base font-semibold block text-end w-full">
                <span class="inline-block w-1/2">
                  Échangez vos points contre des cadeaux en magasin
                  <NuxtLink to="/customers/shops/all" class="text-teal hover:text-teal-700 hover:underline">
                    ici
                  </NuxtLink>
                </span>
              </span>
            </span>
            <span v-else class="mt-0.5 inline-block">
              <span class="w-full pb-2 space-x-2.5 text-2xl font-semibold inline-flex">
                <span class="p-4 w-24 h-24 text-white flex items-center bg-teal-700/75 rounded-full">
                  <span class="w-full text-center">
                    <span class="font-bold text-4xl">
                      1 €
                    </span>
                  </span>
                </span>
                <span class="flex items-center text-teal-700/75">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18 7H6a2 2 0 0 0 0 4h12a2 2 0 0 0 0-4m0 7H6a2 2 0 0 0 0 4h12a2 2 0 0 0 0-4" />
                  </svg>
                </span>
                <span class="p-4 w-24 h-24 text-white text-center flex items-center bg-teal-700/75 rounded-full">
                  <span class="w-full text-center">
                    <span class="font-bold text-4xl">
                      1 <span class="text-xl block">point</span>
                    </span>
                  </span>
                </span>
              </span>
              <span class="text-gray text-base font-semibold block text-end w-full">
                <span class="inline-block w-1/2">
                  Faites des achats, cumulez des points
                  <span class="block text-sm">(et obtenez des avantages*)</span>
                  <NuxtLink to="/customers/shops/all" class="text-teal hover:text-teal-700 hover:underline text-lg inline-flex items-center mt-1" @mouseover="show = true" @mouseleave="show = false">
                    Commencez ici
                    <svg v-if="show" xmlns="http://www.w3.org/2000/svg" class="pl-1 mt-1" width="32" viewBox="0 0 24 24">
                      <g transform="translate(24 0) scale(-1 1)">
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                          <path stroke-dasharray="20" stroke-dashoffset="20" d="M21 12H3.5">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0" />
                          </path>
                          <path stroke-dasharray="12" stroke-dashoffset="12" d="M3 12L10 19M3 12L10 5">
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" values="12;0" />
                          </path>
                        </g>
                      </g>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="pl-1 mt-1" width="32" viewBox="0 0 24 24">
                      <path stroke-dasharray="20" stroke-dashoffset="20" d="M21 12H3.5" />
                      <path stroke-dasharray="12" stroke-dashoffset="12" d="M3 12L10 19M3 12L10 5" />

                    </svg>

                  </NuxtLink>
                </span>
              </span>
            </span>

            <div class="my-6" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

#points {
  background: linear-gradient(0deg, rgb(241, 241, 241), rgba(241, 241, 241, 0.5)), linear-gradient(315deg, rgb(230, 230, 230) 0%, rgb(203, 203, 203) 50%, rgb(238, 238, 238) 50%, rgb(246, 246, 246) 100%);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 2px;
}

</style>
