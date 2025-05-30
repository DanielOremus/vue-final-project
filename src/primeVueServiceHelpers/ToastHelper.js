import { toastTypes } from "@/constants/toast"
import { app } from "@/config/app"

const toast = app.config.globalProperties.$toast

class ToastHelper {
  constructor(toast, toastTypes) {
    this.toast = toast
    this.toastTypes = toastTypes
  }
  showAlert(type = "default", additionalSettings = {}) {
    const settingsToUse = this.toastTypes[type]
    if (!settingsToUse) {
      console.debug("No toast settings found!")
    } else {
      this.toast.add({ ...settingsToUse, ...additionalSettings })
    }
  }
  closeAlert() {
    this.toast.remove()
  }
}

export default new ToastHelper(toast, toastTypes)
