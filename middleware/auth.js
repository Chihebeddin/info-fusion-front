import { useAuthStore } from '~/store/auth.module'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore
  return auth.token !== null
})
