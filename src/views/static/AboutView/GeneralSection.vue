<template>
  <section class="general-section">
    <div class="general-section__container">
      <span class="text-4xl uppercase font-bold">
        We provide you with <br />
        best service of healthy
      </span>
      <div class="text-zinc-600 mt-8 flex gap-8">
        <div class="basis-7/12">
          <p>
            We want to help you live a fit and healthy lifestyle! We do this by
            helping you find the most suitable nutrition for your home gym,
            studio or commercial gym, keeping your budget, lifestyle and fitness
            goals in mind. We stock a wide range of gym equipment, with strength
            equipment, cardio, cross training and so much more.
          </p>
          <p class="mt-4 mb-5">
            We believe that no investment is more valuable than one’s own. When
            investing properly in exercise, the benefits that customers get are
            not only aesthetic.
          </p>

          <basic-button dark-border label="See our classes" />
        </div>
        <div class="mission-carousel__container basis-5/12">
          <mission-carousel />
        </div>
      </div>
      <div class="mt-20 flex gap-8">
        <div class="basis-7/12">
          <img
            src="/images/pages-inner-images/about/about-1.jpg"
            class="lesson-img"
          />
        </div>

        <div class="basis-5/12">
          <img
            src="/images/pages-inner-images/about/about-2.jpg"
            class="lesson-img"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MissionCarousel from "@/components/views-components/about/MissionCarousel/index.vue"
export default {
  name: "GeneralSection",
  components: {
    MissionCarousel,
  },
}
</script>

<style lang="scss" scoped>
.lesson-img {
  @apply w-full h-full will-change-transform transition-transform duration-500 ease-out hover:-translate-y-2;
}
</style>
