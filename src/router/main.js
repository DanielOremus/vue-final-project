import HomeView from "@/views/static/HomeView.vue"

export const mainRoutes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      useInMenu: true,
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/static/AboutView/index.vue"),
    meta: {
      useInMenu: true,
    },
  },
]
