import MyPreset from "./main"
export default {
  theme: {
    preset: MyPreset,
    options: {
      cssLayer: {
        name: "primevue",
        order: "tailwind-base, primevue, tailwind-utilities",
      },
      darkModeSelector: ".dark",
    },
  },
  pt: {
    inputText: {
      root: "border-2",
    },
    textArea: {
      root: "border-2",
    },
    select: {
      root: "border-2",
    },
  },
}
