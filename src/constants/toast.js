import LocaleController from "@/moduleHelpers/i18n"

const DEFAULT_LIFE = 4000

const successSettings = {
  life: DEFAULT_LIFE,
  severity: "success",
  summary: LocaleController.t("toast.success.header"),
  detail: LocaleController.t("toast.success.message"),
}

const errorSettings = {
  life: DEFAULT_LIFE,
  severity: "error",
  summary: LocaleController.t("toast.error.header"),
  detail: LocaleController.t("toast.error.message"),
}

const defaultSettings = {
  life: DEFAULT_LIFE,
  severity: "secondary",
  summary: LocaleController.t("toast.default.header"),
  detail: LocaleController.t("toast.default.message"),
}

export const toastTypes = {
  success: successSettings,
  error: errorSettings,
  default: defaultSettings,
}
