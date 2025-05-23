import { globals } from "@/main"
import { toastTypes } from "@/constants/toast"
const { $toast } = globals
export const showAlert = (type = "default", additionalSettings = {}) => {
  const settingsToUse = toastTypes[type]
  if (!settingsToUse) {
    console.debug("No toast settings found!")
  } else {
    $toast.add({ ...settingsToUse, ...additionalSettings })
  }
}
export const closeAlert = () => {
  $toast.remove()
}
