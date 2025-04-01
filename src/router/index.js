import { createRouter, createWebHistory } from "vue-router"
import { mainRoutes } from "./main"

const routes = [
  ...mainRoutes,
  {
    path: "/:pathNotFound(.*)*",
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export { router, routes }
