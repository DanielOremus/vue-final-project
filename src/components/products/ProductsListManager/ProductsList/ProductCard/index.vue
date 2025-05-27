<template>
  <div class="product-card">
    <div class="product-image__container group">
      <div v-show="isLoading" class="product-shimmer__container">
        <shimmer-overlay />
      </div>
      <img
        class="product-image"
        @click="onShowDetails"
        :src="product.image ?? noImage"
      />
      <div class="add-to-cart-btn" @click="console.log(1)">
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
            v-if="canEdit"
            class="edit-icon bi bi-pencil-square"
            @click="onEdit"
          />
          <i
            v-if="canDelete"
            class="delete-icon bi bi-trash-fill"
            @click="onDelete"
          />
        </div>
      </div>
    </div>
    <product-details-dialog :product="product" v-model="areDetailsShown" />
  </div>
</template>

<script>
import { deleteDialogSettings, noImage } from "./settings"
import ProductDetailsDialog from "./ProductDetailsDialog.vue"
export default {
  name: "ProductCard",
  components: {
    ProductDetailsDialog,
  },
  data() {
    return {
      areDetailsShown: false,
    }
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    roundedProductPrice() {
      return this.product.price.toFixed(2)
    },
    noImage() {
      return noImage
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
    onShowDetails() {
      this.areDetailsShown = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/product/product_card.scss);
</style>
