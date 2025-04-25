<template>
  <div class="h-full">
    <div class="flex flex-col h-full justify-center items-center">
      <img
        src="@/assets/images/pages-inner-images/not-found/404.png"
        alt="Not Found"
        class="not-found-img"
      />
      <div class="caption">
        The page you are looking is not available or has been removed. Try going
        to Home Page by using the button below.
      </div>
      <basic-button label="Back to Home" @click="onHome" />
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    onHome() {
      this.$router.push({ name: "home" })
    },
  },
}
</script>

<style lang="scss" scoped>
.caption {
  @apply text-center text-lg max-w-screen-md mt-4 mb-8;
  font-family: "Outfit", sans-serif;
}
.not-found-img {
  @apply max-w-screen-sm;
}
</style>
