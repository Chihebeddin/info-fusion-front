<template>
  <div>
    <h1>User Profile</h1>
    <p>{{ store.token }}</p>
    <ul>
      <li v-for="item in userDataList" :key="item.key">
        <strong>{{ item.key }}:</strong> {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../store/auth.module.ts'

const store = useAuthStore()
const userDataList = ref([])

const onRefresh = () => {
  console.log(store.user)
  console.log(store.token)
}

onMounted(async () => {
  store.init()
  const response = await store.fetchUserInfo()
  console.log('ssssiiii ' + JSON.stringify(response.data))

  const userEntries = Object.entries(response.data)
  userDataList.value = userEntries.map(([key, value]) => ({ key, value }))

  onRefresh()
})
</script>
