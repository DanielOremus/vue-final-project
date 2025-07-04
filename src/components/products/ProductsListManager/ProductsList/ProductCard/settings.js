import noImageAvailable from "@/assets/images/no-image.png"
import LocaleController from "@/moduleHelpers/i18n"
export const deleteDialogSettings = {
  message: LocaleController.t("views.shop.messages.deleteConfirm.message"),

  header: LocaleController.t("views.shop.messages.deleteConfirm.header"),
  rejectProps: {
    label: LocaleController.t("views.shop.buttons.cancelRemoval"),
    severity: "secondary",
    outlined: true,
  },
  acceptProps: {
    label: LocaleController.t("views.shop.buttons.confirmRemoval"),
    severity: "danger",
  },
}
//TODO: add localization to dialogs
export const noImage = noImageAvailable
