<template>
  <div class="h-full flex flex-col">
    <div class="w-full flex justify-between flex-wrap gap-4 items-center mb-6">
      <div class="w-full lg:w-fit">
        <span class="text-black text-lg font-medium"
          >Showing {{ itemStartIndex }}-{{ itemEndIndex }} of
          {{ productsStore.total }} results</span
        >
      </div>
      <div class="grow flex flex-wrap gap-4 justify-between lg:justify-end">
        <SortingSelector v-model="selectedSorting" class="grow lg:grow-0" />
        <Button
          v-if="authStore.userPermissions?.products.create"
          @click="onProductCreate"
          severity="success"
          class="w-full lg:w-fit"
          >Create Product</Button
        >
      </div>
    </div>
    <div class="products-list__wrapper">
      <products-list
        :products="productsStore.productsList"
        :is-loading="productsStore.isLoading"
        @product-delete="onProductDelete"
        @product-edit="onProductEdit"
      />
    </div>
    <div class="paginator__container">
      <GeneralPaginator
        :items-per-page="productsStore.perPage"
        :total-items-number="productsStore.total"
        v-model="currentPage"
      />
    </div>
  </div>
</template>

<script>
import { useProductsStore } from "@/stores/products/index"
import { useProductsFiltersStore } from "@/stores/products/filters"
import { useAuthStore } from "@/stores/auth"
import { mapActions, mapStores } from "pinia"
import ProductsList from "@/components/products/ProductsList/index.vue"
import GeneralPaginator from "@/components/general/GeneralPaginator.vue"
import SortingSelector from "@/components/products/SortingSelector/index.vue"
import generalSettings from "./settings"
export default {
  name: "ProductsView",
  components: {
    ProductsList,
    GeneralPaginator,
    SortingSelector,
  },
  data() {
    return {
      // sortBy: null,
    }
  },
  computed: {
    ...mapStores(useProductsStore, useProductsFiltersStore, useAuthStore),
    currentPage: {
      get() {
        // return this.sortBy
        return this.productsStore.currentPage
      },
      async set(v) {
        if (!this.productsStore.isLoading) {
          await this.fetchProducts({
            ...this.productsFiltersStore.productsQueryObj,
            page: v,
          })
          window.scrollTo(
            generalSettings.applyFilterScrollX,
            generalSettings.applyFilterScrollY
          )
        }
      },
    },

    selectedSorting: {
      get() {
        return this.productsFiltersStore.selectedFilters.sort
      },
      set(v) {
        this.productsFiltersStore.setFilterValue("sort", v)
        this.onSortingChange()
      },
    },
    itemStartIndex() {
      const productsLength = this.productsStore.productsList.length
      if (productsLength > 0)
        return this.productsStore.perPage * this.currentPage + 1
      return 0
    },
    itemEndIndex() {
      const productsLength = this.productsStore.productsList.length
      if (productsLength > 0) return this.itemStartIndex - 1 + productsLength
      return 0
    },
  },
  methods: {
    ...mapActions(useProductsStore, [
      "fetchProducts",
      "setListPage",
      "deleteProduct",
    ]),
    async onSortingChange() {
      if (!this.productsStore.isLoading) {
        await this.fetchProducts({
          page: 0,
        })
        window.scrollTo(
          generalSettings.applyFilterScrollX,
          generalSettings.applyFilterScrollY
        )
      }
    },
    onProductDelete(id) {
      this.deleteProduct(id)
    },
    onProductEdit(id) {
      this.$router.push({ name: "productEdit", params: { id } })
    },
    onProductCreate() {
      this.$router.push({ name: "productEdit" })
    },
  },

  mounted() {
    this.fetchProducts()
  },
}
</script>

<style lang="scss" scoped>
.products-list__wrapper {
  @apply h-full;
}
.paginator__container {
  @apply mt-6;
}
</style>
