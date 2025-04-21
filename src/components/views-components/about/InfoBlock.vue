<template>
  <div class="info-block">
    <img :src="blockData.imgSrc" alt="" />
    <span class="text-lg uppercase font-semibold text-white leading-4">
      {{ blockData.title }}
    </span>
    <p class="text-zinc-300">
      {{ blockData.content }}
    </p>
  </div>
</template>

<script>
export default {
  name: "InfoBlock",
  props: {
    blockData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.info-block {
  @apply flex flex-col items-center gap-4 text-center;
}
</style>
