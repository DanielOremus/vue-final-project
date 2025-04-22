import * as yup from "yup"
import { setLocale } from "yup"
import i18n from "@/plugins/i18n"

const t = i18n.global.t

setLocale({
  mixed: {
    required: ({ path }) =>
      t("validation.mixed.required", {
        field: t(`views.auth.fields.${path}`),
      }),
  },
  string: {
    email: ({ path }) =>
      t("validation.string.email", {
        field: t(`views.auth.fields.${path}`),
      }),
    min: ({ path, min }) =>
      t("validation.string.min", {
        field: t(`views.auth.fields.${path}`),
        min,
      }),
    max: ({ path, max }) =>
      t("validation.string.max", {
        field: t(`views.auth.fields.${path}`),
        max,
      }),
  },
})

class AuthValidator {
  static loginSchema = yup.object({
    email: yup.string().required().trim().email(),
    password: yup.string().required(),
  })
  static registerSchema = yup.object({
    email: yup.string().required().trim().email(),
    username: yup.string().required().trim().min(3).max(20),
    password: yup.string().required().trim().min(3).max(50),
  })
}

export default AuthValidator
