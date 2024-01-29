import axios from 'axios'
import { defineStore } from 'pinia'

const baseUrl = 'http://localhost:8080/api/auth'
// const baseUrl = 'https://infofusion-kat2zxt5wq-od.a.run.app/api/auth'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: ref() || null,
    returnUrl: null,
    user: ref()
  }),
  actions: {
    init () {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        // console.log('storedToken:', storedToken)
        this.token = storedToken
      }
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        // console.log('storedUser:', storedUser)
        this.user = storedUser
      }
    },
    async login (username: any, password: any) {
      try {
        const response = await axios.post(`${baseUrl}/SignIn`, { username, password }, {
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true
          }
        })

        const { token } = response.data

        this.token = token

        localStorage.setItem('token', token)
        console.log('this.token ' + this.token)
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    },

    async fetchUserInfo () {
      console.log('fetchUserInfo:', this.token)
      if (this.token) {
        try {
          const response = await axios.get(`${baseUrl}/current`, {
            headers: {
              Authorization: `Bearer ${this.token}`
            },
            withCredentials: true
          })
          console.log('response.data MEEEEEE ' + response.data)
          this.user = response.data

          // Enregistrez également les informations utilisateur dans le local storage
          localStorage.setItem('user', this.user)
        console.log('this.user ' + this.user)
        return response
      } catch (error) {
        console.error('Error fetching user info:', error)

      }
    }
  },

    logout () {
      this.token = null
      this.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
})
