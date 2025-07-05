<template>
  <main-layout>
    <div class="page-content">
      <component
        :is="formComponent"
        @form-submit="signUser"
        class="fixed top-[20%]"
      />
    </div>
  </main-layout>
</template>

<script>
import { mapActions, mapState } from "pinia"
import { useAuthStore } from "@/stores/auth"
import ToastHelper from "@/primeVueServiceHelpers/ToastHelper"
import { toastTypes } from "@/constants/toast"
export default {
  name: "AuthView",
  props: {
    formComponent: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(useAuthStore, ["isLoading", "hasError"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["authenticate"]),
    async signUser(e) {
      if (!["login", "register"].includes(e.form)) return
      await this.authenticate(e.data, e.form)

      if (!this.hasError) {
        ToastHelper.showAlert("success", {
          detail: this.$t(`views.auth.messages.success.${e.form}`),

          life: 2000,
        })
        setTimeout(() => {
          const redirectPath = this.$route.query?.redirect
          if (redirectPath) this.$router.push(redirectPath)
          else this.$router.push({ name: "home" })
        }, 3000)
      } else {
        ToastHelper.showAlert("error", {
          detail: this.getErrorMessage(this.hasError),
        })
      }
    },

    getErrorMessage(error) {
      switch (error?.status) {
        case 401:
          return this.$t("views.auth.messages.error.incorrectCredentials")
        case 400:
          return this.$t("views.auth.messages.error.invalidCredentials")
        default:
          return toastTypes.error.detail
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/views/auth_view.scss");
</style>
