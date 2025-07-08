<template>
  <nav autofocus>
    <ul class="menu">
      <li v-for="link in visibleLinks" :key="link" class="menu-item">
        <router-link
          :to="{ name: link.name }"
          active-class="active-header-link"
        >
          <span>
            {{ $t(`views.${link.name}.title.menu`) }}
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { Drawer } from "primevue"
import { checkRoutesList } from "@/router/helpers"
import { routes } from "@/router"
export default {
  name: "HeaderDrawer",
  components: {
    Drawer,
  },
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
