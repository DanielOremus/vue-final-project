<template>
  <head-img-layout head-img-src="@/assets/images/pages-head-images/shop.jpg">
    <div class="page-content">
      <div class="products-list__wrapper">
        <div class="mb-6">
          <span class="text-black text-lg font-medium"
            >Showing {{ perPage * page + 1 }}-{{
              perPage * page + productsList.length
            }}
            of {{ total }} results</span
          >
        </div>
        <products-list :products="productsList" :is-loading="isLoading" />
      </div>
      <div class="paginator__container">
        <GeneralPaginator
          :items-per-page="perPage"
          :total-items-number="total"
          v-model="page"
        />
      </div>
    </div>
  </head-img-layout>
</template>

<script>
import { useProductsStore } from "@/stores/products/index"
import { useProductsFiltersStore } from "@/stores/products/filters"
import { mapState, mapActions } from "pinia"
import ProductsList from "@/components/products/ProductsList/index.vue"
import GeneralPaginator from "@/components/general/GeneralPaginator.vue"
export default {
  name: "ProductsView",
  components: {
    ProductsList,
    GeneralPaginator,
  },
  computed: {
    ...mapState(useProductsStore, [
      "isLoading",
      "productsList",
      "perPage",
      "currentPage",
      "total",
    ]),
    ...mapState(useProductsFiltersStore, ["productsQueryObj"]),
    page: {
      get() {
        return this.currentPage
      },
      async set(v) {
        if (!this.isLoading) {
          this.setListPage(v)
          await this.fetchProducts(this.productsQueryObj)
          window.scrollTo(0, 0)
        }
      },
    },
  },
  methods: {
    ...mapActions(useProductsStore, ["fetchProducts", "setListPage"]),
  },

  mounted() {
    this.fetchProducts(this.productsQueryObj)
  },
}
</script>

<style lang="scss" scoped>
.page-content {
  @apply bg-white h-full pt-8 pb-4 overflow-hidden flex flex-col items-center;
}
.products-list__wrapper {
  @apply h-full;
}
.paginator__container {
  @apply mt-6;
}
</style>
