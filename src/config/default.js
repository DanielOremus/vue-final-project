export default Object.freeze({
  apiBase: `${import.meta.env.VITE_APP_API_BASE}`,
  apiUrl: `${import.meta.env.VITE_APP_API_BASE}/${
    import.meta.env.VITE_APP_API_VERSION
  }`,
})
