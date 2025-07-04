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
.cart-item {
  @apply grid grid-cols-[8.5rem,auto,25rem] grid-rows-[8.5rem] w-full items-center text-surface-950;
  font-family: "Outfit", "Montserrat";
}
.counter__container {
  @apply flex gap-4;
}
.counter__btn {
  @apply text-surface-0 border-2 border-surface-700 bg-surface-700 rounded-none text-lg w-[2.5rem] h-[2.5rem] hover:bg-primary hover:border-primary hover:text-surface-950;
}
:deep(.counter_input input) {
  @apply bg-surface-0 text-surface-950 w-[5rem] rounded-none border-surface-500 focus:border-surface-400;
}
.controls__container {
  @apply flex gap-8 items-center;
}
.price-data {
  @apply text-lg text-surface-500;
}
.name__container {
  @apply text-xl ml-10;
}
.img__container {
  @apply flex items-center justify-center;
}
.img {
  @apply max-h-full max-w-full object-contain;
}
.remove-icon {
  @apply text-xl text-red-600 scale-100 cursor-pointer hover:scale-[120%];
  transition: transform 0.25s ease, opacity 0.2s ease-in;
}
</style>
