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
@import url("@/assets/style/components/language_selector.scss");
</style>
