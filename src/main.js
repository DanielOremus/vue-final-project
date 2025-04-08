import "./assets/style/index.scss"
import "bootstrap-icons/font/bootstrap-icons.scss"

import { createApp } from "vue"
import App from "./App.vue"
import PrimeVue from "primevue/config"
import MyTheme from "./config/theme/options"
import MainLayout from "./layouts/MainLayout.vue"
import Tooltip from "primevue/tooltip"
import pinia from "./stores"
import { router } from "./router"
import i18n from "@/plugins/i18n.js"

const app = createApp(App)

app.use(PrimeVue, MyTheme)

app.use(router)
app.use(pinia)
app.use(i18n)

app.directive("tooltip", Tooltip)
app.component("main-layout", MainLayout)

app.mount("#app")
