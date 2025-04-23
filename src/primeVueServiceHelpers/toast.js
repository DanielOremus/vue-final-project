export const showToast = ($toast, settings) => {
  $toast.add({ life: 4000, ...settings })
}
export const closeToast = ($toast) => {
  $toast.remove()
}
