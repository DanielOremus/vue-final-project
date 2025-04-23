export const showConfirmation = ($confirm, settings) => {
  $confirm.require(settings)
}
export const closeConfirmation = ($confirm) => {
  $confirm.close()
}
