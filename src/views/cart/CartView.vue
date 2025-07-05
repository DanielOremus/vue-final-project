<template>
  <head-img-layout>
    <div class="page-content">
      <main>
        <cart-manager />
      </main>
    </div>
  </head-img-layout>
</template>

<script>
import CartManager from "@/components/cart/CartManager.vue"
import { useCartStore } from "@/stores/cart"
import { mapActions } from "pinia"
export default {
  name: "CartView",
  components: {
    CartManager,
  },
  methods: {
    ...mapActions(useCartStore, ["clearPopulatedProducts"]),
  },
  beforeRouteLeave() {
    this.clearPopulatedProducts()
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/views/cart_view.scss");
</style>
