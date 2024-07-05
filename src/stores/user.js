import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoading: true,
  }),
  getters: {
    isOwner: (state) => state.user?.role_id === 1,
    isAdmin: (state) => state.user?.role_id === 2,
  },
  actions: {
    async fetchUser() {
      this.isLoading = true
      try {
        const response = await api.get('/user')
        this.user = response.data
      } catch (error) {
        console.error('Failed to fetch user data', error)
      } finally {
        this.isLoading = false
      }
    },
    async logout() {
      try {
        await api.post('/logout')
        this.user = null
      } catch (error) {
        console.error('Failed to logout', error)
      }
    },
  },
})
