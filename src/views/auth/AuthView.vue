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
import { showAlert } from "@/primeVueServiceHelpers/toast"
import { errorMessages } from "vue/compiler-sfc"
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

      // this.getAlertSettings(this.hasError)

      if (!this.hasError) {
        showAlert("success", {
          detail: `You\'ve successfully ${
            e.form === "login" ? "logged in" : "registered"
          }! Redirecting...`,
        })
        setTimeout(() => {
          const redirectPath = this.$route.query?.redirect
          if (redirectPath) this.$router.push(redirectPath)
          else this.$router.push({ name: "home" })
        }, 3500)
      } else {
        console.log(this.hasError)

        showAlert("error", { detail: this.getErrorMessage(this.hasError) })
      }
    },

    getErrorMessage(error) {
      switch (error?.status) {
        case 401:
          return "Email or password is incorrect"
        case 400:
          return "Provided data is not valid"
        default:
          return toastTypes.error.detail
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page-content {
  @apply h-full flex justify-center;
}

:deep(.link) {
  @apply text-slate-400 text-[0.95rem] hover:underline hover:cursor-pointer w-fit;
}
</style>
