<template>
  <main-layout>
    <hero-carousel class="hero-carousel" />
    <div class="carousel-inner-content">
      <p>1111</p>
    </div>
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

<style lang="css" scoped>
@import url(@/assets/style/views/home_view.scss);
</style>
