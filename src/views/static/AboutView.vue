<template>
  <head-img-layout head-img-src="@/assets/images/pages_head_images/about.jpg">
    <section class="general-section">
      <div class="general-section__container">
        <span class="text-4xl uppercase font-bold">
          We provide you with <br />
          best service of healthy
        </span>
        <div class="text-zinc-600 mt-8 flex gap-8">
          <div class="basis-7/12">
            <p>
              We want to help you live a fit and healthy lifestyle! We do this
              by helping you find the most suitable nutrition for your home gym,
              studio or commercial gym, keeping your budget, lifestyle and
              fitness goals in mind. We stock a wide range of gym equipment,
              with strength equipment, cardio, cross training and so much more.
            </p>
            <p class="mt-4 mb-5">
              We believe that no investment is more valuable than one’s own.
              When investing properly in exercise, the benefits that customers
              get are not only aesthetic.
            </p>

            <basic-button dark-border label="See our classes" />
          </div>
          <div class="mission-carousel__container basis-5/12">
            <div>
              <mission-carousel />
            </div>
          </div>
        </div>
        <div class="mt-20 flex gap-8">
          <div class="basis-7/12">
            <img
              src="@/assets/images/about-1.jpg"
              class="w-full h-auto will-change-transform transition-transform duration-500 ease-out hover:-translate-y-2"
            />
          </div>

          <div class="border-2 border-red-500 basis-5/12"></div>
        </div>
      </div>
    </section>
  </head-img-layout>
</template>

<script>
export default {
  name: "AboutView",
  computed: {},
}
</script>

<style>
@import url(@/assets/style/views/about_view.scss);
</style>
