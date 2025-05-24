import { createApp } from "vue"
import App from "@/App.vue"
import PrimeVue from "primevue/config"
import ToastService from "primevue/toastservice"
import ConfirmationService from "primevue/confirmationservice"
import MyTheme from "@/config/theme/options"
import pinia from "@/stores"
import { router } from "@/router"
import i18n from "@/plugins/i18n.js"
import { Swiper, SwiperSlide } from "swiper/vue"
import MainLayout from "@/layouts/MainLayout.vue"
import HeadImgLayout from "@/layouts/HeadImgLayout.vue"
import BasicButton from "@/components/general/BasicButton/index.vue"

const app = createApp(App)

app.use(PrimeVue, MyTheme)
app.use(ToastService)
app.use(ConfirmationService)

app.use(router)
app.use(pinia)
app.use(i18n)

app.component("main-layout", MainLayout)
app.component("head-img-layout", HeadImgLayout)
app.component("basic-button", BasicButton)
app.component("swiper", Swiper)
app.component("swiper-slide", SwiperSlide)

const globals = app.config.globalProperties

export { app, globals }
