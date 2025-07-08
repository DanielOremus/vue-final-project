export const generalStoreObj = {
  state: {
    loading: false,
    error: null,
  },
  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },
  actions: {
    setLoading(status) {
      this.loading = status
    },
    setError(error) {
      this.error = error
    },
    startLoading() {
      this.loading = true
      this.error = null
    },
    async generalApiOperation({ operation, successCallback, errorCallback }) {
      this.startLoading()
      try {
        const response = await operation()
        if (successCallback) successCallback(response)
        return response
      } catch (error) {
        this.setError(error)
        if (errorCallback) errorCallback(error)
      } finally {
        this.setLoading(false)
      }
    },
  },
}
