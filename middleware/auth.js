import { useAuthStore } from '../store/auth.module'

export default defineNuxtRouteMiddleware(() => {
  console.log('middelware !')
  const auth = useAuthStore()
  // auth.init()
  console.log('user from middleware :', auth.user)
  if (auth.token === undefined) {
    return navigateTo('/signin', { replace: true })
  }
})
