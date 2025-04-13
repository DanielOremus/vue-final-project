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
    ],
  },
]
