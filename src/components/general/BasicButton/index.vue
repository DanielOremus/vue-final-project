<template>
  <div class="basic-btn-wrapper">
    <span class="basic-btn-border" :class="{ 'dark-border': darkBorder }" />
    <Button class="basic-btn">
      <slot>{{ label }}</slot>
    </Button>
  </div>
</template>

<script>
export default {
  name: "BasicButton",
  props: {
    darkBorder: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="scss" scoped></style>
