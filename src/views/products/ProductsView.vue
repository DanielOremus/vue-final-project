<template>
  <head-img-layout head-img-src="@/assets/images/pages-head-images/shop.jpg">
    <div class="page-content">
      <aside>
        <div class="filter-panel__wrapper">
          <div class="filter-panel__container">
            <filter-panel />
          </div>
        </div>
      </aside>
      <main>
        <products-list-manager />
      </main>
    </div>
  </head-img-layout>
</template>

<script>
import { useProductsStore } from "@/stores/products/index"
import { useProductsFiltersStore } from "@/stores/products/filters"
import { mapStores } from "pinia"
import ProductsListManager from "@/components/products/ProductsListManager/index.vue"
import FilterPanel from "@/components/products/FilterPanel/index.vue"
export default {
  name: "ProductsView",
  components: {
    ProductsListManager,
    FilterPanel,
  },
  computed: {
    ...mapStores(useProductsStore, useProductsFiltersStore),
  },

  beforeRouteLeave() {
    this.productsFiltersStore.$reset()
    this.productsStore.$reset()
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/views/product/products_view.scss");
</style>
