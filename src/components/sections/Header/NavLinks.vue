<template>
  <ul class="menu w-full h-full flex items-center justify-between">
    <li v-for="link in visibleLinks" :key="link" class="menu-item">
      <router-link :to="{ name: link.name }" active-class="active-header-link">
        <span>
          {{ link.title ?? link.name }}
        </span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { routes } from "@/router/index.js"
export default {
  name: "NavLinks",
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
        else if (routeItem.meta?.useInMenu) {
          menuRoutes.push(routeItem)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import url(@/assets/style/components/header.scss);
</style>
