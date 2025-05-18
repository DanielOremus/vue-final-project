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
import { showToast } from "@/primeVueServiceHelpers/toast"
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

      const toastSettings = this.getToastSettings(this.hasError)
      showToast(this.$toast, toastSettings)

      if (!this.hasError) {
        setTimeout(() => {
          const redirectPath = this.$route.query?.redirect
          if (redirectPath) this.$router.push(redirectPath)
          else this.$router.push({ name: "home" })
        }, 4000)
      }
    },
    getToastSettings(error) {
      return error
        ? {
            severity: "error",
            summary: "Oops",
            detail: "Something went wrong, please try again later!",
          }
        : {
            severity: "success",
            summary: "Success",
            detail: "You've successfully logged in! Redirecting...",
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
