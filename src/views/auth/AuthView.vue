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
  @apply h-full flex justify-center;
}
.form-container {
  @apply w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] fixed top-[20%];
}
:deep(.account-link) {
  @apply text-slate-400 text-[0.95rem] hover:underline hover:cursor-pointer w-fit;
}
</style>
