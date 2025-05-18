import * as yup from "yup"

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
}

export default ProductValidator
