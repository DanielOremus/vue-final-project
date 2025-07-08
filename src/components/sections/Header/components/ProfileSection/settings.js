import LocaleController from "@/moduleHelpers/i18n"

export const useLogoutDialogSettings = () => ({
  message: LocaleController.t("header.messages.logout.content"),
  header: LocaleController.t("header.messages.logout.head"),
  rejectProps: {
    label: LocaleController.t("buttons.cancel"),
    severity: "secondary",
    outlined: true,
  },
  acceptProps: {
    label: LocaleController.t("buttons.logout"),
    severity: "danger",
  },
})
