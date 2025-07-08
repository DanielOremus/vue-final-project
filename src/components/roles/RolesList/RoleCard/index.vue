<template>
  <Panel class="role-card" :toggleable="toggleable">
    <template #header>
      <div class="my-2">
        <template v-if="operationPerms.update">
          <FloatLabel variant="on">
            <InputText
              :id="`role-${currentRole?.name ?? 'new'}`"
              v-model="roleData.name"
            />

            <label :for="`role-${currentRole?.name ?? 'new'}`">{{
              $t("views.roles.fields.name")
            }}</label>
          </FloatLabel>
          <Message
            v-if="this.errors.name"
            class="mt-1"
            severity="error"
            size="small"
            variant="simple"
            >{{ this.errors.name }}</Message
          >
        </template>
        <span v-else class="text-lg font-medium">{{ currentRole?.name }}</span>
      </div>
    </template>
    <div class="pages">
      <Fieldset
        v-for="page in Object.keys(permsConfig)"
        class="page"
        :legend="page"
      >
        <div class="flex justify-evenly">
          <div
            class="flex gap-2 flex-wrap items-center selection:bg-transparent"
            v-for="perm in permsConfig[page]"
          >
            <label
              :for="`${currentRole?.name ?? 'new'}-${page}-${perm}`"
              class="cursor-pointer"
            >
              {{ perm }}:
            </label>
            <Checkbox
              :input-id="`${currentRole?.name ?? 'new'}-${page}-${perm}`"
              v-model="roleData.permissions[page][perm]"
              binary
              :disabled="!operationPerms.update"
            />
          </div>
        </div>
      </Fieldset>
    </div>
    <div class="actions">
      <Button
        v-if="operationPerms.update || operationPerms.create"
        size="small"
        class="action-btn"
        severity="secondary"
        :loading="isLoading"
        :label="saveBtnLabel"
        :disabled="!isRoleDataValid || isLoading"
        @click="onSave"
      />
      <Button
        v-if="operationPerms.delete && currentRole?._id"
        size="small"
        class="action-btn"
        severity="danger"
        :loading="isLoading"
        :disabled="isLoading"
        :label="$t('buttons.delete')"
        @click="onDelete"
      />
    </div>
  </Panel>
</template>

<script>
import RoleValidator from "@/validators/RoleValidator"
import { roleTemplate } from "./settings"
export default {
  name: "RoleCard",
  inject: ["isLoading", "operationPerms", "permsConfig"],
  emits: ["role-edit", "role-create", "role-delete"],
  data() {
    return {
      roleData: null,
      errors: {},
    }
  },
  props: {
    incomingErrors: {
      type: Object,
      default: () => ({}),
    },
    currentRole: {
      type: Object,
      default: null,
    },
    toggleable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isRoleDataValid() {
      return !Object.values(this.errors).some((v) => v)
    },
    saveBtnLabel() {
      return this.currentRole?._id
        ? this.$t("buttons.update")
        : this.$t("buttons.create")
    },
  },
  methods: {
    onDelete() {
      if (this.isLoading) return
      this.$emit("role-delete", this.currentRole?._id)
    },
    onSave() {
      if (this.isLoading) return
      this.validateData()
      if (!this.isRoleDataValid) return
      if (this.currentRole?._id) {
        this.$emit("role-edit", this.roleData)
      } else {
        this.$emit("role-create", this.roleData)
      }
    },
    validateData() {
      try {
        RoleValidator.defaultSchema.validateSync({
          name: this.roleData.name,
        })
      } catch (error) {
        const { path, message } = error
        this.errors[path] = message
      }
    },
  },
  watch: {
    "roleData.name"() {
      this.errors.name = null
    },
    incomingErrors: {
      handler(v) {
        this.errors = { ...this.errors, ...v }
      },
      deep: true,
    },
    currentRole: {
      immediate: true,
      handler(v) {
        this.roleData = v
          ? JSON.parse(JSON.stringify(v))
          : JSON.parse(JSON.stringify(roleTemplate))
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/components/role/role_card.scss");
</style>
