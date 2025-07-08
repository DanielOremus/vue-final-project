<template>
  <div class="roles-list__container">
    <div class="roles-list">
      <div v-for="role in roles" :key="role._id">
        <role-card
          :current-role="role"
          toggleable
          :incoming-errors="errors[role._id]"
          @role-edit="$emit('role-edit', $event)"
          @role-delete="$emit('role-delete', $event)"
        />
      </div>
    </div>
    <div
      v-show="isLoading && !roles.length"
      class="self-center justify-self-center"
    >
      <loading-spinner class="border-2 border-surface-400 w-8" />
    </div>
  </div>
</template>

<script>
import RoleCard from "./RoleCard/index.vue"
import LoadingSpinner from "@/components/general/LoadingSpinner.vue"
export default {
  name: "RolesList",
  components: {
    RoleCard,
    LoadingSpinner,
  },
  inject: ["isLoading"],
  props: {
    roles: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/components/role/roles_list.scss");
</style>
