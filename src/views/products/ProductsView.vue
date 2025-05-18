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
import ProductsListManager from "@/components/products/ProductsListManager.vue"
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
.page-content {
  @apply bg-white h-full py-8 flex flex-col md:flex-row justify-between gap-4;
  padding-inline: clamp(0rem, 2.326vw - 0.291rem, 2.5rem);
  //
}
.filter-panel__wrapper {
  position: sticky;
  top: calc(theme("height.header-height") + 2rem);
  color: black;
}
main {
  @apply h-full;
}

aside {
  @apply w-full md:max-w-[20rem];
}
</style>
