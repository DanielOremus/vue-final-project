<template>
  <div class="form-container">
    <Form
      v-slot="$product"
      :key="currentProduct"
      class="flex flex-col gap-4"
      :validate-on-submit="true"
      :validate-on-value-update="false"
      :resolver="validator"
      @submit="onSubmit"
    >
      <FormField #default="$field" name="toDeleteImg" class="flex justify-end">
        <label
          class="flex cursor-pointer items-center text-lg text-slate-400 gap-4"
        >
          {{ $t("views.productEdit.fields.deleteImage") }}
          <ToggleSwitch />
        </label>
      </FormField>
      <div class="row">
        <FormField
          #default="$field"
          name="name"
          :initial-value="currentProduct?.name"
          class="flex flex-col gap-1 basis-1/2"
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
          class="flex flex-col gap-1 basis-1/2"
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
      </div>
      <div class="row">
        <FormField
          #default="$field"
          name="price"
          class="flex flex-col gap-1 basis-1/2"
        >
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
        <FormField
          #default="$field"
          name="mass"
          class="flex flex-col gap-1 basis-1/2"
        >
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
      <div class="row">
        <Button class="basis-1/2" severity="secondary" @click="onBack">{{
          $t("buttons.cancel")
        }}</Button>
        <Button type="submit" class="basis-1/2" severity="secondary">{{
          btnTitle
        }}</Button>
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
      if (!this.error) {
        this.$router.push({ name: "productsList" })
      } //TODO: add error render
    },
    onBack() {
      this.$router.push({ name: "productsList" })
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
.row {
  @apply flex gap-4;
}
</style>
