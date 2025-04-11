<template>
  <header class="header">
    <div class="header-wrapper sticky top-0">
      <div class="header-container">
        <div class="branding grow"></div>
        <div class="grow flex items-center">
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
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/header.scss);
</style>
