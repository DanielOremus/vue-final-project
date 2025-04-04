import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"

export const useLocales = () => {
  const { t, locale } = useI18n({ useScope: "global" })

  const setLocale = (lang) => {
    locale.value = lang
    localStorage.setItem("lastLocale", lang)
  }

  const checkLocale = () => {
    const lastLocale = localStorage.getItem("lastLocale")
    if (lastLocale && lastLocale !== locale.value) {
      setLocale(lastLocale)
      useRouter().go()
    }
  }

  window.addEventListener("storage", checkLocale)

  return { t, locale, setLocale, checkLocale }
}
