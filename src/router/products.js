export const productRoutes = [
  {
    path: "/shop",
    children: [
      {
        path: "",
        name: "shop",
        meta: {
          useInMenu: true,
        },
        component: () => import("@/views/products/ProductsView.vue"),
      },
      {
        path: "edit/:id?",
        name: "productEdit",
        props: true,
        meta: {
          requiresAuth: true,
          hasAccess: (permissions, routeParams) => {
            const id = routeParams?.id

            return id
              ? permissions?.products.update
              : permissions?.products.create
          },
        },
        component: () => import("@/views/products/ProductEditView.vue"),
      },
    ],
  },
]
