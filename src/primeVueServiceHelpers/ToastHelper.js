import { getToastSettings } from "@/constants/toast"
import { app } from "@/config/app"

const toast = app.config.globalProperties.$toast

class ToastHelper {
  constructor(toast) {
    this.toast = toast
  }
  showAlert(type = "default", additionalSettings) {
    const settingsToUse = getToastSettings(type, additionalSettings)
    this.toast.add(settingsToUse)
  }
  closeAlert() {
    this.toast.remove()
  }
}

export default new ToastHelper(toast)
