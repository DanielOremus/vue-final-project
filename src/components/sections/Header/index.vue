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
import NavLinks from "./components/NavLinks.vue"
import LanguageSelector from "@/components/general/LanguageSelector/index.vue"
import CartSection from "./components/CartSection.vue"
import ProfileSection from "./components/ProfileSection.vue"
export default {
  name: "Header",
  components: {
    NavLinks,
    LanguageSelector,
    CartSection,
    ProfileSection,
  },
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/header.scss);
</style>
