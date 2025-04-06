import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", {
  state: () => ({
    productsList: [],
  }),
  getters: {
    productsNumber: ({ productsList }) => productsList.length,
  },
  actions: {
    test() {
      console.log(this)
    },
  },
})
