export const getGeneralStoreObj = () => {
  const state = {
    loading: false,
    error: null,
  }
  const getters = {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  }
  const actions = {
    setLoading(status) {
      this.loading = status
    },
    setError(error) {
      this.error = error
    },
    startLoading() {
      this.loading = true
      this.error = false
    },
    async generalApiOperation({ operation, successCallback, errorCallback }) {
      this.startLoading()

      try {
        const response = await operation()
        if (successCallback) successCallback(response)
        return response
      } catch (error) {
        this.error = error
        if (errorCallback) errorCallback(error)
      } finally {
        this.setLoading(false)
      }
    },
  }

  return {
    state,
    getters,
    actions,
  }
}
