import he from "he"

export const packInFormData = (data) => {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
  return formData
}

export const decodeHTML = (html, options = {}) => {
  return html ? he.decode(html, options) : html
}
