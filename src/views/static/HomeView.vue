<template>
  <main-layout :show-footer="false">
    <hero-carousel class="hero-carousel" />
    <div class="carousel-inner-content">
      <div>
        <h2 class="caption">{{ $t("views.home.messages.extra") }}</h2>
        <h1 class="caption">{{ $t("views.home.messages.main") }}</h1>
      </div>
      <p class="message">
        {{ $t("views.home.messages.caption") }}
      </p>
      <basic-button>
        {{ $t("views.home.buttons.join") }}
      </basic-button>
    </div>
  </main-layout>
</template>

<script>
import HeroCarousel from "@/components/views-components/home/HeroCarousel/index.vue"
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
