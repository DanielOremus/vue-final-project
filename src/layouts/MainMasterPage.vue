<template>
  <div class="main-layout">
    <header-section />
    <slot></slot>
  </div>
</template>

<script>
import HeaderSection from "@/components/sections/Header.vue"
export default {
  name: "MainMasterPage",
  components: {
    HeaderSection,
  },
}
</script>

<style lang="scss" scoped></style>
