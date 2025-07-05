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
          <FloatLabel variant="on">
            <InputText id="name" size="large" fluid />
            <label for="name">{{ $t("views.productEdit.fields.name") }}</label>
          </FloatLabel>
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
          <FloatLabel variant="on">
            <Select
              option-value="value"
              size="large"
              id="category"
              :options="categoriesList"
              :loading="areCategoriesLoading"
              option-label="name"
              fluid
            >
            </Select>
            <label for="category">{{
              $t("views.productEdit.fields.category")
            }}</label>
          </FloatLabel>
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
          <FloatLabel variant="on">
            <InputNumber
              mode="currency"
              id="price"
              currency="UAH"
              locale="de-DE"
              size="large"
              :min="0"
              fluid
            />
            <label for="price">{{
              $t("views.productEdit.fields.price")
            }}</label>
          </FloatLabel>
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
          <FloatLabel variant="on">
            <InputText id="mass" size="large" fluid />
            <label for="mass">{{ $t("views.productEdit.fields.mass") }}</label>
          </FloatLabel>
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
          :disabled="!$productForm.valid || isLoading"
          :loading="isLoading"
          :label="btnTitle"
        />
      </div>
    </Form>
  </div>
</template>

<script>
import ToastHelper from "@/primeVueServiceHelpers/ToastHelper"
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
    incomingError: {
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
    onSubmit(form) {
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
      if (!imgSrc) return null
      try {
        const response = await fetch(imgSrc)
        const blob = await response.blob()
        return new File([blob], "image", { type: blob.type })
      } catch (error) {
        console.error(error)
        return null
      }
    },
    onNewFileSelected() {
      this.isNewImageSelected = true
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
    incomingError: {
      handler(newValue) {
        if (newValue) {
          ToastHelper.showAlert("error")
        }
      },
      deep: true,
    },
  },
}
</script>

<style lang="css" scoped>
@import url("@/assets/style/components/product/product_form.scss");
</style>
