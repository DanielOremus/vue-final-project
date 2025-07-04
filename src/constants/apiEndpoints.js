export default Object.freeze({
  products: {
    fetchList: () => "/products",
    fetchById: (id) => `/products/${id}`,
    fetchFilters: () => "/products/filters",
    create: () => "/products",
    update: (id) => `/products/${id}`,
    delete: () => `/products`,
    fetchByIds: () => "/products/by-ids",
  },
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    fetchProfile: "/auth/profile",
  },
  roles: {
    fetchList: () => "/roles",
    fetchByName: (name) => `/roles/name/${name}`,
    update: (id) => `/roles/${id}`,
    create: () => `/roles`,
    delete: () => "/roles",
  },
  users: {
    fetchList: () => "/users",
    delete: () => "/users",
  },
  cart: {
    fetchProductsList: () => "/cart",
    addProduct: () => "/cart",
    updateQty: () => "/cart/quantity",
    deleteProduct: () => "/cart",
    merge: () => "/cart/merge",
  },
})
