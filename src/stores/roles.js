import { getStoreTemplateObj } from "./helpers/storeTemplate"
import { generalStoreObj } from "./helpers/generalStoreObj"
import { defineStore } from "pinia"
import api from "@/config/axios"
import apiEndpoints from "@/constants/apiEndpoints"

const STORE_NAME = "roles"

const storeTemplateObj = getStoreTemplateObj(
  STORE_NAME,
  generalStoreObj.actions.generalApiOperation
)

export const useRolesStore = defineStore(STORE_NAME, {
  state: () => ({
    ...generalStoreObj.state,
    ...storeTemplateObj.state,
    perPage: 6,
  }),
  getters: {
    ...generalStoreObj.getters,
  },
  actions: {
    ...generalStoreObj.actions,
    ...storeTemplateObj.actions,
    async fetchRoles(query) {
      this.rolesList = []
      await storeTemplateObj.actions.fetchRoles.call(this, query)
    },
    async fetchAllRoles() {
      this.rolesList = []
      await this.generalApiOperation({
        operation: () => api.get(apiEndpoints.roles.fetchAll()),
        successCallback: (res) => {
          this.rolesList = res.data.data.roles
        },
      })
    },
    async createRole(roleObj) {
      await this.generalApiOperation({
        operation: () => api.post(apiEndpoints.roles.create(), roleObj),
        successCallback: (res) => this.rolesList.push(res.data.data.role),
      })
    },
  },
})
