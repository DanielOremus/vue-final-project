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
          hasAccess: (permissions, route) => {
            const id = route.params.id
            console.log(id)

            if (id) return permissions?.products.edit
            else permissions?.products.create
          },
        },
      },
    ],
  },
]
