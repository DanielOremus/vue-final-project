<template>
  <div class="h-full flex flex-col">
    <div class="w-full flex justify-between flex-wrap gap-4 items-center mb-6">
      <div class="w-full lg:w-fit">
        <span class="text-black text-lg font-medium">{{
          $t("views.shop.messages.renderedResults", {
            first: itemStartIndex,
            last: itemEndIndex,
            total: productsStore.total,
          })
        }}</span>
      </div>
      <div class="grow flex flex-wrap gap-4 justify-between lg:justify-end">
        <SortingSelector
          v-model="selectedSorting"
          :placeholder="$t('views.shop.fields.sortBy')"
          class="grow lg:grow-0"
        />
        <Button
          v-if="authStore.userPermissions?.products.create"
          :label="$t('views.shop.buttons.createProduct')"
          @click="onProductCreate"
          severity="success"
          class="w-full lg:w-fit"
        />
      </div>
    </div>
    <div class="products-list__wrapper">
      <products-list
        :products="productsStore.productsList"
        @product-delete="onProductDelete"
        @product-edit="onProductEdit"
        @add-to-cart="onAddToCart"
      />
    </div>
    <div class="paginator__container">
      <GeneralPaginator
        :items-per-page="productsStore.perPage"
        :total-items-number="productsStore.total"
        type="light"
        v-model="currentPage"
      />
    </div>
  </div>
</template>

<script>
import { useProductsStore } from "@/stores/products/index"
import { useProductsFiltersStore } from "@/stores/products/filters"
import { useAuthStore } from "@/stores/auth"
import { mapStores } from "pinia"
import ProductsList from "./ProductsList/index.vue"
import GeneralPaginator from "@/components/general/GeneralPaginator/index.vue"
import SortingSelector from "@/components/products/SortingSelector/index.vue"
import generalSettings from "../settings"
import { toRef, computed } from "vue"
import { useCartStore } from "@/stores/cart"
export default {
  name: "ProductsListManager",
  components: {
    ProductsList,
    GeneralPaginator,
    SortingSelector,
  },
  provide() {
    return {
      isLoading: toRef(this.productsStore, "isLoading"),
      operationPerms: computed(
        () => this.authStore.userPermissions?.products ?? {}
      ),
    }
  },
  computed: {
    ...mapStores(
      useProductsStore,
      useProductsFiltersStore,
      useAuthStore,
      useCartStore
    ),
    currentPage: {
      get() {
        return this.productsStore.currentPage
      },
      async set(v) {
        if (!this.productsStore.isLoading) {
          await this.productsStore.fetchProducts({
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
    async onSortingChange() {
      if (!this.productsStore.isLoading) {
        await this.productsStore.fetchProducts({
          page: 0,
        })
        window.scrollTo(
          generalSettings.applyFilterScrollX,
          generalSettings.applyFilterScrollY
        )
      }
    },
    onProductDelete(id) {
      this.productsStore.deleteProduct(id)
    },
    onProductEdit(id) {
      this.$router.push({ name: "productEdit", params: { id } })
    },
    onProductCreate() {
      this.$router.push({ name: "productEdit" })
    },
    onAddToCart(id) {
      this.cartStore.addProduct(id)
    },
  },

  mounted() {
    this.productsStore.fetchProducts()
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/components/product/products_list.scss");
</style>
