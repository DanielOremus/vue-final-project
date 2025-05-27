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
      console.log(productData)

      if (productData._id) {
        await this.productsStore.updateProduct(productData)
      } else {
        await this.productsStore.createProduct(productData)
      }
      if (!this.productsStore.hasError) {
        this.$router.push({ name: "shop" })
      } else {
        if (this.productsStore.hasError.status === 401) {
          this.authStore.logout()
          this.$router.push({
            name: "login",
            query: { redirect: this.$route.path },
          })
        }
      }
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
.page-content {
  @apply h-full flex justify-center mx-4 py-6;
}
</style>
