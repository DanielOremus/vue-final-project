<template>
  <div class="main-layout">
    <slot name="header">
      <Header />
    </slot>
    <div class="content">
      <slot></slot>
    </div>
    <slot v-if="showFooter" name="footer">
      <Footer />
    </slot>
  </div>
</template>

<script>
import Header from "@/components/sections/Header/index.vue"
import Footer from "@/components/sections/Footer/index.vue"
export default {
  name: "MainMasterPage",
  components: {
    Header,
    Footer,
  },
  props: {
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.main-layout {
  @apply min-h-screen grid;
  grid-template-rows: auto 1fr auto;
}
</style>
