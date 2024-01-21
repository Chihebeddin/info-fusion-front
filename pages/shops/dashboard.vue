<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../store/auth.module.ts'

const store = useAuthStore()
//const userDataList = ref([])

const onRefresh = () => {
  console.log(store.user)
  console.log(store.token)
}

onMounted(async () => {
  store.init()
  const response = await store.fetchUserInfo()
  console.log('response ' + JSON.stringify(response.data))
  store.user = response.data.role

  // const userEntries = Object.entries(response.data)
  // userDataList.value = userEntries.map(([key, value]) => ({ key, value }))

  onRefresh()
})
</script>

<template>
  <div class="p-4 sm:ml-64">
    <!-- Sidebar Content Here -->
    <DefaultSidebar />
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4 px-4 py-8 md:py-12">
      <h1 class="p-5 text-2xl font-bold text-gray-dark">
        Gestion du commerce
      </h1>
    </div>
  </div>
</template>
