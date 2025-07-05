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
import { isRouteAvailable } from "@/router/helpers"
import { routes } from "@/router/index.js"
export default {
  name: "NavMenu",
  computed: {
    visibleLinks() {
      const visibleRoutes = []
      this.checkRoutesList(routes, visibleRoutes)
      return visibleRoutes
    },
  },
  methods: {
    checkRoutesList(routeItems, menuRoutes) {
      for (const routeItem of routeItems) {
        if (routeItem.children)
          this.checkRoutesList(routeItem.children, menuRoutes)
        else if (routeItem.meta?.useInMenu && isRouteAvailable(routeItem)) {
          menuRoutes.push(routeItem)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
