<script>

export default {
  data () {
    return {
      cardNumber: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
      minCardYear: new Date().getFullYear(),
      loading: false,
      ok: false
    }
  },
  computed: {
    minCardMonth () {
      if (this.cardYear === this.minCardYear) { return new Date().getMonth() + 1 }
      return 1
    }
  },
  watch: {
    cardYear () {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = ''
      }
    }
  },
  methods: {
    save () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.ok = true
      }, 2000)
    }
  }
}

</script>

<template>
  <div>
    <form class="max-w-sm mx-auto">
      <label for="cardNumber" class="text-sm">Numéro de carte</label>
      <div class="relative">
        <input
          id="cardNumber"
          v-model="cardNumber"
          type="text"
          class="bg-gray-50 border border-gray-400 text-gray-dark text-sm rounded-sm block w-full pe-10 p-2.5"
          placeholder="1234 5678 9000 0000"
          maxlength="16"
          required
        >
      </div>
      <div class="grid grid-cols-4 my-4">
        <div class="col-span-3">
          <label for="cardMonth" class="text-sm">Date d'expiration</label>
          <div class="">
            <select
              id="cardMonth"
              v-model="cardMonth"
              class="mr-4 bg-white border border-gray-400 text-gray-dark text-sm rounded-sm ps-4 w-28 p-2.5"
              data-ref="cardDate"
            >
              <option value="" disabled selected>
                Mois
              </option>
              <option v-for="n in 12" :key="n" :value="n < 10 ? '0' + n : n" :disabled="n < minCardMonth">
                {{ n < 10 ? '0' + n : n }}
              </option>
            </select>
            <select
              id="cardYear"
              v-model="cardYear"
              class="bg-white border border-gray-400 text-gray-dark text-sm rounded-sm ps-4 w-28 p-2.5"
              data-ref="cardDate"
            >
              <option value="" disabled selected>
                Année
              </option>
              <option v-for="(n, $index) in 12" :key="n" :value="$index + minCardYear">
                {{ $index + minCardYear }}
              </option>
            </select>
          </div>
        </div>
        <div class="">
          <label for="cvv-input" class="text-sm">CVV</label>
          <input
            id="cvv-input"
            type="text"
            class="bg-gray-50 border border-gray-400 text-gray-dark text-sm rounded-sm block w-full p-2.5"
            placeholder="CVV"
            maxlength="4"
            required
          >
        </div>
      </div>
      <div class="flex items-center group">
        <button
          type="submit"
          class="inline-flex text-white bg-teal hover:bg-teal-700 focus:ring-2 focus:outline-none focus:ring-teal-light font-semibold rounded-md text-sm px-2.5 py-2.5 text-center dark:bg-teal dark:hover:bg-teal-700 dark:focus:ring-teal"
          @click.prevent="save()"
        >
          <div v-if="loading" class="w-fit pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5" /><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform
                attributeName="transform"
                dur="1s"
                from="0 12 12"
                repeatCount="indefinite"
                to="360 12 12"
                type="rotate"
              /></path></svg>
          </div>
          <div>Enregistrer</div>
        </button>
        <div v-if="ok" class="pl-2 inline-flex text-green">
          <svg xmlns="http://www.w3.org/2000/svg" class="pr-1" width="18" height="24" viewBox="0 0 512 512">
            <path fill="currentColor" d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z" />
          </svg> OK
        </div>
      </div>
    </form>
  </div>
</template>
