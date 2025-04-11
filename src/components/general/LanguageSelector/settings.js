import { messages } from "@/plugins/i18n"
const localesTitles = {
  en: "English",
  ua: "Українська",
}

export default Object.keys(messages).map((locale) => ({
  title: localesTitles[locale],
  value: locale,
}))
