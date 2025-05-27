<template>
  <AccordionPanel value="0">
    <AccordionHeader> {{ $t("views.shop.fields.price") }} </AccordionHeader>
    <AccordionContent>
      <Form
        #default="$priceForm"
        ref="priceFormEl"
        class="flex flex-col gap-3"
        :resolver="resolver"
        validate-on-value-update
        @submit="onPriceApply"
      >
        <InputText
          class="w-full"
          name="minPrice"
          autocomplete="off"
          :placeholder="$t('views.shop.fields.from')"
          :invalid="$priceForm.minPrice?.invalid"
          :dt="inputDt"
        />
        <InputText
          class="w-full"
          name="maxPrice"
          autocomplete="off"
          :placeholder="$t('views.shop.fields.to')"
          :invalid="$priceForm.maxPrice?.invalid"
          :dt="inputDt"
        />
        <Button
          class="text-surface-50 font-medium"
          severity="secondary"
          type="submit"
          :disabled="!$priceForm.valid"
          >{{ $t("buttons.apply") }}</Button
        >
      </Form>
    </AccordionContent>
  </AccordionPanel>
</template>

<script>
import ProductValidator from "@/validators/ProductValidator"
import { yupResolver } from "@primevue/forms/resolvers/yup"
import { priceInputDt } from "../settings"
export default {
  name: "PricePanel",
  props: {
    reset: {
      type: Number,
      default: null,
    },
  },
  computed: {
    resolver() {
      return yupResolver(ProductValidator.filtersPriceSchema)
    },
    inputDt() {
      return priceInputDt
    },
    currencyLocale() {
      if (this.$i18n.locale === "en") return "de-DE"
    },
  },
  methods: {
    onPriceApply({ valid, values }) {
      if (valid) this.$emit("apply", [values.minPrice, values.maxPrice])
    },
  },
  watch: {
    reset() {
      this.$refs.priceFormEl.reset()
    },
  },
}
</script>

<style lang="scss" scoped></style>
