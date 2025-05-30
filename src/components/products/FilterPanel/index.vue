<template>
  <div class="filter-panel">
    <div class="searchbar__container mb-4">
      <search-bar v-model.lazy="searchName"> </search-bar>
    </div>
    <Accordion :value="['0']" multiple :dt="accordionDt">
      <price-panel :reset="resetKey" @apply="onFilterApply('price', $event)" />
      <category-panel
        :reset="resetKey"
        :categories-list="productsFiltersStore.categoriesList"
        :is-loading="productsFiltersStore.isLoading"
        :error="productsFiltersStore.hasError"
        @apply="onFilterApply('category', $event)"
      />
    </Accordion>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar.vue"
import { accordionDt } from "./settings"
import PricePanel from "./components/PricePanel.vue"
import CategoryPanel from "./components/CategoryPanel.vue"
import { useProductsFiltersStore } from "@/stores/products/filters"
import { useProductsStore } from "@/stores/products"
import { mapStores } from "pinia"
import generalSettings from "../settings"

export default {
  name: "FilterPanel",
  components: {
    SearchBar,
    PricePanel,
    CategoryPanel,
  },
  data() {
    return {
      searchProductName: "",
      resetKey: Date.now(),
    }
  },
  computed: {
    ...mapStores(useProductsFiltersStore, useProductsStore),
    accordionDt() {
      return accordionDt
    },
    searchName: {
      get() {
        this.searchProductName
      },
      set(v) {
        this.resetFilters()
        this.searchProductName = v
        this.onFilterApply("name", v)
      },
    },
  },
  methods: {
    async onFilterApply(filterName, filterValue) {
      console.log(filterValue)

      this.productsFiltersStore.setFilterValue(filterName, filterValue)
      await this.productsStore.fetchProducts()
      window.scrollTo(
        generalSettings.applyFilterScrollX,
        generalSettings.applyFilterScrollY
      )
    },
    resetFilters() {
      this.resetKey = Date.now()
      this.productsFiltersStore.resetSelectedFilters({
        category: [],
        name: null,
        price: [null, null],
        sort: null,
      })
    },
  },
  mounted() {
    this.productsFiltersStore.fetchFilters()
  },
}
</script>

<style lang="scss" scoped></style>
