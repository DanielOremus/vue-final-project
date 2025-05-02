import { defineStore } from "pinia"
import QueryHelper from "../helpers/QueryHelper"
import { fieldsConfig } from "@/constants/product"
export const useProductsFiltersStore = defineStore("productsFilters", {
  state: () => ({
    loading: false,
    error: null,
    categoriesList: [],

    //...other filters,
    selectedFilters: {
      category: [],
      name: null,
      price: [null, null],
      sort: null,
    },
  }),
  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
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
    setFilterValue(filterName, filterValue) {
      this.selectedFilters[filterName] = filterValue
    },
  },
})
