import { getStoreTemplateObj } from "./helpers/storeTemplate"
import { generalStoreObj } from "./helpers/generalStoreObj"
import { defineStore } from "pinia"

const storeTemplateObj = getStoreTemplateObj(
  "roles",
  generalStoreObj.actions.generalApiOperation
)

export const useRolesStore = defineStore("roles", {
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
