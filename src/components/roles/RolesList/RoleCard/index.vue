<template>
  <Panel class="role-card" toggleable>
    <template #header>
      <div class="my-2">
        <FloatLabel v-if="operationPerms.update" variant="on">
          <InputText :id="`role-${role.name}`" v-model="roleName" />
          <label :for="`role-${role.name}`">Name</label>
        </FloatLabel>
        <span v-else class="text-lg font-medium">{{ roleName }}</span>
      </div>
    </template>
    <div class="pages">
      <Fieldset
        v-for="page in Object.keys(role.permissions)"
        class="page"
        :legend="page"
      >
        <div class="flex justify-evenly">
          <div
            class="flex gap-2 flex-wrap items-center"
            v-for="perm in Object.keys(role.permissions[page])"
          >
            <label :for="`${role.name}-${page}-${perm}`"> {{ perm }}: </label>
            <Checkbox
              :input-id="`${role.name}-${page}-${perm}`"
              v-model="rolePermissions[page][perm]"
              binary
              :disabled="!operationPerms.update"
            />
          </div>
        </div>
      </Fieldset>
    </div>
    <div class="actions">
      <Button
        v-if="operationPerms.update"
        size="small"
        class="action-btn"
        severity="secondary"
        :loading="isLoading"
        :label="$t('buttons.update')"
        @click="onDelete"
      />
      <Button
        v-if="operationPerms.delete"
        size="small"
        class="action-btn"
        severity="danger"
        :loading="isLoading"
        :label="$t('buttons.delete')"
        @click="onUpdate"
      />
    </div>
  </Panel>
</template>

<script>
export default {
  name: "RoleCard",
  data() {
    return {
      roleName: null,
      rolePermissions: {},
    }
  },
  props: {
    role: {
      type: Object,
      required: true,
    },
    operationPerms: {
      type: Object,
      default: () => ({}),
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    permsConfig: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getDefaultPermissions() {
      const res = {}
      for (const page in this.permsConfig) {
        res[page] = {}
        for (const perm of this.permsConfig[page]) {
          res[page][perm] = false
        }
      }
      return res
    },
    onDelete() {
      if (this.isLoading) return
      this.$emit("role-delete", this.role._id)
    },
    onUpdate() {
      if (!this.isLoading) return
      //TODO: add validation
      this.$emit("role-edit", {
        name: this.roleName,
        permissions: this.rolePermissions,
        _id: this.role._id,
      })
    },
  },

  created() {
    this.roleName = this.role.name
    this.rolePermissions = this.role.permissions
  },
}
</script>

<style lang="scss" scoped>
.role-card {
  @apply w-full;
  font-family: "Outfit", "Montserrat", sans-serif;
}
.action-btn {
  @apply px-4 text-[0.95rem] font-medium;
}
.actions {
  @apply mt-4 flex justify-end gap-2;
}
</style>
