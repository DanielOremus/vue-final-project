//!!DEPRECATED
// export const generalApiOperation = async function ({
//   operation,
//   successCallback,
//   errorCallback,
// }) {
//   console.log(this)

//   this.startLoading()

//   try {
//     const response = await operation()
//     if (successCallback) successCallback(response)
//     return response
//   } catch (error) {
//     this.setError(error)
//     if (errorCallback) errorCallback(error)
//   } finally {
//     this.setLoading(false)
//   }
// }
