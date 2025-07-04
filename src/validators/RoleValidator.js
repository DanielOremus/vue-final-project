import { setYupLocale } from "@/plugins/yup"
import * as yup from "yup"

setYupLocale("views.roles.fields")

class RoleValidator {
  static defaultSchema = yup.object({
    name: yup.string().trim().required().max(20),
  })
}

export default RoleValidator
