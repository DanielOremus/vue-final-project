import apiEndpoints from "@/constants/apiEndpoints"
import api from "@/config/axios"

export const getStoreTemplateObj = (storeName, generalApiOperation) => {
  let itemsList = []
  let currentItem = null

  async function fetchItems() {
    const response = await generalApiOperation({
      operation: () => api(apiEndpoints[storeName].fetchList),
    })
    const resData = response.data
    itemsList = resData.data[storeName]
  }

  return {
    state: {
      [`${storeName}List`]: itemsList,
      [`current${storeName.substr(0, storeName.length - 1)}`]: currentItem,
    },
    actions: {
      [`fetch${storeName[0].toUpperCase() + storeName.slice(1)}`]: fetchItems,
    },
  }
}
