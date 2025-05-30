import axios from "axios"
import config from "../default"
import { useAuthStore } from "@/stores/auth"
import { router } from "@/router"

const api = axios.create({
  baseURL: config.apiUrl,
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
})
//?? Maybe don't need
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore()
    if (error.status === 401) {
      const wasAuthenticated = !!authStore.jwtToken
      authStore.logout()
      const route = router.currentRoute.value
      if (wasAuthenticated && route.meta?.requiresAuth) {
        router.push({
          name: "login",
          query: { redirect: route.fullPath },
        })
      }
    }
    return Promise.reject(error)
  }
)

export default api
