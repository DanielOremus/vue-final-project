import { defineStore } from "pinia"
import api from "@/config/axios"
import apiEndpoints from "@/constants/apiEndpoints"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    hasTriedUserFetch: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    jwtToken: () => localStorage.getItem("token"),
    userPermissions: (state) => state.user?.role.permissions,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },
  actions: {
    async authenticate(credentials, authType) {
      this.startLoading()
      try {
        const response = await api.post(
          apiEndpoints.auth[authType],
          credentials
        )
        const resData = response.data
        localStorage.setItem("token", resData.data.token)

        await this.fetchProfileData()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchProfileData() {
      this.startLoading()
      this.hasTriedUserFetch = true
      try {
        const response = await api.post(apiEndpoints.auth.fetchProfile)
        const resData = response.data
        this.user = resData.data.profile
      } catch (error) {
        this.error = error
        this.user = null
        localStorage.removeItem("token")
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem("token")
    },
    startLoading() {
      this.loading = true
      this.error = null
    },
  },
})
