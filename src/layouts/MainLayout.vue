<template>
  <div class="main-layout">
    <Header />
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Header from "@/components/sections/Header/index.vue"
export default {
  name: "MainMasterPage",
  components: {
    Header,
  },
}
</script>

<style lang="scss" scoped></style>
