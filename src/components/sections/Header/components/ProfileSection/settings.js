import LocaleController from "@/moduleHelpers/i18n"

export const logoutDialogSettings = {
  message: "Do you really want to log out?",
  header: "Are you sure?",
  rejectProps: {
    label: LocaleController.t("buttons.cancel"),
    severity: "secondary",
    outlined: true,
  },
  acceptProps: {
    label: LocaleController.t("buttons.logout"),
    severity: "danger",
  },
}
