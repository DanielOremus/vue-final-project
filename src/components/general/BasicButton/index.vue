<template>
  <div :class="btnWrapperClass">
    <span class="basic-btn-border" :class="{ 'dark-border': darkBorder }" />
    <Button class="basic-btn" :class="btnClass" :type="type">
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
    type: {
      type: String,
    },
    block: {
      type: Boolean,
      default: false,
    },
    class: {
      type: [String, Object, Array],
    },
  },
  computed: {
    btnWrapperClass() {
      return this.block ? "basic-btn-wrapper-full" : "basic-btn-wrapper"
    },
    btnClass() {
      return this.class
    },
  },
}
</script>

<style lang="scss" scoped></style>
