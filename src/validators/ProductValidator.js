import { setYupLocale } from "@/plugins/yup"
import * as yup from "yup"

setYupLocale("views.productEdit.fields")

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
