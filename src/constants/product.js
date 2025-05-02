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

export const sortOptions = [
  {
    field: "name",
    order: 1,
  },
  {
    field: "name",
    order: -1,
  },
  {
    field: "price",
    order: 1,
  },
  {
    field: "price",
    order: -1,
  },
]
