<template>
  <div class="users-manager">
    <div class="users-list__wrapper">
      <users-list @user-role-update="onUserRoleUpdate" />
    </div>
    <div class="roles-paginator__wrapper">
      <general-paginator
        :items-per-page="usersStore.perPage"
        :total-items-number="usersStore.total"
        v-model="currentPage"
      />
    </div>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users"
import { useRolesStore } from "@/stores/roles"
import { mapStores } from "pinia"
import UsersList from "./UsersList/index.vue"
import GeneralPaginator from "@/components/general/GeneralPaginator/index.vue"
import { useAuthStore } from "@/stores/auth"
import { computed, toRef } from "vue"
import ToastHelper from "@/primeVueServiceHelpers/ToastHelper"

export default {
  name: "UsersManager",
  components: {
    UsersList,
    GeneralPaginator,
  },
  provide() {
    return {
      operationPerms: computed(
        () => this.authStore.userPermissions?.users || {}
      ),
      usersLoading: toRef(this.usersStore, "isLoading"),
      rolesLoading: toRef(this.rolesStore, "isLoading"),
      users: computed(() => this.usersStore.usersList),
      roles: computed(() => this.rolesStore.rolesList),
    }
  },

  computed: {
    ...mapStores(useUsersStore, useRolesStore, useAuthStore),
    currentPage: {
      get() {
        return this.usersStore.currentPage
      },
      set(v) {
        if (!this.usersStore.isLoading) {
          window.scrollTo(0, 0)
          this.usersStore.fetchUsers({
            page: v,
          })
        }
      },
    },
  },
  methods: {
    async onUserRoleUpdate({ roleId, userId }) {
      await this.usersStore.updateUser({ _id: userId, role: roleId })
      if (this.usersStore.hasError) {
        ToastHelper.showAlert("error")
      } else {
        ToastHelper.showAlert("success", {
          detail: this.$t("views.users.messages.success.update"),
        })
      }
    },
  },
  mounted() {
    this.usersStore.fetchUsers()
    this.rolesStore.fetchAllRoles()
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/components/user/users_manager.scss");
</style>
