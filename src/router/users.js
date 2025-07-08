export const userRoutes = [
  {
    path: "/users",
    name: "users",
    meta: {
      requiresAuth: true,
      hasAccess: (permissions) => {
        return permissions?.users.read
      },
      useInMenu: true,
    },
    component: () => import("@/views/users/UsersView.vue"),
  },
]
