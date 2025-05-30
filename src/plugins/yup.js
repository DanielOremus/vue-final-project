import * as yup from "yup"
import LocaleController from "@/moduleHelpers/i18n"

const setLocale = (t, fieldLocalePath) => {
  yup.setLocale({
    mixed: {
      required: ({ path }) =>
        t("validation.mixed.required", {
          field: t(`${fieldLocalePath}.${path}`),
        }),
    },
    string: {
      email: ({ path }) =>
        t("validation.string.email", {
          field: t(`${fieldLocalePath}.${path}`),
        }),
      min: ({ path, min }) =>
        t("validation.string.min", {
          field: t(`${fieldLocalePath}.${path}`),
          min,
        }),
      max: ({ path, max }) =>
        t("validation.string.max", {
          field: t(`${fieldLocalePath}.${path}`),
          max,
        }),
    },
    number: {
      min: ({ path, gte }) =>
        t("validation.number.gte", {
          field: t(`${fieldLocalePath}.${path}`),
          gte,
        }),
      positive: ({ path }) =>
        t("validation.number.positive", {
          field: t(`${fieldLocalePath}.${path}`),
        }),
    },
  })
}

export const setYupLocale = setLocale.bind(null, LocaleController.t)
