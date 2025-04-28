<template>
  <div class="product-card">
    <div class="product-image__container h-[42rem] w-auto bg-surface-200">
      <img class="product-image" :src="product.image" />
    </div>
    <div class="product-data__container">
      <div>
        <span class="product-name">{{ product.name }}</span>
        <span class="product-mass">{{ product.mass }}</span>
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
</style>
