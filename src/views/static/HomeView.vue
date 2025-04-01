<template>
  <main-layout>
    <hero-carousel />
  </main-layout>
</template>

<script>
import HeroCarousel from "@/components/general/HeroCarousel/index.vue"
export default {
  name: "HomeView",
  components: {
    HeroCarousel,
  },
}
</script>

<style lang="css" scoped></style>
