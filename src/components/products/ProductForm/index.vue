<template>
  <div class="form-container">
    <Form
      :key="currentProduct"
      class="flex flex-col gap-3"
      :resolver="resolver"
      @submit="onSubmit"
    >
      <FormField
        #default="$field"
        name="toDeleteImg"
        :initial-value="false"
        class="flex justify-end"
      >
        <label
          class="flex cursor-pointer items-center text-lg text-slate-400 gap-4"
        >
          {{ $t("views.productEdit.messages.deleteImg") }}
          <ToggleSwitch />
        </label>
      </FormField>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormField
          #default="$field"
          name="name"
          :initial-value="currentProduct?.name"
          class="flex flex-col gap-1"
        >
          <InputText
            :placeholder="$t('views.productEdit.fields.name')"
            size="large"
            fluid
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField
          #default="$field"
          name="category"
          :initial-value="currentProduct?.category.value"
          class="flex flex-col gap-1"
        >
          <Select
            :options="categoriesList"
            :loading="loading"
            :option-label="getTranslatedCategory"
            option-value="value"
            :placeholder="$t('views.productEdit.fields.category')"
            size="large"
            fluid
          >
          </Select>
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>

        <FormField #default="$field" name="price" class="flex flex-col gap-1">
          <InputNumber
            mode="currency"
            currency="UAH"
            locale="de-DE"
            :placeholder="$t('views.productEdit.fields.price')"
            size="large"
            :min="0"
            fluid
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField #default="$field" name="mass" class="flex flex-col gap-1">
          <InputText
            :placeholder="$t('views.productEdit.fields.mass')"
            size="large"
            fluid
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
      </div>
      <FormField
        #default="$field"
        name="description"
        class="flex flex-col gap-1"
      >
        <Textarea
          rows="5"
          class="resize-none"
          size="large"
          :placeholder="$t('views.productEdit.fields.description')"
          fluid
        ></Textarea>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <ImageUpload
        name="image"
        v-model="currentImage"
        @select="onNewFileSelected"
        :caption="$t('views.productEdit.fields.image')"
      />
      <div class="grid grid-cols-2 gap-3 font-medium">
        <Button severity="danger" @click="onCancel">{{
          $t("buttons.cancel")
        }}</Button>
        <Button
          type="submit"
          :severity="currentProduct?._id ? 'info' : 'success'"
          >{{ btnTitle }}</Button
        >
      </div>
    </Form>
  </div>
</template>

<script>
import { useProductsStore } from "@/stores/products"
import { mapActions, mapState, mapStores } from "pinia"
import { yupResolver } from "@primevue/forms/resolvers/yup"
import ProductValidator from "@/validators/ProductValidator"
import ImageUpload from "./components/ImageUploader.vue"
export default {
  name: "ProductForm",
  components: {
    ImageUpload,
  },
  data() {
    return {
      isNewImageSelected: false,
      currentImage: null,
    }
  },
  computed: {
    ...mapStores(useProductsStore),
    ...mapState(useProductsStore, ["hasError", "isLoading"]),
    resolver() {
      return yupResolver(ProductValidator.defaultSchema)
    },
    currentProduct() {
      return this.productsStore.currentProduct
    },
    btnTitle() {
      return this.currentProduct?._id
        ? this.$t("buttons.update")
        : this.$t("buttons.create")
    },
    initialData() {
      if (!this.currentProduct) return { toDeleteImg: false }
      return {
        ...this.currentProduct,
        category: this.currentProduct.category._id,
        toDeleteImg: false,
      }
    },
  },
  methods: {
    ...mapActions(useProductsStore, ["createProduct", "updateProduct"]),
    async onSubmit(form) {
      if (!form.valid) return
      if (this.currentProduct?._id) {
        await this.updateProduct({
          ...form.values,
          _id: this.currentProduct._id,
          image: this.isNewImageSelected ? this.currentImage : undefined,
        })
      } else {
        await this.createProduct({
          ...form.values,
          image: this.isNewImageSelected ? this.currentImage : undefined,
        })
      }
      if (!this.productsStore.hasError) {
        this.$router.push({ name: "shop" })
      } //TODO: add error render
    },
    onCancel() {
      this.$router.push({ name: "shop" })
    },
    async createFileFromImg(imgSrc) {
      if (!imgSrc) return
      const response = await fetch(imgSrc)
      const blob = await response.blob()
      return new File([blob], "image", { type: blob.type })
    },
    onNewFileSelected() {
      this.isNewImageSelected = true
    },
    reset() {
      this.productsStore.$reset()
      this.isNewImageSelected = false
      this.currentImage = null
    },
    getTranslatedCategory(category) {
      return this.$t(`categories.${category.value}`)
    },
  },
  //TODO: розібрати код
  watch: {
    currentProduct: {
      handler: async function (newValue) {
        if (newValue?.image) {
          this.currentImage = await this.createFileFromImg(newValue?.image)
        }
      },
    },
    $route: {
      immediate: true,
      handler() {
        this.reset()
      },
    },
  },
}
</script>

<style lang="css" scoped>
.form-container {
  @apply w-full max-w-[800px];
}
</style>
