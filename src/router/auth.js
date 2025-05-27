import { defineAsyncComponent } from "vue"
import { useAuthStore } from "@/stores/auth"

export const authRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/AuthView.vue"),
    beforeEnter: () => {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        return { name: "home" }
      }
    },
    props: {
      formComponent: defineAsyncComponent(() =>
        import("@/components/auth/LoginForm.vue")
      ),
    },
  },

  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/AuthView.vue"),
    beforeEnter: () => {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        return { name: "home" }
      }
    },
    props: {
      formComponent: defineAsyncComponent(() =>
        import("@/components/auth/RegisterForm.vue")
      ),
    },
  },
]
