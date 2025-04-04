<template>
  <main-layout> {{ productsList }} </main-layout>
</template>

<script>
import { useProductsStore } from "@/stores/products"
import { mapState } from "pinia"
export default {
  name: "ProductsView",
  computed: {
    ...mapState(useProductsStore, ["productsList"]),
  },
}
</script>

<style lang="scss" scoped></style>
