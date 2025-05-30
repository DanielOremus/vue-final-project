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

<style lang="scss" scoped>
.loading-spinner {
  @apply aspect-square border-l-transparent border-r-transparent border-b-transparent rounded-full;
  animation: spin linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
