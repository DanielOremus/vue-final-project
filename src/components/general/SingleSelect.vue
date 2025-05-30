<template>
  <Select
    class="md:w-56"
    show-clear
    v-model="selectedOption"
    :placeholder="placeholder"
    :options="options"
    :option-label="optionConfig.label"
    :option-value="optionConfig.value"
    :dt="dt"
    :pt="pt"
  >
  </Select>
</template>

<script>
export default {
  name: "SingleSelect",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [Number, String, Object],
    },
    dt: {
      type: Object,
      default: () => ({}),
    },
    pt: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "Select an option",
    },
    optionConfig: {
      type: Object,
      required: true,
    },
  },
  computed: {
    selectedOption: {
      get() {
        return this.modelValue
      },
      set(v) {
        return this.$emit("update:modelValue", v)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
:deep(.p-select-label) {
  display: inline-flex;
  align-items: center;
}
</style>
