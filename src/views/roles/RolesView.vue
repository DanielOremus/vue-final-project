<template>
  <main-layout>
    <div class="page-content">
      <roles-manager />
    </div>
  </main-layout>
</template>

<script>
import RolesManager from "@/components/roles/RolesManager.vue"
import { mapStores } from "pinia"
import { useRolesStore } from "@/stores/roles"
export default {
  name: "RolesView",
  components: {
    RolesManager,
  },
  computed: {
    ...mapStores(useRolesStore),
  },

  beforeRouteLeave() {
    this.rolesStore.$reset()
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/views/roles_view.scss");
</style>
