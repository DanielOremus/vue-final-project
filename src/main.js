import "./assets/style/index.css"

import { createApp } from "vue"
import App from "./App.vue"
import PrimeVue from "primevue/config"
import MyTheme from "./assets/theme/main"

import router from "./router"

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: MyTheme,
    options: {
      cssLayer: {
        name: "primevue",
        order: "tailwind-base, primevue, tailwind-utilities",
      },
    },
  },
})
app.use(router)

app.mount("#app")
