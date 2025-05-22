<template>
  <div class="form-container">
    <Form
      class="flex flex-col gap-3"
      #default="$productForm"
      :key="currentProduct"
      :resolver="resolver"
      @submit="onSubmit"
    >
      <FormField
        #default="$field"
        name="shouldDeleteImg"
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
            :loading="areCategoriesLoading"
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

        <FormField
          #default="$field"
          name="price"
          class="flex flex-col gap-1"
          :initial-value="currentProduct?.price"
        >
          <InputNumber
            mode="currency"
            currency="UAH"
            locale="de-DE"
            size="large"
            :placeholder="$t('views.productEdit.fields.price')"
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
          class="flex flex-col gap-1"
          :initial-value="currentProduct?.mass"
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
        :initial-value="currentProduct?.description"
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
          :disabled="!$productForm.valid"
          >{{ btnTitle }}</Button
        >
      </div>
    </Form>
  </div>
</template>

<script>
import { yupResolver } from "@primevue/forms/resolvers/yup"
import ProductValidator from "@/validators/ProductValidator"
import ImageUpload from "./components/ImageUploader.vue"
export default {
  name: "ProductForm",
  components: {
    ImageUpload,
  },
  props: {
    currentProduct: {
      type: Object,
      default: null,
    },
    categoriesList: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    areCategoriesLoading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isNewImageSelected: false,
      currentImage: null,
    }
  },
  computed: {
    resolver() {
      return yupResolver(ProductValidator.defaultSchema)
    },
    btnTitle() {
      return this.currentProduct?._id
        ? this.$t("buttons.update")
        : this.$t("buttons.create")
    },
  },
  methods: {
    onSubmit(form, e) {
      if (!form.valid) return
      const productData = {
        ...form.values,
        _id: this.currentProduct?._id,
        image: this.isNewImageSelected ? this.currentImage : undefined,
      }

      this.$emit("submitProduct", productData)
    },
    onCancel() {
      this.$emit("cancel")
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
    // reset() {
    //   this.productsStore.$reset()
    //   this.isNewImageSelected = false
    //   this.currentImage = null
    // },
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
  },
}
</script>

<style lang="css" scoped>
.form-container {
  @apply w-full max-w-[800px];
}
</style>
