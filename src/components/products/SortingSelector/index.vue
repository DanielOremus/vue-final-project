<template>
  <SingleSelect
    v-model="selectedSorting"
    :option-config="settings.optionConfig"
    :options="sortingOptions"
    :placeholder="placeholder"
    :dt="settings.selectDt"
    :pt="settings.selectPt"
  />
</template>

<script>
import { optionConfig, selectDt, selectPt } from "./settings"
import { useProductsFiltersStore } from "@/stores/products/filters"
import { mapState } from "pinia"
import SingleSelect from "@/components/general/SingleSelect.vue"
export default {
  name: "SortingSelector",
  components: {
    SingleSelect,
  },
  props: {
    modelValue: {
      type: [Number, String, Object],
    },
    placeholder: {
      type: String,
      default: "Sort By",
    },
  },
  computed: {
    ...mapState(useProductsFiltersStore, ["sortingOptions"]),
    settings() {
      return { optionConfig, selectDt, selectPt }
    },
    selectedSorting: {
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

<style lang="scss" scoped></style>
