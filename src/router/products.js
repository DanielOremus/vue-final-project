export const productRoutes = [
  {
    path: "/products",
    name: "products",
    children: [
      {
        path: "",
        component: () => import("@/views/products/ProductView.vue"),
      },
    ],
  },
]
