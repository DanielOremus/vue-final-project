import "./assets/style/index.scss"
import "bootstrap-icons/font/bootstrap-icons.scss"

import { createApp } from "vue"
import App from "./App.vue"
import PrimeVue from "primevue/config"
import MyTheme from "./assets/theme/main"
import MainLayout from "./layouts/MainLayout.vue"
import pinia from "./stores"
import { router } from "./router"

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: MyTheme,
    options: {
      cssLayer: {
        name: "primevue",
        order: "tailwind-base, primevue, tailwind-utilities",
      },
      darkModeSelector: ".dark",
    },
  },
})
app.use(router)
app.use(pinia)

app.component("main-layout", MainLayout)

app.mount("#app")
