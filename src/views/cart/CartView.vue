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
.page-content {
  @apply bg-white h-full py-8 flex justify-center;
  padding-inline: clamp(0rem, 2.326vw - 0.291rem, 2.5rem);
}
main {
  @apply w-full h-full;
}
</style>
