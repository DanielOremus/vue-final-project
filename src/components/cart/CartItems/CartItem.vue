<template>
  <div
    class="cart-item"
    @mouseenter="changeHoverStatus(true)"
    @mouseleave="changeHoverStatus(false)"
  >
    <div class="img__container">
      <img class="img" :src="product.image ?? noImage" alt="Product image" />
    </div>
    <div class="name__container">
      <span class="name">{{ product.name }} ({{ product.mass }}g)</span>
    </div>
    <div class="controls__container">
      <div class="counter__container">
        <Button
          class="counter__btn"
          variant="outlined"
          icon="bi bi-dash"
          @click="decrementQty"
        />
        <InputNumber
          class="counter_input"
          size="small"
          :min="1"
          :allow-empty="false"
          v-model="currentQuantity"
        />
        <Button
          class="counter__btn"
          variant="outlined"
          icon="bi bi-plus"
          @click="incrementQty"
        />
      </div>
      <span class="price-data">
        {{ currentQuantity }} x {{ product.price }}₴
      </span>
      <i
        class="bi bi-x-circle remove-icon"
        :class="removeIconOpacityClass"
        @click="onRemoveProduct"
      />
    </div>
  </div>
</template>

<script>
import { noImage } from "@/components/products/ProductsListManager/ProductsList/ProductCard/settings"
export default {
  name: "CartItem",
  emits: ["quantity-change", "remove-product"],
  data() {
    return {
      // quantityValue: null,
      isItemHovered: false,
    }
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },

  computed: {
    noImage() {
      return noImage
    },
    currentQuantity: {
      get() {
        return this.quantity
      },
      set(v) {
        // this.quantityValue = v

        this.$emit("quantity-change", { itemId: this.product._id, newQty: v })
      },
    },
    removeIconOpacityClass() {
      return this.isItemHovered ? "opacity-100" : "opacity-0"
    },
  },
  methods: {
    changeHoverStatus(v) {
      this.isItemHovered = v
    },
    incrementQty() {
      this.currentQuantity++
    },
    decrementQty() {
      this.currentQuantity--
    },
    onRemoveProduct() {
      this.$emit("remove-product", this.product._id)
    },
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/components/cart/cart_item.scss");
</style>
