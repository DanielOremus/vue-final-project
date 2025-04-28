import { useAuthStore } from "@/stores/auth"

export const isRouteAvailable = (routeItem) => {
  const authStore = useAuthStore()

  return (
    !routeItem.meta?.requiresAuth ||
    (routeItem.meta?.hasAccess &&
      routeItem.meta?.hasAccess(authStore.userPermissions)) ||
    (authStore.isAuthenticated && !routeItem.meta?.hasAccess)
  )
}
