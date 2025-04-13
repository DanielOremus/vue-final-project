<template>
  <Carousel
    :value="items"
    :show-navigators="false"
    :pt="{
      indicatorList: 'absolute left-5 bottom-0',
    }"
    :num-visible="1"
    :num-scroll="1"
  >
    <template #item="slotProps">
      <div class="flex items-center">
        <div class="w-1.5 h-1.5 bg-primary mr-3"></div>
        <span class="our-mission">{{ slotProps.data.title }}</span>
      </div>

      <p class="my-3 text-zinc-400">
        {{ slotProps.data.message }}
      </p>
    </template>
  </Carousel>
</template>

<script>
import items from "./settings"
export default {
  name: "MissionCarousel",
  computed: {
    items() {
      return items
    },
  },
}
</script>

<style lang="scss" scoped></style>
