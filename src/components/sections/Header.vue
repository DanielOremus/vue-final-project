<template>
  <header class="header">
    <div class="header-wrapper sticky top-0">
      <div
        class="header-container min-w-full h-full pl-32 flex flex-row justify-between"
      >
        <div class="branding grow"></div>
        <div class="navigation w-3/5 flex items-center">
          <nav class="main-navigation basis-3/4">
            <ul class="menu w-full flex flex-row items-center justify-between">
              <li class="menu-item">
                <router-link :to="{ name: 'home' }" active-class="active-link">
                  Home
                </router-link>
              </li>
              <li class="menu-item">
                <router-link :to="{ name: 'about' }" active-class="active-link">
                  About us
                </router-link>
              </li>
              <li class="menu-item">Gallery</li>
              <li class="menu-item">Classes</li>
              <li class="menu-item">
                <router-link to="/shop" active-class="active-link">
                  Shop
                </router-link>
              </li>
            </ul>
          </nav>
          <div class="menu-right flex justify-center items-center basis-1/4">
            <div class="user-icon">
              <i class="bi bi-person-circle"></i>
            </div>
            <div class="cart-icon">
              <i class="bi bi-cart-plus">
                <span class="cart-products-number">
                  {{ cartItemsNumber }}
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
import { mapStores } from "pinia"
export default {
  name: "Header",
  computed: {
    ...mapStores(useCartStore),
    cartItemsNumber() {
      return this.cartStore.productsNumber
    },
  },
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/header.scss);
</style>
