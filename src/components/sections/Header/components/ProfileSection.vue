<template>
  <div class="profile-section">
    <div v-if="!isAuthenticated" class="user-icon__wrapper">
      <i class="bi bi-person-circle user-icon" @click="onSign" />
    </div>

    <div v-else class="logout-icon__wrapper">
      <i class="bi bi-box-arrow-right logout-icon" @click="onLogout" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia"
import { useAuthStore } from "@/stores/auth"
import { showConfirmation } from "@/primeVueServiceHelpers/confirmationDialog"
export default {
  name: "ProfileSection",
  computed: {
    ...mapState(useAuthStore, ["isAuthenticated", "user"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    onLogout() {
      const dialogSettings = {
        message: "Do you really want to log out?",
        header: "Are you sure?",
        rejectProps: {
          label: "Cancel",
          severity: "secondary",
          outlined: true,
        },
        acceptProps: {
          label: "Log out",
          severity: "danger",
        },
        accept: () => {
          this.logout()
          this.$router.push({ name: "home" })
        },
      }
      showConfirmation(this.$confirm, dialogSettings)
    },
    onSign() {
      this.$router.push({ name: "login" })
    },
  },
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/header.scss);
</style>
