<template>
  <main-layout>
    <div class="page-content">
      <product-form />
    </div>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue"
import ProductForm from "@/components/products/ProductForm/index.vue"
export default {
  name: "ProductEditView",
  components: {
    MainLayout,
    ProductForm,
  },
}
</script>

<style lang="scss" scoped>
.page-content {
  @apply h-full flex justify-center;
}
</style>
