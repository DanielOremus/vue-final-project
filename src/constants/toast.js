const DEFAULT_LIFE = 4000

const successSettings = {
  life: DEFAULT_LIFE,
  severity: "success",
  summary: "Success",
  detail: "Operation finished successfully!",
}

const errorSettings = {
  life: DEFAULT_LIFE,
  severity: "error",
  summary: "Oops",
  detail: "Something went wrong, please try again later!",
}

const defaultSettings = {
  life: DEFAULT_LIFE,
  severity: "secondary",
  summary: "Message",
  detail: "Default message",
}

export const toastTypes = {
  success: successSettings,
  error: errorSettings,
  default: defaultSettings,
}
