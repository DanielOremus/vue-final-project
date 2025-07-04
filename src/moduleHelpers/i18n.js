// import { useI18n } from "vue-i18n"
// import { useRouter } from "vue-router"

// export const useLocales = () => {
//   const { t, locale } = useI18n({ useScope: "global" })

//   const setLocale = (lang) => {
//     locale.value = lang
//     localStorage.setItem("lastLocale", lang)
//   }

//   const checkLocale = () => {
//     const lastLocale = localStorage.getItem("lastLocale")
//     if (lastLocale && lastLocale !== locale.value) {
//       setLocale(lastLocale)
//       useRouter().go()
//     }
//   }

//   window.addEventListener("storage", checkLocale)

//   return { t, locale, setLocale, checkLocale }
// }

import i18n from "@/plugins/i18n"
import { router } from "@/router"

class LocaleController {
  static #i18n = i18n.global
  static #router = router
  static t = i18n.global.t
  static get locale() {
    return LocaleController.#i18n.locale
  }

  static set locale(lang) {
    LocaleController.#i18n.locale = lang
    localStorage.setItem("lastLocale", lang)
  }
  static checkLocale() {
    const lastLocale = localStorage.getItem("lastLocale")
    if (lastLocale && lastLocale !== LocaleController.locale) {
      LocaleController.locale = lastLocale
      LocaleController.#router.go()
    }
  }
  static init() {
    window.addEventListener("storage", LocaleController.checkLocale)
  }
  static removeListener() {
    window.removeEventListener("storage", LocaleController.checkLocale)
  }
}

export default LocaleController
