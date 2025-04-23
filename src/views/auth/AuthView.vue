<template>
  <main-layout>
    <div class="form-wrapper">
      <div class="form-container">
        <component :is="formComponent" @form-submit="signUser" />
      </div>
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
        setTimeout(() => this.$router.push({ name: "home" }), 4000)
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
.form-wrapper {
  @apply h-full flex justify-center;
}
.form-container {
  @apply w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] fixed top-[20%];
}
:deep(.account-link) {
  @apply text-slate-400 text-[0.95rem] hover:underline hover:cursor-pointer w-fit;
}
</style>
