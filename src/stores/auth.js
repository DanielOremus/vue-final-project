import { defineStore } from "pinia"
import api from "@/config/axios"
import apiEndpoints from "@/constants/apiEndpoints"
import { useCartStore } from "./cart"
import { generalStoreObj } from "./helpers/generalStoreObj"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    ...generalStoreObj.state,
    user: null,
    hasTriedUserFetch: false,
  }),
  getters: {
    ...generalStoreObj.getters,
    isAuthenticated: (state) => !!state.user,
    jwtToken: () => localStorage.getItem("token"),
    userPermissions: (state) => state.user?.role.permissions,
  },
  actions: {
    ...generalStoreObj.actions,
    async authenticate(credentials, authType) {
      this.startLoading()
      try {
        const response = await api.post(
          apiEndpoints.auth[authType],
          credentials
        )
        const resData = response.data
        localStorage.setItem("token", resData.data.token)

        const cartStore = useCartStore()

        Promise.all([this.fetchProfileData(), cartStore.mergeCarts()])
      } catch (error) {
        this.setError(error)
      } finally {
        this.setLoading(false)
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
        this.setError(error)
        this.user = null
      } finally {
        this.setLoading(false)
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem("token")
      useCartStore().$reset()
    },
  },
})
