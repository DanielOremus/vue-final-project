<template>
  <div class="roles-list">
    <div v-for="role in roles" :key="role._id">
      <role-card
        :role="role"
        :perms-config="permsConfig"
        :operationPerms="operationPerms"
      />
    </div>
  </div>
</template>

<script>
import { config } from "peaker-perm-config"
import RoleCard from "./RoleCard/index.vue"
export default {
  name: "RolesList",
  components: {
    RoleCard,
  },
  props: {
    roles: {
      type: Array,
      default: () => [],
    },

    operationPerms: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    permsConfig() {
      return config
    },
  },
}
</script>

<style lang="scss" scoped>
.roles-list {
  @apply grid grid-cols-1 gap-4 lg:grid-cols-2;
}
</style>
