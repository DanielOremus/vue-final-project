<template>
  <IconField>
    <InputText
      :placeholder="$t('views.shop.fields.search')"
      class="searchbar w-full"
      :dt="searchbarDt"
      v-model="currentValue"
      @change="emitUpdateIfLazy"
    />
    <InputIcon class="bi bi-search" />
  </IconField>
</template>

<script>
import { searchbarDt } from "../settings.js"
export default {
  name: "Searchbar",
  data() {
    return {
      currentValue: this.modelValue,
    }
  },
  props: {
    modelValue: {
      type: [String, Number],
    },
    modelModifiers: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    searchbarDt() {
      return searchbarDt
    },
    hasLazyModifier() {
      return !!this.modelModifiers.lazy
    },
  },
  methods: {
    emitUpdateIfLazy() {
      if (this.hasLazyModifier) {
        this.$emit("update:modelValue", this.currentValue)
      }
    },
  },
  watch: {
    modelValue(newValue) {
      this.currentValue = newValue
    },
    currentValue(newValue) {
      if (!this.hasLazyModifier) {
        this.$emit("update:modelValue", this.currentValue)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
