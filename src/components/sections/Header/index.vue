<template>
  <header class="header">
    <div class="header__wrapper">
      <component :is="headerComponent" />
    </div>
  </header>
</template>

<script>
import DefaultHeader from "./Default/index.vue"
import DrawerHeader from "./Drawer/index.vue"
export default {
  name: "Header",
  data() {
    return {
      renderDrawerHeader: false,
    }
  },
  computed: {
    headerComponent() {
      return this.renderDrawerHeader ? DrawerHeader : DefaultHeader
    },
  },
  methods: {
    checkBreakPoint() {
      this.renderDrawerHeader = !window.matchMedia("(min-width: 1024px)")
        .matches
    },
  },
  mounted() {
    this.checkBreakPoint()
    window.addEventListener("resize", this.checkBreakPoint)
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkBreakPoint)
  },
}
</script>

<style lang="scss" scoped></style>
