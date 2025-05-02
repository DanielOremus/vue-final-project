<template>
  <Paginator
    v-model:first="startItemIndex"
    :rows="itemsPerPage"
    :total-records="totalItemsNumber"
    class="text-lg font-medium"
    :dt="{
      colorScheme: {
        dark: {
          root: {
            background: '{surface.0}',
          },
          navButton: {
            selectedBackground: '{surface.800}',
            selectedColor: '{primary.400}',
            hoverBackground: '{surface.200}',
            hoverColor: '{surface.800}',
            color: '{surface.600}',
            focusRingColor: '{surface.300}',
          },
        },
      },
    }"
  />
</template>

<script>
export default {
  name: "GeneralPaginator",
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
  },
  computed: {
    pageNumber: {
      get() {
        return this.modelValue
      },
      set(v) {
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
  },
}
</script>

<style lang="scss" scoped></style>
