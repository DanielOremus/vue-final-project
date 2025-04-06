import { defineStore } from "pinia"
import { generalStoreObj } from "./helpers/generalStoreObj"
import { getStoreTemplateObj } from "./helpers/storeTemplate"

const storeTemplateObj = getStoreTemplateObj(
  "products",
  generalStoreObj.actions.generalApiOperation
)

export const useProductsStore = defineStore("products", {
  state: () => ({
    ...generalStoreObj.state,
    ...storeTemplateObj.state,
  }),
  getters: {
    ...generalStoreObj.getters,
  },
  actions: {
    ...generalStoreObj.actions,
    ...storeTemplateObj.actions,
  },
})
