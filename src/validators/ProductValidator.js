import * as yup from "yup"
import i18n from "@/plugins/i18n"

const $t = i18n.global.t

yup.setLocale({
  mixed: {
    required: ({ path }) =>
      $t("validation.mixed.required", {
        field: $t(`views.productEdit.fields.${path}`),
      }),
  },
  string: {
    email: ({ path }) =>
      $t("validation.string.email", {
        field: $t(`views.productEdit.fields.${path}`),
      }),
    min: ({ path, min }) =>
      $t("validation.string.min", {
        field: $t(`views.productEdit.fields.${path}`),
        min,
      }),
    max: ({ path, max }) =>
      $t("validation.string.max", {
        field: $t(`views.productEdit.fields.${path}`),
        max,
      }),
  },
  number: {
    min: ({ path, gte }) =>
      $t("validation.number.gte", {
        field: $t(`views.productEdit.fields.${path}`),
        gte,
      }),
    positive: ({ path }) =>
      $t("validation.number.positive", {
        field: $t(`views.productEdit.fields.${path}`),
      }),
  },
})

class ProductValidator {
  static filtersPriceSchema = yup.object({
    minPrice: yup
      .mixed()
      .nullable()
      .transform((v, originalValue) =>
        !originalValue || originalValue === "" ? null : Number(v)
      )
      .test(
        "is-null-or-gte-0",
        "Min price must be a number",
        (v) => v === null || (isFinite(v) && v >= 0)
      ),
    maxPrice: yup
      .mixed()
      .nullable()
      .transform((v, originalValue) =>
        !originalValue || originalValue === "" ? null : Number(v)
      )
      .when("minPrice", {
        is: (minPrice) => minPrice !== null,
        then: (schema) =>
          schema.test(
            "is-null-or-gte-min",
            "Max price cannot be lower than min",
            (v, context) =>
              v === null || (isFinite(v) && v >= context.parent.minPrice)
          ),
      }),
  })
  static defaultSchema = yup.object({
    name: yup.string().required().min(3).max(30).trim(),
    description: yup
      .string()
      .transform((v, originalValue) => (originalValue === "" ? null : v))
      .nullable()
      .min(10)
      .max(200)
      .trim(),
    price: yup.number().required().positive(),
    mass: yup
      .number()
      .typeError("*маса* повинна бути числом")
      .required()
      .positive(),
    category: yup.string().required(),
  })
}

export default ProductValidator
