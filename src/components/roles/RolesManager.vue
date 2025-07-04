<template>
  <div class="roles-manager">
    <div class="flex justify-end">
      <Button
        severity="success"
        :label="$t('views.roles.buttons.roleCreation')"
        @click="toggleCreationDialog(true)"
      />
    </div>
    <div class="roles-list__wrapper">
      <roles-list
        :roles="rolesStore.rolesList"
        :errors="errors"
        @role-edit="onRoleSave"
        @role-delete="onRoleDelete"
      />
    </div>
    <div class="roles-paginator__wrapper">
      <general-paginator
        :items-per-page="rolesStore.perPage"
        :total-items-number="rolesStore.total"
        v-model="currentPage"
      />
    </div>
    <role-creation-dialog
      :errors="errors.new"
      v-model="isDialogShown"
      @role-create="onRoleSave"
    />
  </div>
</template>

<script>
import { getDeletionDialogSettings } from "./settings"
import { useAuthStore } from "@/stores/auth"
import { useRolesStore } from "@/stores/roles"
import { useUsersStore } from "@/stores/users"
import { mapState, mapStores } from "pinia"
import { config } from "peaker-perm-config"
import { computed, toRef } from "vue"
import RolesList from "./RolesList/index.vue"
import RoleCreationDialog from "./RoleCreationDialog.vue"
import GeneralPaginator from "../general/GeneralPaginator/index.vue"
import ToastHelper from "@/primeVueServiceHelpers/ToastHelper"
export default {
  name: "RolesManager",
  components: {
    RolesList,
    GeneralPaginator,
    RoleCreationDialog,
  },

  provide() {
    return {
      operationPerms: computed(
        () => this.authStore.userPermissions?.roles ?? {}
      ),
      permsConfig: config,
      isLoading: toRef(this.rolesStore, "isLoading"),
    }
  },
  data() {
    return {
      errors: {},
      isDialogShown: false,
    }
  },
  computed: {
    ...mapStores(useRolesStore, useAuthStore, useUsersStore),
    ...mapState(useRolesStore, ["hasError"]),
    currentPage: {
      get() {
        return this.rolesStore.currentPage
      },
      set(v) {
        if (!this.rolesStore.isLoading) {
          window.scrollTo(0, 0)
          this.rolesStore.fetchRoles({
            page: v,
          })
        }
      },
    },
  },
  methods: {
    async onRoleSave(roleObj) {
      const roleKey = roleObj._id ?? "new"
      this.errors[roleKey] = {}
      if (roleObj._id) {
        await this.rolesStore.updateRole(roleObj)
      } else {
        await this.rolesStore.createRole(roleObj)
      }
      if (this.hasError) {
        this.errors[roleKey] = this.getRoleErrorObj(
          this.hasError.response?.data
        )
        if (this.hasError.status !== 400) {
          ToastHelper.showAlert("error")
        }
      } else {
        this.toggleCreationDialog(false)
        ToastHelper.showAlert("success", {
          detail: this.$t(
            roleObj._id
              ? "views.roles.messages.success.update"
              : "views.roles.messages.success.create"
          ),
        })
      }
    },
    async onRoleDelete(roleId) {
      const resData = await this.usersStore.fetchUsersWithRole(roleId)
      const usersNumber = resData?.count
      if (this.usersStore.hasError) {
        ToastHelper.showAlert("error")
        return
      }
      const dialogSettings = getDeletionDialogSettings(usersNumber)
      this.$confirm.require({
        ...dialogSettings,
        accept: () => this.rolesStore.deleteRole(roleId),
      })
    },
    getRoleErrorObj(errorData) {
      if (Array.isArray(errorData?.msg)) {
        return errorData.msg.reduce((acc, obj) => {
          const msg = obj.msg.type
            ? this.$t(`validation.${obj.msg.type}`, {
                value: this.$t(
                  `views.roles.fields.${obj.path}`
                ).toLocaleLowerCase(),
              })
            : obj.msg

          acc[obj.path] = msg
          return acc
        }, {})
      }
      return {}
    },
    toggleCreationDialog(v) {
      this.isDialogShown = v
      this.rolesStore.clearCurrentRole()
    },
  },
  mounted() {
    this.rolesStore.fetchRoles()
  },
}
</script>

<style lang="scss" scoped>
.roles-manager {
  @apply h-full grid grid-rows-[auto,1fr,auto] w-full grid-cols-[auto] gap-y-4 max-w-[800px] lg:max-w-[1200px];
}
</style>
