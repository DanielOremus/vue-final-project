<template>
  <div>
    <main-master-page>
      <hero-carousel :images="heroImages"></hero-carousel>
    </main-master-page>
  </div>
</template>

<script>
import HeroCarousel from "@/components/general/HeroCarousel.vue"
import MainMasterPage from "@/layouts/MainMasterPage.vue"
export default {
  name: "HomeView",
  components: {
    MainMasterPage,
    HeroCarousel,
  },
  data() {
    return {
      heroImages: [
        {
          alt: "Hero Image",
          imageSrc: "hero-image-1.jpg",
        },
        {
          alt: "Hero Image",
          imageSrc: "hero-image-2.jpg",
        },
      ],
    }
  },
}
</script>

<style lang="css" scoped></style>
