import { defineStore } from "pinia"
import { getGeneralStoreObj } from "./helpers/general"
import { getStoreTemplateObj } from "./helpers/storeTemplate"

const generalStoreObj = getGeneralStoreObj()
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
    // async test() {},
    ...storeTemplateObj.actions,
    ...generalStoreObj.actions,
  },
})
