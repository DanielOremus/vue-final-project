<template>
  <AccordionPanel value="1">
    <AccordionHeader> {{ $t("views.shop.fields.category") }} </AccordionHeader>
    <AccordionContent>
      <div class="categories-list flex flex-col gap-2">
        <loading-spinner
          v-show="isLoading"
          class="border-2 border-surface-400 w-8"
        />
        <div
          v-for="category in categoriesList"
          :key="category._id"
          class="flex items-center gap-2"
        >
          <checkbox
            v-model="selectedCategories"
            :input-id="category._id"
            :value="category.value"
            :dt="checkboxDt"
          />
          <label :for="category._id" class="text-lg cursor-pointer">{{
            category.name
          }}</label>
        </div>
        <div class="flex gap-2">
          <Button
            class="text-surface-50 font-medium mt-2"
            severity="secondary"
            fluid
            @click="onClear"
            >{{ $t("buttons.clear") }}</Button
          >
          <Button
            class="text-surface-50 font-medium mt-2"
            severity="secondary"
            fluid
            :disabled="isLoading || error"
            @click="onCategoryApply"
            >{{ $t("buttons.apply") }}</Button
          >
        </div>
      </div>
    </AccordionContent>
  </AccordionPanel>
</template>

<script>
import { categoryCheckboxDt } from "../settings"
export default {
  name: "CategoryPanel",
  data() {
    return {
      selectedCategories: [],
    }
  },
  props: {
    categoriesList: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    checkboxDt() {
      return categoryCheckboxDt
    },
  },
  methods: {
    onCategoryApply() {
      this.$emit("apply", this.selectedCategories)
    },
    onClear() {
      this.selectedCategories = []
      this.onCategoryApply()
    },
  },
}
</script>

<style lang="scss" scoped></style>
