<template>
  <Carousel
    :value="images"
    :showNavigators="false"
    :indicatorsContentClass="{
      position: 'absolute',
      bottom: '-1rem',
    }"
    :numVisible="1"
    :numScroll="1"
  >
    <template #item="slotProps">
      <div>
        <img
          class="hero-img"
          :src="getImgSrc(slotProps.data.imageSrc)"
          :alt="slotProps.data.alt"
        />
      </div>
    </template>
  </Carousel>
</template>

<script>
export default {
  name: "HeroCarousel",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getImgSrc(imgSrc) {
      return new URL(`../../assets/images/${imgSrc}`, import.meta.url).href
    },
  },
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/hero_carousel.scss);
</style>
