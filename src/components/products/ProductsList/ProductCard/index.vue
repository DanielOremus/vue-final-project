<template>
  <div class="product-card">
    <div class="product-image__container group">
      <div v-show="isLoading" class="absolute top-0 left-0 w-full h-full">
        <shimmer-overlay />
      </div>
      <img class="product-image" :src="product.image" />
      <div class="add-to-cart-btn">
        {{ $t("views.shop.buttons.addToCart") }}
      </div>
    </div>
    <div class="product-data__container">
      <div>
        <span class="product-name">{{ product.name }}</span>
        <span class="product-mass">{{ product.mass }} g</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="product-price">{{ roundedProductPrice }} ₴</span>
        <div class="flex gap-3">
          <i
            v-if="userPermissions?.products.update"
            class="edit-icon bi bi-pencil-square"
            @click="onEdit"
          />
          <i
            v-if="userPermissions?.products.delete"
            class="delete-icon bi bi-trash-fill"
            @click="onDelete"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth"
import { mapState } from "pinia"
import { deleteDialogSettings } from "./settings"
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState(useAuthStore, ["userPermissions"]),
    roundedProductPrice() {
      return this.product.price.toFixed(2)
    },
  },
  methods: {
    onEdit() {
      this.$emit("product-edit", this.product._id)
    },
    onDelete() {
      this.$confirm.require({
        ...deleteDialogSettings,
        accept: () => this.$emit("product-delete", this.product._id),
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/product/product_card.scss);
</style>
