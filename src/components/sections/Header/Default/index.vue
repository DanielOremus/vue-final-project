<template>
  <div class="default-variant">
    <div class="logo flex items-center">
      <img
        src="/images/logo-light.png"
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
</template>

<script>
import NavMenu from "./NavMenu.vue"
import LanguageSelector from "@/components/general/LanguageSelector/index.vue"
import CartSection from "../components/CartSection.vue"
import ProfileSection from "../components/ProfileSection/index.vue"
export default {
  name: "DefaultHeader",
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
@import url("@/assets/style/components/sections/header_default.scss");
</style>
