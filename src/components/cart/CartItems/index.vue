<template>
  <div class="cart-items">
    <cart-item
      v-for="{ product, quantity } in products"
      :key="product._id"
      :product="product"
      :quantity="quantity"
      @quantity-change="$emit('quantity-change', $event)"
      @remove-product="$emit('remove-product', $event)"
    />
    <div v-if="!products.length" class="self-center justify-self-center">
      <loading-spinner
        v-if="isLoading"
        class="border-2 border-surface-800 w-8"
      />
      <span v-else class="no-items">{{ $t("views.cart.messages.empty") }}</span>
    </div>
  </div>
</template>

<script>
import CartItem from "./CartItem.vue"
export default {
  name: "CartItems",
  emits: ["quantity-change", "remove-product"],
  components: {
    CartItem,
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
@import url("@/assets/style/components/cart/items_list.scss");
</style>
