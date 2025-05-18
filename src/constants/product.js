export const fieldsConfig = [
  {
    type: "range",
    fieldName: "price",
    queryName: "price",
  },
  {
    type: "search",
    fieldName: "name",
    queryName: "name",
  },
  {
    type: "list",
    fieldName: "category",
    queryName: "category",
  },
]

export const sortingOptions = [
  {
    title: "Name: A-Z",
    value: {
      field: "name",
      order: 1,
    },
  },
  {
    title: "Name: Z-A",
    value: {
      field: "name",
      order: -1,
    },
  },
  {
    title: "Price: Low-High",
    value: {
      field: "price",
      order: 1,
    },
  },
  {
    title: "Price: High-Low",
    value: {
      field: "price",
      order: -1,
    },
  },
]
