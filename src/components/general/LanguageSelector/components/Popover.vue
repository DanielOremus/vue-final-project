<template>
  <div v-show="expanded" class="container">
    <span v-for="lang in langsList" :key="lang" class="lang">
      {{ lang.title }}
    </span>
  </div>
</template>

<script>
export default {
  name: "LanguagePopover",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    langsList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    expanded: {
      get() {
        return this.modelValue
      },
      set(v) {
        this.$emit("update:modelValue", v)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  @apply absolute bg-surface-800 overflow-hidden right-0 top-[90%] rounded-xl flex flex-col min-w-[10rem] text-lg px-4 py-3;
}
.lang {
  @apply transition-colors duration-100 ease-linear px-4 py-1.5 rounded-md cursor-pointer hover:bg-surface-700 hover:text-primary;
}
</style>
