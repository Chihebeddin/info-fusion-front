<script>

export default {
  props: {
    balance: {
      type: Number,
      default: 0
    },
    qrCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cardId: ref('card-1'),
      isFlipped: ref(false),
      showModal: ref(false)
    }
  },
  methods: {
    flipCard () {
      if (this.cardId === 'card-flipped') {
        this.cardId = 'card-1'
        this.isFlipped = false
      } else {
        this.cardId = 'card-flipped'
        this.isFlipped = true
      }
    }
  }
}

</script>

<template>
  <div class="flex flew-row w-3/4">
    <div class="overflow-x-visible mt-6 w-full">
      <div class="flex flex-wrap items-center mx-4">
        <span class="my-2 text-2xl font-bold">Solde</span>
      </div>

      <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <CardModal :show="showModal" @close="showModal = false" />
      </Teleport>

      <div class="flex flex-wrap flex-row w-full mt-6">
        <div id="card" class="flex flex-col relative mx-3 mb-4 overflow-hidden">
          <div
            :id="cardId"
            class="rounded-2xl shadow-none h-full flex flex-col absolute border border-solid px-5 w-full cursor-pointer box-border"
            @click="flipCard()"
          >
            <div id="card-front absolute">
              <span class="mt-2 ml-1 jutify-between flex flex-row items-center">
                <span class="w-5/6 flex flex-row items-center">
                  <span class="whitespace-nowrap text-ellipsis overflow-hidden font-semibold text-lg text-gray">
                    Carte de fidélité
                  </span>
                </span>
                <span id="qr-code" class="flex w-9 h-9" @click="showModal = true" />
              </span>

              <span class="flex flex-row  mt-3 ml-1 text-lg">
                <span class="w-11/12 whitespace-pre tracking-wide text-2xl text-gray">
                  {{ balance }} €
                </span>
              </span>
            </div>
            <div id="card-back">
              <span class="mt-2 ml-1 jutify-between flex flex-row items-center">
                <span class="w-full flex flex-row items-center">
                  <img :src="qrCode">
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

#card {
  width: calc(50% - 24px);
  animation-duration: 400ms;
  animation-fill-mode: both;
  animation-timing-function: linear;
  animation-delay: calc(0s);
  padding-bottom: 28%;
}

#card > #card-1 {
  transform: rotateY(180deg);
}

#card-1, #card-flipped {
  background-color: rgb(246, 246, 246);
  border-color: rgba(0, 0, 0, 0.08);
  transition: transform 1s;
  transform-style: preserve-3d;
}

#qr-code {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 16 16'%3E%3Cpath fill='%234d4d51' d='m8 16l-2-3h1v-2h2v2h1zm7-15v8H1V1zm1-1H0v10h16z'/%3E%3Cpath fill='%234d4d51' d='M8 2a3 3 0 1 1 0 6h5V7h1V3h-1V2zM5 5a3 3 0 0 1 3-3H3v1H2v4h1v1h5a3 3 0 0 1-3-3'/%3E%3C/svg%3E");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#card-front, #card-back {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
}

#card-back {
  transform: rotateY(180deg);
}

</style>
