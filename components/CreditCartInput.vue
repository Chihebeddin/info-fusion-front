<script>

export default {
  data () {
    return {
      cardNumber: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
      minCardYear: new Date().getFullYear()
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
      <button
        type="submit"
        class="text-white bg-teal hover:bg-teal-700 focus:ring-2 focus:outline-none focus:ring-teal-light font-bold rounded-md text-sm px-2.5 py-2.5 text-center dark:bg-teal dark:hover:bg-teal-700 dark:focus:ring-teal"
      >
        Ajouter une carte
      </button>
    </form>
  </div>
</template>
