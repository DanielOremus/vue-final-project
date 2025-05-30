<template>
  <FileUpload
    :name="name"
    accept="image/*"
    :maxFileSize="5 * 1024 * 1024"
    :show-upload-button="false"
    :choose-label="$t('buttons.browse')"
    :cancel-label="$t('buttons.clear')"
    ref="fileUpload"
    @select="onFileSelect"
    @clear="clearSelectedFile"
    :file-limit="1"
  >
    <template #content>
      <div class="border-t-2 border-slate-600 rounded-lg"></div>
      <div class="flex justify-center h-[15rem]">
        <div v-if="selectedFile" class="img__container h-full">
          <Image :src="selectedFile" image-class="h-full" />
        </div>
        <span v-else class="self-center text-lg text-center text-slate-300">
          {{ caption }}
        </span>
      </div>
    </template>
  </FileUpload>
</template>

<script>
export default {
  name: "ImageUploader",
  emits: ["select", "update:modelValue"],
  props: {
    modelValue: {
      type: Object,
      default: null,
    },
    name: {
      type: String,
      default: "image",
    },
    caption: {
      type: String,
      default: "Перетягніть і відпустіть зображення, щоб його завантажити",
    },
  },
  computed: {
    selectedFile: {
      get() {
        return this.modelValue ? URL.createObjectURL(this.modelValue) : null
      },
      set(file) {
        this.$emit("update:modelValue", file)
      },
    },
  },
  methods: {
    onFileSelect(event) {
      const file = event.files[0]
      this.selectedFile = file
      this.$emit("select", event)
    },
    clearSelectedFile() {
      this.selectedFile = null
    },
  },
}
</script>

<style lang="scss" scoped></style>
