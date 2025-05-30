<template>
  <transition>
    <div v-show="expanded" class="container">
      <span
        v-for="lang in langsList"
        :key="lang"
        class="lang"
        :class="{ selected: selectedLocale === lang.value }"
        @click="onLangSelect(lang)"
      >
        {{ lang.title }}
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ["lang-select", "update:modelValue"],
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
    selectedLocale() {
      return this.$i18n.locale
    },
  },
  methods: {
    onLangSelect(lang) {
      this.$emit("lang-select", lang)
      this.expanded = false
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  @apply absolute bg-surface-800 overflow-hidden right-0 top-[100%] rounded-xl flex flex-col min-w-[12rem] text-lg px-4 py-3;
}
.lang {
  @apply transition-colors duration-100 ease-linear px-4 py-1.5 rounded-md cursor-pointer hover:bg-surface-700 hover:text-primary;
}
.selected {
  @apply font-bold;
}
.v-enter-active,
.v-leave-active {
  @apply transition-opacity duration-100 ease-linear;
}
.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}
</style>
