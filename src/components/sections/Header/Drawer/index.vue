<template>
  <div class="drawer-variant">
    <div class="flex items-center">
      <i
        class="bi bi-list text-3xl cursor-pointer hover:text-primary"
        @click="toggleDrawer(true)"
      >
        <!-- Вирішити проблему з max call stack reached, при винесенні Drawer'а в окремий компонент -->
        <Drawer
          v-model:visible="isDrawerVisible"
          :header="$t('header.messages.menu')"
          class="bg-zinc-950 border-zinc-950"
        >
          <drawer-content />
        </Drawer>
      </i>
    </div>
    <div class="logo justify-center flex items-center">
      <img
        src="/images/logo-light.png"
        class="hidden sm:block max-h-9 w-auto cursor-pointer"
        alt="Logo"
        @click="onLogoClick"
      />
    </div>
    <div class="flex items-center">
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
import LanguageSelector from "@/components/general/LanguageSelector/index.vue"
import CartSection from "../components/CartSection.vue"
import ProfileSection from "../components/ProfileSection/index.vue"
import DrawerContent from "./DrawerContent.vue"
export default {
  name: "DrawerHeader",
  components: {
    LanguageSelector,
    CartSection,
    ProfileSection,
    DrawerContent,
  },
  data() {
    return {
      isDrawerVisible: false,
    }
  },
  methods: {
    onLogoClick() {
      this.$router.push({ name: "home" })
    },
    toggleDrawer(v) {
      this.isDrawerVisible = v
    },
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/components/sections/header_drawer.scss");
</style>
