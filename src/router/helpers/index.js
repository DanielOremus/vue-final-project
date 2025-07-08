import { useAuthStore } from "@/stores/auth"

function isRouteAvailable(routeItem) {
  const authStore = useAuthStore()

  return (
    !routeItem.meta?.requiresAuth ||
    (routeItem.meta?.hasAccess &&
      routeItem.meta?.hasAccess(authStore.userPermissions)) ||
    (authStore.isAuthenticated && !routeItem.meta?.hasAccess)
  )
}

function checkRoutesList(routeItems, menuRoutes) {
  for (const routeItem of routeItems) {
    if (routeItem.children) checkRoutesList(routeItem.children, menuRoutes)
    else if (routeItem.meta?.useInMenu && isRouteAvailable(routeItem)) {
      menuRoutes.push(routeItem)
    }
  }
}

export { isRouteAvailable, checkRoutesList }
