import { createI18n } from "vue-i18n"
import localeEN from "@/locales/en.json"
import localeUA from "@/locales/ua.json"

const messages = {
  en: localeEN,
  ua: localeUA,
}

const i18n = createI18n({
  legacy: true,
  locale:
    localStorage.getItem("lastLocale") ||
    import.meta.env.VITE_I18N_LOCALE ||
    "en",
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || "en",
  messages,
  globalInjection: true,
})

export { messages }
export default i18n
