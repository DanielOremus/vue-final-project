<template>
  <ul class="menu">
    <li v-for="link in visibleLinks" :key="link" class="menu-item">
      <router-link :to="{ name: link.name }" active-class="active-header-link">
        <span>
          {{ $t(`views.${link.name}.title.menu`) }}
        </span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { routes } from "@/router/index.js"
import { checkRoutesList } from "@/router/helpers"
export default {
  name: "NavMenu",
  computed: {
    visibleLinks() {
      const visibleRoutes = []
      checkRoutesList(routes, visibleRoutes)
      return visibleRoutes
    },
  },
}
</script>

<style lang="scss" scoped></style>
