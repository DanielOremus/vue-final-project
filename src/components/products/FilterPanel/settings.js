export const accordionDt = {
  header: {
    color: "{slate.500}",
    hoverColor: "{slate.800}",
    activeColor: "{accordion.header.hover.color}",
    background: "{surface.0}",
    activeBackground: "{accordion.header.background}",
    hoverBackground: "{accordion.header.background}",
    activeHoverBackground: "{accordion.header.background}",
    padding: "0.5rem",
    toggle: {
      icon: {
        hoverColor: "{accordion.header.hover.color}",
        activeColor: "{accordion.header.active.color}",
        activeHoverColor: "{accordion.header.toggle.icon.hover.color}",
      },
    },
  },
  panel: {
    borderColor: "{surface.300}",
  },
  content: {
    background: "{surface.0}",
    color: "{surface.900}",
    padding: "0.5rem 0.5rem 1.5rem",
  },
}
export const searchbarDt = {
  color: "{surface.900}",
  background: "{surface.50}",
  borderColor: "{surface.400}",
  focusBorderColor: "{surface.800}",
}
export const priceInputDt = {
  ...searchbarDt,
  background: "{surface.0}",
}
export const categoryCheckboxDt = {
  background: "{surface.0}",
}
