<template>
  <main-layout>
    <div class="form-wrapper">
      <div class="form-container">
        <component :is="formComponent" />
      </div>
    </div>
  </main-layout>
</template>

<script>
export default {
  name: "AuthView",
  props: {
    formComponent: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  @apply h-full flex justify-center items-center;
}
.form-container {
  @apply w-[700px];
}
</style>
