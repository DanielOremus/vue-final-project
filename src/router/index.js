import { createRouter, createWebHistory } from "vue-router"
import { mainRoutes } from "./main"
import { productRoutes } from "./products"
import { authRoutes } from "./auth"
import { useAuthStore } from "@/stores/auth"

const routes = [
  ...mainRoutes,
  ...productRoutes,
  ...authRoutes,
  {
    path: "/:pathNotFound(.*)*",
    name: "notFound",
    component: () => import("@/views/static/NotFound.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    await authStore.fetchProfileData()

    if (to.meta?.requiresAuth) {
      if (!authStore.isAuthenticated) {
        return { name: "login", query: { redirect: to.fullPath } }
      }
    }
  }
  const permissions = authStore.userPermissions

  if (to.meta?.hasAccess && !to.meta.hasAccess(permissions, to.params)) {
    return { name: "notFound" }
  }
})

export { router, routes }
