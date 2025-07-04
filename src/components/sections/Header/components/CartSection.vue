<template>
  <div class="cart-icon__wrapper">
    <router-link :to="{ name: 'cart' }" active-class="text-primary">
      <i class="bi bi-cart-plus cart-icon">
        <span class="cart-products-number">
          {{ cartProductsNumber }}
        </span>
      </i>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "pinia"
import { useCartStore } from "@/stores/cart"
export default {
  name: "CartSection",
  computed: {
    ...mapState(useCartStore, ["cartProductsNumber"]),
  },
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/header.scss);
</style>
