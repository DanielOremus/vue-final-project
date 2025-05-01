<template>
  <div class="product-card">
    <div class="product-image__container group">
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
      <div>
        <span class="product-price">{{ roundedProductPrice }} ₴</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    roundedProductPrice() {
      return this.product.price.toFixed(2)
    },
  },
}
</script>

<style lang="scss" scoped>
.product-card {
  font-family: "Outfit", sans-serif;
  @apply text-zinc-800 flex flex-col gap-4;
}
.product-image__container {
  @apply relative h-[42rem] overflow-hidden w-auto bg-surface-200;
}
.product-image {
  @apply object-cover;
}
.product-data__container {
  div:first-child,
  div:last-child {
    @apply flex justify-between;
  }
  div:first-child {
    @apply pb-2;
  }
  div:last-child {
    @apply border-t-[1.5px] border-surface-400 pt-2;
  }
}
.product-name {
  @apply text-xl font-semibold uppercase;
}
.product-mass {
}
.product-price {
  @apply text-[1.15rem] italic font-medium;
}
.add-to-cart-btn {
  @apply absolute left-0 bottom-0 w-full h-10 bg-black flex justify-center items-center translate-y-full group-hover:translate-y-0 transition-transform will-change-transform duration-300 uppercase text-white cursor-pointer;
}
</style>
