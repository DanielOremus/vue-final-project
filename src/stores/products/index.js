import { defineStore } from "pinia"
import { generalStoreObj } from "../helpers/generalStoreObj"
import { getStoreTemplateObj } from "../helpers/storeTemplate"
import { useProductsFiltersStore } from "./filters"
const storeTemplateObj = getStoreTemplateObj(
  "products",
  generalStoreObj.actions.generalApiOperation
)

export const useProductsStore = defineStore("products", {
  state: () => ({
    ...generalStoreObj.state,
    ...storeTemplateObj.state,
    perPage: 9,
  }),
  getters: {
    ...generalStoreObj.getters,
  },
  actions: {
    ...generalStoreObj.actions,
    ...storeTemplateObj.actions,
    async fetchProducts(query) {
      const productsFiltersStore = useProductsFiltersStore()

      await storeTemplateObj.actions.fetchProducts.call(this, {
        ...productsFiltersStore.productsQueryObj,
        ...query,
      })
    },
  },
})
