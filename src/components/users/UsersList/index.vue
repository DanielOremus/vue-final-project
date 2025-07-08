<template>
  <div class="users-list__container">
    <div class="users-list">
      <div v-for="user in users" :key="user._id">
        <user-card
          :user="user"
          :roles="roles"
          @user-role-update="$emit('user-role-update', $event)"
        />
      </div>
    </div>
    <div
      v-show="usersLoading && !users.length"
      class="self-center justify-self-center"
    >
      <loading-spinner class="border-2 border-surface-400 w-8" />
    </div>
  </div>
</template>

<script>
import UserCard from "./UserCard/index.vue"
export default {
  name: "UsersList",
  inject: ["usersLoading", "rolesLoading", "roles", "users"],
  components: {
    UserCard,
  },
}
</script>

<style lang="scss" scoped>
@import url("@/assets/style/components/user/users_list.scss");
</style>
