<template>
  <div class="cart-icon">
    <i class="bi bi-cart-plus">
      <span class="cart-products-number">
        {{ productsNumber }}
      </span>
    </i>
  </div>
</template>

<script>
import { mapState } from "pinia"
import { useCartStore } from "@/stores/cart"
export default {
  name: "CartSection",
  computed: {
    ...mapState(useCartStore, ["productsNumber"]),
  },
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/header.scss);
</style>
