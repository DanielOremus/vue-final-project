export const productRoutes = [
  {
    path: "/products",
    children: [
      {
        path: "",
        name: "products",
        meta: {
          useInMenu: true,
        },
        component: () => import("@/views/products/ProductsView.vue"),
      },
    ],
  },
]
