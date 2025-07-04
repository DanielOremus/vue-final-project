import { createRouter, createWebHistory } from "vue-router"
import { mainRoutes } from "./main"
import { productRoutes } from "./products"
import { authRoutes } from "./auth"
import { roleRoutes } from "./roles"
import { cartRoutes } from "./cart"
import { useAuthStore } from "@/stores/auth"
import { useCartStore } from "@/stores/cart"

const routes = [
  ...mainRoutes,
  ...productRoutes,
  ...authRoutes,
  ...roleRoutes,
  ...cartRoutes,
  {
    path: "/:pathNotFound(.*)*",
    name: "notFound",
    component: () => import("@/views/static/NotFound.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from) {
    return { top: 0, behavior: "smooth" }
  },
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const cartStore = useCartStore()
  if (!authStore.hasTriedUserFetch) {
    await authStore.fetchProfileData()
  }

  if (!cartStore.isInitialized && to.name !== "cart") {
    cartStore.initCart()
  }

  if (to.meta?.requiresAuth && !authStore.isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } }
  }

  const permissions = authStore.userPermissions

  if (to.meta?.hasAccess && !to.meta.hasAccess(permissions, to.params)) {
    return { name: "notFound" }
  }
})

export { router, routes }
