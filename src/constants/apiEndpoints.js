export default Object.freeze({
  products: {
    fetchList: () => "/products",
    fetchById: (id) => `/products/${id}`,
    fetchFilters: () => "/products/filters",
    create: () => "/products",
    update: (id) => `/products/${id}`,
    delete: () => `/products`,
  },
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    fetchProfile: "/auth/profile",
  },
})
