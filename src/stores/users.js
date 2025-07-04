import { defineStore } from "pinia"
import { getStoreTemplateObj } from "./helpers/storeTemplate"
import { generalStoreObj } from "./helpers/generalStoreObj"
import api from "@/config/axios"
import apiEndpoints from "@/constants/apiEndpoints"

const STORE_NAME = "users"

const storeTemplateObj = getStoreTemplateObj(
  STORE_NAME,
  generalStoreObj.actions.generalApiOperation
)

export const useUsersStore = defineStore(STORE_NAME, {
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
    async fetchUsersWithRole(roleId) {
      this.startLoading()
      const response = await this.generalApiOperation({
        operation: () =>
          api.get(apiEndpoints.users.fetchList(), {
            params: {
              role: roleId,
            },
          }),
      })
      return response?.data?.data
    },
  },
})
