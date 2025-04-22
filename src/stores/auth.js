import { defineStore } from "pinia"
import api from "@/config/axios"
import apiEndpoints from "@/constants/apiEndpoints"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
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
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    startLoading() {
      this.loading = true
      this.error = null
    },
  },
})
