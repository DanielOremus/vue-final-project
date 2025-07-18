<template>
  <main-layout>
    <div class="page-content">
      <product-form
        :is-loading="productsStore.isLoading"
        :are-categories-loading="productsFiltersStore.isLoading"
        :current-product="productsStore.currentProduct"
        :categories-list="productsFiltersStore.categoriesList"
        :error="productsStore.hasError || productsFiltersStore.hasError"
        @submit-product="onSubmit"
        @cancel="onCancel"
      />
    </div>
  </main-layout>
</template>

<script>
import { useProductsStore } from "@/stores/products"
import { useAuthStore } from "@/stores/auth"
import { mapStores } from "pinia"
import MainLayout from "@/layouts/MainLayout.vue"
import ProductForm from "@/components/products/ProductForm/index.vue"
import { useProductsFiltersStore } from "@/stores/products/filters"
import ToastHelper from "@/primeVueServiceHelpers/ToastHelper"

export default {
  name: "ProductEditView",
  components: {
    MainLayout,
    ProductForm,
  },
  props: {
    id: {
      type: [String, Number],
      default: null,
    },
  },
  computed: {
    ...mapStores(useProductsStore, useProductsFiltersStore, useAuthStore),
  },
  methods: {
    async onSubmit(productData) {
      if (productData._id) {
        await this.productsStore.updateProduct(productData, {
          "Content-Type": "multipart/form-data",
        })
      } else {
        await this.productsStore.createProduct(productData, {
          "Content-Type": "multipart/form-data",
        })
      }
      if (this.productsStore.hasError) ToastHelper.showAlert("error")
      else this.$router.push({ name: "shop" })
    },
    onCancel() {
      this.$router.push({ name: "shop" })
    },
  },
  created() {
    this.productsFiltersStore.fetchFilters()
    if (this.id) {
      this.productsStore.fetchProductById(this.id)
    }
  },
  beforeRouteLeave() {
    this.productsStore.clearCurrentProduct()
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/views/product/product_edit_view.scss");
</style>
