<template>
  <div class="roles-manager">
    <div class="roles-list__wrapper">
      <roles-list
        :roles="rolesStore.rolesList"
        :operationPerms="authStore.userPermissions?.roles"
      />
    </div>
    <div class="roles-paginator__wrapper">
      <general-paginator
        :items-per-page="rolesStore.perPage"
        :total-items-number="rolesStore.total"
        v-model="currentPage"
      />
    </div>
  </div>
</template>

<script>
//TODO: finish (cr)u/d for roles, warning when deleting role
import { useAuthStore } from "@/stores/auth"
import { useRolesStore } from "@/stores/roles"
import { mapStores } from "pinia"
import RolesList from "./RolesList/index.vue"
import GeneralPaginator from "../general/GeneralPaginator/index.vue"
export default {
  name: "RolesManager",
  components: {
    RolesList,
    GeneralPaginator,
  },
  computed: {
    ...mapStores(useRolesStore, useAuthStore),
    currentPage: {
      get() {
        return this.rolesStore.currentPage
      },
      async set(v) {
        if (!this.rolesStore.isLoading) {
          await this.fetchRoles({
            page: v,
          })
          window.scrollTo(0, 0)
        }
      },
    },
  },
  mounted() {
    this.rolesStore.fetchRoles()
  },
}
</script>

<style lang="scss" scoped>
.roles-manager {
  @apply h-full grid grid-rows-[1fr,auto] w-full grid-cols-[auto] max-w-[800px] lg:max-w-[1200px];
}

.roles-paginator__wrapper {
  @apply mt-4;
}
</style>
