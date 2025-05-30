import { setYupLocale } from "@/plugins/yup"
import * as yup from "yup"

setYupLocale("views.auth.fields")

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
