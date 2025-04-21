<template>
  <swiper
    :modules="[autoplayModule]"
    :slides-per-view="settings.visible"
    :speed="settings.speed"
    loop
    :autoplay="settings.autoplay"
  >
    <swiper-slide v-for="brand in settings.brands" :key="brand">
      <div class="flex justify-center">
        <img class="brand-img" :src="brand.image" :alt="brand.alt" />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import settings from "./settings.js"
import { Autoplay } from "swiper/modules"
export default {
  name: "BrandsCarousel",
  computed: {
    settings() {
      return settings
    },
    autoplayModule() {
      return Autoplay
    },
  },
}
</script>

<style lang="scss" scoped>
.brand-img {
  @apply inline-block max-h-20 w-auto cursor-pointer opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-150 ease-in;
}
</style>
