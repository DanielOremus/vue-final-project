<template>
  <Dialog modal :draggable="false" v-model:visible="isVisible">
    <div class="role-creation-card__container">
      <role-card
        :incoming-errors="errors"
        @role-create="$emit('role-create', $event)"
      />
    </div>
  </Dialog>
</template>

<script>
import RoleCard from "./RolesList/RoleCard/index.vue"
export default {
  name: "RoleCreationDialog",
  emits: ["update:modelValue", "role-create"],
  components: {
    RoleCard,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    isVisible: {
      get() {
        return this.modelValue
      },
      set(v) {
        this.$emit("update:modelValue", v)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/components/role/role_creation_dialog.scss");
</style>
