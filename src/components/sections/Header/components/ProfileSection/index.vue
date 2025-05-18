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
import { logoutDialogSettings } from "./settings"
export default {
  name: "ProfileSection",
  computed: {
    ...mapState(useAuthStore, ["isAuthenticated", "user"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    onLogout() {
      this.$confirm.require({
        ...logoutDialogSettings,
        accept: () => {
          this.logout()
          this.$router.push({ name: "home" })
        },
      })
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
