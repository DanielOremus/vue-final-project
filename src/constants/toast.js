import LocaleController from "@/moduleHelpers/i18n"

// const successSettings = {
//   life: DEFAULT_LIFE,
//   severity: "success",
//   summary: LocaleController.t("toast.success.header"),
//   detail: LocaleController.t("toast.success.message"),
// }

// const errorSettings = {
//   life: DEFAULT_LIFE,
//   severity: "error",
//   summary: LocaleController.t("toast.error.header"),
//   detail: LocaleController.t("toast.error.message"),
// }

// const defaultSettings = {
//   life: DEFAULT_LIFE,
//   severity: "secondary",
//   summary: LocaleController.t("toast.default.header"),
//   detail: LocaleController.t("toast.default.message"),
// }

// export const useToastTypes = ()=>( {
//   success: successSettings,
//   error: errorSettings,
//   default: defaultSettings,
// })

export const getToastSettings = (type, customSettings = {}) => {
  const DEFAULT_LIFE = 4000
  const settings = {
    success: {
      life: DEFAULT_LIFE,
      severity: "success",
      summary: LocaleController.t("toast.success.header"),
      detail: LocaleController.t("toast.success.message"),
    },
    error: {
      life: DEFAULT_LIFE,
      severity: "error",
      summary: LocaleController.t("toast.error.header"),
      detail: LocaleController.t("toast.error.message"),
    },
    default: {
      life: DEFAULT_LIFE,
      severity: "secondary",
      summary: LocaleController.t("toast.default.header"),
      detail: LocaleController.t("toast.default.message"),
    },
  }

  if (!Object.keys(settings).includes(type)) {
    console.debug(`Toast type '${type}' not found, using default!`)
  }

  return { ...(settings[type] || settings.default), ...customSettings }
}
