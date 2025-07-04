<template>
  <div class="products-list__container">
    <div class="products-list">
      <div v-for="product in products" class="relative">
        <product-card
          :key="product._id"
          :product="product"
          @product-delete="$emit('product-delete', $event)"
          @product-edit="$emit('product-edit', $event)"
          @add-to-cart="$emit('add-to-cart', $event)"
        />
      </div>
    </div>

    <div
      v-if="isLoading && !products.length"
      class="self-center justify-self-center"
    >
      <loading-spinner class="border-2 border-surface-800 w-8" />
    </div>

    <!-- <span v-if="!isLoading && !products.length" class="text-black"
      >We haven't found anything!</span
    > -->
  </div>
</template>

<script>
import ProductCard from "./ProductCard/index.vue"
import LoadingSpinner from "@/components/general/LoadingSpinner.vue"
export default {
  name: "ProductsList",
  components: {
    ProductCard,
    LoadingSpinner,
  },
  inject: ["isLoading"],
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.products-list {
  @apply grid justify-center grid-rows-[auto] gap-y-12 gap-x-10 grid-cols-[repeat(1,minmax(350px,450px))] lg:grid-cols-[repeat(2,minmax(380px,450px))] 2xl:grid-cols-[repeat(3,minmax(380px,450px))];
}
.products-list__container {
  @apply grid grid-rows-[auto,1fr];
}
</style>
