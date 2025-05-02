import { defineStore } from "pinia"
import QueryHelper from "../helpers/QueryHelper"
import { fieldsConfig } from "@/constants/product"
import { generalStoreObj } from "../helpers/generalStoreObj"
export const useProductsFiltersStore = defineStore("productsFilters", {
  state: () => ({
    ...generalStoreObj.state,
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
  },
})
