<template>
  <head-img-layout
    head-img-src="@/assets/images/pages-head-images/about.jpg"
    :content-overflow-hidden="true"
  >
    <general-section />
    <info-section />
    <div class="brands-carousel__container">
      <brands-carousel />
    </div>
  </head-img-layout>
</template>

<script>
import GeneralSection from "./GeneralSection.vue"
import InfoSection from "./InfoSection.vue"
import BrandsCarousel from "@/components/views-components/about/BrandsCarousel/index.vue"
export default {
  name: "AboutView",
  components: {
    GeneralSection,
    InfoSection,
    BrandsCarousel,
  },
}
</script>

<style>
@import url(@/assets/style/views/about_view.scss);
</style>
