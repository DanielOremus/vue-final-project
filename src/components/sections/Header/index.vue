<template>
  <header class="header">
    <div class="header-wrapper sticky top-0">
      <div class="header-container">
        <div class="branding grow"></div>
        <div class="navigation w-3/5 flex items-center">
          <nav class="main-navigation h-full basis-3/4">
            <nav-links />
          </nav>
          <div class="menu-right flex justify-center items-center basis-1/4">
            <div class="user-icon">
              <i class="bi bi-person-circle"></i>
            </div>
            <div class="cart-icon">
              <i class="bi bi-cart-plus">
                <span class="cart-products-number">
                  {{ productsNumber }}
                </span>
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useCartStore } from "@/stores/cart"
import { mapState } from "pinia"
import NavLinks from "./NavLinks.vue"
export default {
  name: "Header",
  components: {
    NavLinks,
  },
  computed: {
    ...mapState(useCartStore, ["productsNumber"]),
  },
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/header.scss);
</style>
