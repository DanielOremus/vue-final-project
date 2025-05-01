<template>
  <head-img-layout head-img-src="@/assets/images/pages-head-images/shop.jpg">
    <div class="page-content">
      <div class="products-list__wrapper">
        <products-list :products="productsList" :is-loading="isLoading" />
      </div>
    </div>
  </head-img-layout>
</template>

<script>
import { useProductsStore } from "@/stores/products"
import { mapState, mapActions } from "pinia"
import ProductsList from "@/components/products/ProductsList/index.vue"
export default {
  name: "ProductsView",
  components: {
    ProductsList,
  },
  computed: {
    ...mapState(useProductsStore, ["isLoading", "productsList"]),
  },
  methods: {
    ...mapActions(useProductsStore, ["fetchProducts"]),
  },
  mounted() {
    this.fetchProducts()
  },
}
</script>

<style lang="scss" scoped>
.page-content {
  @apply bg-white h-full overflow-hidden flex flex-col items-center;
}
.products-list__wrapper {
  @apply m-8;
}
</style>
