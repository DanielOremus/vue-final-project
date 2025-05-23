import { defineStore } from "pinia"
import QueryHelper from "../helpers/QueryHelper"
import { fieldsConfig } from "@/constants/product"
import { generalStoreObj } from "../helpers/generalStoreObj"
import { sortingOptions } from "@/constants/product"
import api from "@/config/axios"
import apiEndpoints from "@/constants/apiEndpoints"
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
    //TODO: make store reset when leaving
    async fetchFilters() {
      this.startLoading()
      await this.generalApiOperation({
        operation: () => api.get(apiEndpoints.products.fetchFilters()),
        successCallback: (response) => {
          this.categoriesList = response.data.data.categories
        },
      })
    },
  },
})
