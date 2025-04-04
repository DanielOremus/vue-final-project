import { createRouter, createWebHistory } from "vue-router"
import { mainRoutes } from "./main"
import { productRoutes } from "./products"

const routes = [
  ...mainRoutes,
  ...productRoutes,
  {
    path: "/:pathNotFound(.*)*",
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export { router, routes }
