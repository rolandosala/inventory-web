import { defineStore } from 'pinia'
import api from '@/api/axios'

interface User {
  id: number
  name: string
  email: string
  roles?: {
    name: string
  }[]
  permissions?: string[]
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('authToken'),
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.token
    },

    role: (state) => {
      return state.user?.roles?.[0]?.name ?? null
    },
  },

  actions: {
    async fetchUser() {
      if (!this.token) {
        return
      }

      this.loading = true

      try {
        const response = await api.get('/user')

        this.user = response.data

        localStorage.setItem(
          'user',
          JSON.stringify(response.data)
        )
      } catch (error) {
        console.error('Unable to load user:', error)

        this.logoutLocal()
      } finally {
        this.loading = false
      }
    },

    setAuth(token: string, user: User) {
      this.token = token
      this.user = user

      localStorage.setItem('authToken', token)
      localStorage.setItem(
        'user',
        JSON.stringify(user)
      )
    },

    async logout() {
      try {
        await api.post('/logout')
      } catch (error) {
        console.error('Logout API error:', error)
      } finally {
        this.logoutLocal()
      }
    },

    logoutLocal() {
      this.token = null
      this.user = null

      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    },
    hasPermission(permission: string) {
      if (!this.user) {
        return false
      }

      return this.user.permissions?.includes(permission) ?? false
    },
  },
})