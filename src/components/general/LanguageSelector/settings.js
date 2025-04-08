import { messages } from "@/plugins/i18n"
const locales = {
  en: "English",
  ua: "UA",
}

export default Object.keys(messages).map((locale) => ({
  title: locales[locale],
  value: locale,
}))
