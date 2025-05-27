export const roleRoutes = [
  {
    path: "/roles",
    name: "roles",
    meta: {
      requiresAuth: true,
      hasAccess: (permissions) => {
        return permissions?.roles.read
      },
      useInMenu: true,
    },
    component: () => import("@/views/roles/RolesView.vue"),
  },
]
