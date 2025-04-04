export default Object.freeze({
  products: {
    fetchList: () => "/products",
    fetchById: (id) => `/products/${id}`,
    create: () => "/products",
    update: (id) => `/products/${id}`,
    delete: (id) => `/products/${id}`,
  },
})
