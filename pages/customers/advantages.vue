<script>

import { useAuthStore } from '../../store/auth.module.ts'

export default {
  setup () {
    definePageMeta({
      middleware: ['auth']
    })
    useHead({
      title: 'Avantages'
    })
  },
  data () {
    return {
      client: ref([])
    }
  },
  mounted () {
    this.userData()
  },
  methods: {
    async userData () {
      const store = useAuthStore()
      store.init()
      await store.fetchUserInfo()
      this.client = store.user.avantages
      console.log(this.client)
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
        <div v-if="client.length === 0">
          <p>Vous n'avez pas encore d'avantages</p>
        </div>
        <div v-else class="mt-3 divide-y divider-gray dark:divide-gray-400">
          <ul>
            <li v-for="(item, index) in client.avantages" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
