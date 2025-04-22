import { defineAsyncComponent } from "vue"

export const authRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/AuthView.vue"),
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
    props: {
      formComponent: defineAsyncComponent(() =>
        import("@/components/auth/RegisterForm.vue")
      ),
    },
  },
]
