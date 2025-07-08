<template>
  <section class="info-section">
    <div class="bg-overlay"></div>
    <div class="info-section__container">
      <div class="text-center">
        <h1 class="uppercase text-5xl font-bold">Why choose peaker</h1>
        <p class="mt-5 text-zinc-300">
          After you decide to start training we will make sure you get the best
          fitness program. Our sport experts and latest <br />
          sports equipment are the winning combination.
        </p>
      </div>
      <div class="divider"></div>
      <div class="info-blocks__container">
        <info-block
          v-for="block in infoBlocks"
          :key="block"
          :block-data="block"
        />
      </div>
    </div>
  </section>
</template>

<script>
import InfoBlock from "@/components/views-components/about/InfoBlock.vue"
import { infoBlocksList } from "./setting"
export default {
  name: "InfoSection",
  components: {
    InfoBlock,
  },
  computed: {
    infoBlocks() {
      return infoBlocksList
    },
  },
}
</script>

<style lang="scss" scoped>
.info-section {
  background-image: url("/images/pages-inner-images/about/info-bg.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  @apply py-28 text-white relative z-0;
}
.info-section__container {
}
.info-blocks__container {
  @apply grid justify-center gap-8;
  grid-template-columns: repeat(3, minmax(200px, 300px));
}
.divider {
  @apply relative mx-auto mt-8 mb-14 w-[20rem] border-t-[1px] border-white;
}
.divider::before {
  content: "";
  @apply absolute left-1/2 -top-[2.5px] -translate-x-1/2 bg-primary-500 h-[4px] w-1/2 -skew-x-[45deg];
}
.bg-overlay {
  @apply absolute top-0 left-0 w-full h-full bg-black opacity-75 -z-[1];
}
</style>
