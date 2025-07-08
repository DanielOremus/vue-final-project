<template>
  <Panel class="user-card" toggleable>
    <template #header>
      <div class="my-2">
        <span class="text-lg font-medium">{{ user.username }}</span>
      </div>
    </template>
    <div class="role-selector__container">
      <FloatLabel variant="on">
        <single-select
          label-id="role_selector"
          :options="roles"
          :option-config="optionConfig"
          :placeholder="null"
          :disabled="!operationPerms.update"
          :loading="rolesLoading"
          v-model="selectedRole"
        />
        <label for="role_selector">Role</label>
      </FloatLabel>
    </div>
    <div class="mt-4 flex justify-between items-center">
      <span>Registered at: {{ registeredAt }}</span>
      <Button
        v-if="operationPerms.update"
        size="small"
        class="action-btn"
        severity="secondary"
        :loading="usersLoading"
        :label="$t('buttons.update')"
        :disabled="usersLoading"
        @click="onUpdate"
      />
    </div>
  </Panel>
</template>

<script>
import SingleSelect from "@/components/general/SingleSelect.vue"
import { optionConfig } from "./settings"
export default {
  name: "UserCard",
  components: {
    SingleSelect,
  },
  inject: ["rolesLoading", "usersLoading", "operationPerms", "roles"],

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedRole: null,
    }
  },
  computed: {
    registeredAt() {
      const date = this.user.registrationDate.slice(0, 10)

      return date.split("-").reverse().join(".")
    },
    optionConfig() {
      return optionConfig
    },
  },
  methods: {
    onUpdate() {
      if (this.rolesLoading || this.usersLoading) return

      this.$emit("user-role-update", {
        userId: this.user._id,
        roleId: this.selectedRole,
      })
    },
  },
  watch: {
    "user.role": {
      immediate: true,
      handler(newValue) {
        this.selectedRole = newValue._id
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/components/user/user_card.scss");
</style>
