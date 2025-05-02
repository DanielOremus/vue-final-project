<template>
  <div class="products-list__container">
    <div class="products-list">
      <div v-for="product in products" class="relative">
        <product-card
          :key="product._id"
          :product="product"
          :is-loading="isLoading"
        />
      </div>
    </div>
    <!-- <loading-spinner
      v-show="isLoading"
      size="medium"
      class="w-8 border-[2.5px] border-surface-500"
    /> -->
    <span v-if="!isLoading && !products.length" class="text-black"
      >We haven't found anything!</span
    >
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue"
import LoadingSpinner from "@/components/general/LoadingSpinner.vue"
export default {
  name: "ProductsList",
  components: {
    ProductCard,
    LoadingSpinner,
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.products-list {
  @apply grid justify-center grid-rows-[auto] gap-y-12 gap-x-10 grid-cols-[repeat(1,minmax(350px,500px))] md:grid-cols-[repeat(2,minmax(350px,500px))];
}
</style>
