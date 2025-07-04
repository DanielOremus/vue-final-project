import { defineStore } from "pinia"
import { generalStoreObj } from "../helpers/generalStoreObj"
import { getStoreTemplateObj } from "../helpers/storeTemplate"
import { useProductsFiltersStore } from "./filters"
import LocaleController from "@/moduleHelpers/i18n"
import config from "@/config/default"
const STORE_NAME = "products"

const storeTemplateObj = getStoreTemplateObj(
  STORE_NAME,
  generalStoreObj.actions.generalApiOperation
)

export const useProductsStore = defineStore(STORE_NAME, {
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
        lang: LocaleController.locale ?? config.fallbackLocale,
        ...query,
      })
    },
  },
})
