import { defineStore } from "pinia"
import QueryHelper from "../helpers/QueryHelper"
import { fieldsConfig } from "@/constants/product"
import { generalStoreObj } from "../helpers/generalStoreObj"
import { sortingOptions } from "@/constants/product"
import api from "@/config/axios"
import apiEndpoints from "@/constants/apiEndpoints"
import config from "@/config/default"
import LocaleController from "@/moduleHelpers/i18n"

export const useProductsFiltersStore = defineStore("productsFilters", {
  state: () => ({
    ...generalStoreObj.state,
    categoriesList: [],
    sortingOptions: sortingOptions,
    //...other filters,
    selectedFilters: {
      category: [],
      name: null,
      price: [null, null],
      sort: null,
    },
  }),
  getters: {
    ...generalStoreObj.getters,
    productsQueryObj: (state) => {
      const query = QueryHelper.prepareQuery(
        fieldsConfig,
        state.selectedFilters
      )
      console.log(query)

      return query
    },
  },
  actions: {
    ...generalStoreObj.actions,
    setFilterValue(filterName, filterValue) {
      this.selectedFilters[filterName] = filterValue
    },
    resetSelectedFilters() {
      this.selectedFilters = {
        category: [],
        name: null,
        price: [null, null],
        sort: null,
      }
    },
    async fetchFilters() {
      this.startLoading()
      await this.generalApiOperation({
        operation: () =>
          api.get(apiEndpoints.products.fetchFilters(), {
            params: {
              lang: LocaleController.locale ?? config.fallbackLocale,
            },
          }),
        successCallback: (response) => {
          this.categoriesList = response.data.data.categories
        },
      })
    },
  },
})
