<template>
  <main-layout>
    <hero-carousel class="hero-carousel" />
    <div class="carousel-inner-content">
      <div>
        <h2 class="caption">Shape it up!</h2>
        <h1 class="caption">Get fit don't quit</h1>
      </div>
      <p class="message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolores
        id veniam accusantium consectetur commodi perspiciatis optio amet odio,
        tempore beatae fuga expedita aperiam quaerat, ullam, voluptates
      </p>
      <Button class="join-btn" label="Join us now" />
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
