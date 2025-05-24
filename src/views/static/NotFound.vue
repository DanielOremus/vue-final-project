<template>
  <div class="page-content">
    <div class="flex flex-col h-full justify-center items-center">
      <img
        src="@/assets/images/pages-inner-images/not-found/404.png"
        alt="Not Found"
        class="not-found-img"
      />
      <div class="caption">
        {{ $t("views.notFound.messages.main") }}
      </div>
      <basic-button
        :label="$t('views.notFound.buttons.backToHome')"
        @click="onHome"
      />
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
  font-family: "Outfit", "Montserrat", sans-serif;
}
.not-found-img {
  @apply max-w-screen-sm;
}
.page-content {
  @apply h-screen;
}
</style>
