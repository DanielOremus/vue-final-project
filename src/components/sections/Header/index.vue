<template>
  <header class="header">
    <div class="header-wrapper">
      <div class="header-container">
        <div class="logo flex items-center">
          <img
            src="@/assets/images/logo-light.png"
            class="max-h-9 w-auto cursor-pointer"
            alt="Logo"
            @click="onLogoClick"
          />
        </div>
        <div class="flex items-center">
          <nav class="main-navigation h-full basis-3/4">
            <nav-menu />
          </nav>
          <div class="menu-right">
            <profile-section />
            <cart-section />

            <div class="ml-5">
              <language-selector />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import NavMenu from "./components/NavMenu.vue"
import LanguageSelector from "@/components/general/LanguageSelector/index.vue"
import CartSection from "./components/CartSection.vue"
import ProfileSection from "./components/ProfileSection.vue"
export default {
  name: "Header",
  components: {
    NavMenu,
    LanguageSelector,
    CartSection,
    ProfileSection,
  },
  methods: {
    onLogoClick() {
      this.$router.push({ name: "home" })
    },
  },
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/header.scss);
</style>
