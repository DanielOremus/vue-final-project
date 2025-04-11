<template>
  <main-layout>
    <hero-carousel class="hero-carousel" />
    <div class="carousel-inner-content">
      <div>
        <h2 class="caption">{{ $t("views.home.messages.extra") }}</h2>
        <h1 class="caption">{{ $t("views.home.messages.main") }}</h1>
      </div>
      <p class="message">
        {{ $t("views.home.messages.caption") }}
      </p>
      <Button class="join-btn">
        {{ $t("views.home.buttons.join") }}
      </Button>
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
