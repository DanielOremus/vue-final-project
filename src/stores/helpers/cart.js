export const getMergedProdsAndQty = (populatedProdsList, prodIdQtyObj) => {
  const resArr = []
  populatedProdsList.forEach((prod) => {
    resArr.push({ product: prod, quantity: prodIdQtyObj[prod._id] })
  })
  return resArr
}
export const getProdIdQtyObj = (cartProds) => {
  return cartProds.reduce((acc, el) => {
    acc[el.product] = el.quantity
    return acc
  }, {})
}
