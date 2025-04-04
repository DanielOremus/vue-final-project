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
}
