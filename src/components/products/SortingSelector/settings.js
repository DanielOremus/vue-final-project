export const optionConfig = {
  label: "title",
  value: "value",
}
export const selectDt = {
  root: {
    background: "{surface.0}",
    color: "{surface.900}",
    borderRadius: "0px",
    borderColor: "{surface.900}",
    focusBorderColor: "{select.border.color}",
    focusRingShadow: "0 0 9px 0 rgba(0,0,0,0.15)",
    focusBorderColor: "transparent",
  },
  option: {
    color: "{surface.900}",
    focusBackground: "{zinc.100}",
    focusColor: "{select.color}",
    selectedBackground: "{zinc.200}",
    selectedColor: "{select.color}",
    selectedFocusBackground: "{select.option.selected.background}",
    selectedFocusColor: "{select.option.focus.color}",
  },
  overlay: {
    background: "{select.background}",
    borderRadius: "0px",
  },
}

export const selectPt = {
  root: "border-1",
}
