<template>
  <main-layout>
    <div class="page-content">
      <users-manager />
    </div>
  </main-layout>
</template>

<script>
import UsersManager from "@/components/users/UsersManager.vue"
import { mapStores } from "pinia"
import { useUsersStore } from "@/stores/users"
export default {
  name: "Users",
  components: {
    UsersManager,
  },
  computed: {
    ...mapStores(useUsersStore),
  },

  beforeRouteLeave() {
    this.usersStore.$reset()
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/views/users_view.scss");
</style>
