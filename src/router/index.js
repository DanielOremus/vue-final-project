import { createRouter, createWebHistory } from "vue-router"
import { mainRoutes } from "./main"
import { productRoutes } from "./products"
import { authRoutes } from "./auth"

const routes = [
  ...mainRoutes,
  ...productRoutes,
  ...authRoutes,
  {
    path: "/:pathNotFound(.*)*",
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export { router, routes }
