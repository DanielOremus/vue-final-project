<template>
  <main-layout>
    {{ productsList }}
    <div>Loading : {{ isLoading }}</div>
  </main-layout>
</template>

<script>
import { useProductsStore } from "@/stores/products"
import { mapState, mapActions } from "pinia"
export default {
  name: "ProductsView",
  computed: {
    ...mapState(useProductsStore, ["isLoading", "productsList"]),
  },
  methods: {
    ...mapActions(useProductsStore, ["setLoading", "fetchProducts"]),
  },
  mounted() {
    this.fetchProducts()
  },
}
</script>

<style lang="scss" scoped></style>
