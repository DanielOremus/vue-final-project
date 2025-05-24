<template>
  <Dialog
    modal
    :draggable="false"
    v-model:visible="isVisible"
    :dt="{
      background: '{neutral.800}',
      borderColor: '{neutral.600}',
    }"
  >
    <div class="details__container" autofocus>
      <!-- Головна частина: картинка + властивості -->
      <div class="details__main px-4">
        <img
          :src="product.image ?? noImage"
          alt="Product Image"
          class="product-image"
        />
        <div>
          <h2 class="text-2xl font-semibold mb-4">{{ product.name }}</h2>
          <div class="flex flex-col gap-1 text-lg text-neutral-400">
            <span
              >{{ $t("views.productEdit.fields.category") }}:
              {{ product.category.name }}</span
            >
            <span
              >{{ $t("views.productEdit.fields.mass") }}:
              {{ product.mass }} g</span
            >
            <span class="font-semibold text-primary-400"
              >{{ $t("views.productEdit.fields.price") }}:
              {{ product.price }} ₴</span
            >
          </div>
        </div>
      </div>

      <!-- Опис -->
      <div class="details__description px-4 pb-4">
        <p class="mt-4 text-md text-neutral-400 whitespace-pre-line">
          {{ product.description ?? "Опис відсутній." }}
        </p>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { noImage } from "./settings"
export default {
  name: "ProductDetailsDialog",
  props: {
    product: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isVisible: {
      get() {
        return this.modelValue
      },
      set(v) {
        this.$emit("update:modelValue", v)
      },
    },
    noImage() {
      return noImage
    },
  },
}
</script>

<style lang="scss" scoped>
.details__container {
  @apply w-[20rem] sm:w-[30rem] lg:w-[38rem];
  font-family: "Outfit", "Montserrat", sans-serif;
}
.details__main {
  @apply grid grid-cols-1 gap-y-4 sm:grid-cols-2;
}
.product-image {
  @apply w-full max-h-60 object-contain rounded-lg;
}
</style>
