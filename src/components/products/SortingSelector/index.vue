<template>
  <SingleSelect
    v-model="selectedSorting"
    :option-config="config"
    :options="sortingOptions"
    :placeholder="placeholder"
    :dt="selectorDt"
  />
</template>

<script>
import { optionConfig, selectDt } from "./settings"
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
    config() {
      return optionConfig
    },
    selectorDt() {
      return selectDt
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
