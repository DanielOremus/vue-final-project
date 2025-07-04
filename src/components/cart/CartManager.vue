<template>
  <div class="cart-manager__wrapper">
    <div class="cart-manager">
      <cart-items
        :products="cartStore.populatedProductsList"
        @quantity-change="onQuantityChange"
        @remove-product="cartStore.deleteProduct"
        :is-loading="cartStore.isLoading"
      />
      <div class="border-t-2 border-t-surface-500 text-end pt-4">
        <span class="text-xl font-medium text-surface-600"
          >{{ $t("views.cart.messages.total") }}:
          {{ cartStore.totalPrice.toFixed(2) }}₴</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cart"
import { mapStores } from "pinia"
import CartItems from "./CartItems/index.vue"
import { useAuthStore } from "@/stores/auth"
import ToastHelper from "@/primeVueServiceHelpers/ToastHelper"
export default {
  name: "CartManager",
  components: {
    CartItems,
  },

  computed: {
    ...mapStores(useCartStore, useAuthStore),
  },
  methods: {
    async onQuantityChange({ itemId, newQty }) {
      if (this.cartStore.isLoading) return
      if (newQty) await this.cartStore.updateQuantity(itemId, newQty)
      else await this.cartStore.deleteProduct(itemId)
      if (this.cartStore.hasError) ToastHelper.showAlert("error")
    },
  },
  mounted() {
    if (this.authStore.isAuthenticated) this.cartStore.fetchUserCartProducts()
    else {
      this.cartStore.getGuestCartProducts()
      if (this.cartStore.cartProductsNumber > 0)
        this.cartStore.populateProductsList()
    }
    // if (!this.authStore.isAuthenticated) this.cartStore.populateProductsList()
  },
}
</script>

<style lang="scss" scoped>
.cart-manager {
  @apply h-full w-full max-w-[800px] lg:max-w-[1200px];
}
.cart-manager__wrapper {
  @apply flex justify-center;
}
</style>
