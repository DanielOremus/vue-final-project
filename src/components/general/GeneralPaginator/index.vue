<template>
  <Paginator
    v-model:first="startItemIndex"
    :rows="itemsPerPage"
    :total-records="totalItemsNumber"
    class="text-lg font-medium"
    :dt="paginatorType?.dt"
    :pt="paginatorType?.pt"
  />
</template>

<script>
import { generalPaginatorTypes } from "./settings"
export default {
  name: "GeneralPaginator",
  emits: ["update:modelValue"],
  props: {
    totalItemsNumber: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "dark",
      validator(value) {
        return ["light", "dark"].includes(value)
      },
    },
  },
  computed: {
    pageNumber: {
      get() {
        return this.modelValue
      },
      set(v) {
        if (v === this.modelValue) return
        this.$emit("update:modelValue", v)
      },
    },
    startItemIndex: {
      get() {
        return this.pageNumber * this.itemsPerPage
      },
      set(v) {
        this.pageNumber = Math.ceil(v / this.itemsPerPage)
      },
    },
    paginatorType() {
      return generalPaginatorTypes[this.type]
    },
  },
}
</script>

<style lang="scss" scoped></style>
