<script>

import axios from 'axios'
import { useAuthStore } from '../../store/auth.module.ts'

export default {
  setup () {
    useHead({
      title: 'Points'
    })
  },
  data () {
    return {
      fidelityCard: ref([])
    }
  },
  mounted () {
    this.userData()
    this.getPoints()
  },
  methods: {
    async userData () {
      const store = useAuthStore()
      store.init()
      await store.fetchUserInfo()
    },
    async getPoints () {
      const store = await useAuthStore().fetchUserInfo()
      await axios.get(`http://localhost:8080/fidelitycards/client/${store.data.id}`).then((res) => {
        this.fidelityCard = res.data
        console.log(this.fidelityCard)
      })
    }

  }
}

</script>

<template>
  <div class="p-4 mt-9 sm:ml-64">
    <div class="w-full md:w-4/5 px-4 py-8 md:py-12">
      <ClientTabs />
      <div
        class="mt-8 p-5 mb-4 border border-gray-light rounded-md bg-gray-light shadow dark:bg-gray-light dark:border-gray-light"
      >
        <div>
          <p>Nombre de points: {{ fidelityCard.nbPoints }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
