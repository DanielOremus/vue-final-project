import noImageAvailable from "@/assets/images/no-image.png"

export const deleteDialogSettings = {
  message: "Do you really want to delete this product?",
  header: "Are you sure?",
  rejectProps: {
    label: "No, I'm not sure",
    severity: "secondary",
    outlined: true,
  },
  acceptProps: {
    label: "Delete",
    severity: "danger",
  },
}

export const noImage = noImageAvailable
