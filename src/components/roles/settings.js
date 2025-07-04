import LocaleController from "@/moduleHelpers/i18n"

export const getDeletionDialogSettings = (userNumber) => ({
  message: LocaleController.t("views.roles.messages.deleteConfirm.message", {
    userNumber,
  }),
  header: LocaleController.t("views.roles.messages.deleteConfirm.header"),
  rejectProps: {
    label: LocaleController.t("buttons.cancel"),
    severity: "secondary",
    outlined: true,
  },
  acceptProps: {
    label: LocaleController.t("views.roles.buttons.deleteAnyway"),
    severity: "danger",
  },
})
