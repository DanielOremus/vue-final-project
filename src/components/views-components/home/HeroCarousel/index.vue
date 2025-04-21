<template>
  <Carousel
    :value="heroImages"
    :show-navigators="false"
    :pt="{
      indicatorList: 'absolute left-1/2 bottom-4 -translate-x-1/2',
    }"
    :num-visible="1"
    :num-scroll="1"
    circular
    :autoplay-interval="autoPlayInterval"
  >
    <template #item="slotProps">
      <Image
        image-class="hero-img"
        :src="slotProps.data.image"
        :alt="slotProps.data.alt"
      />
    </template>
  </Carousel>
</template>

<script>
import { heroImages } from "./settings.js"
export default {
  name: "HeroCarousel",
  props: {
    autoPlayInterval: {
      type: Number,
      default: 5000,
    },
  },
  computed: {
    heroImages() {
      return heroImages
    },
  },
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/hero_carousel.scss);
</style>
