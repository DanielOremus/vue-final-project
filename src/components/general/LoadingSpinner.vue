<template>
  <div class="loading-spinner" :style="spinnerSettings" />
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    duration: {
      type: Number,
      default: 800,
    },
  },
  computed: {
    spinnerSettings() {
      return {
        animationDuration: `${this.duration}ms`,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
