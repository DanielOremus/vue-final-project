import apiEndpoints from "@/constants/apiEndpoints"
import api from "@/config/axios"
import pluralize from "pluralize"
import { generalApiOperation } from "./generalApiOperation"

function getDataNames(storeName) {
  const pluralLower = storeName
  const pluralCapital = storeName[0].toUpperCase() + pluralLower.slice(1)
  const singularLower = pluralize.singular(storeName)
  const singularCapital =
    singularLower[0].toUpperCase() + singularLower.slice(1)

  return {
    namedState: {
      itemsList: `${pluralLower}List`,
      currentItem: `current${singularCapital}`,
    },
    namedActions: {
      fetchItems: `fetch${pluralCapital}`,
      fetchItemById: `fetch${singularCapital}ById`,
      createItem: `create${singularCapital}`,
      updateItem: `update${singularCapital}`,
      deleteItem: `delete${singularCapital}`,
    },
    nameVariations: {
      singularLower,
      singularCapital,
      pluralLower,
      pluralCapital,
    },
  }
}

export const getStoreTemplateObj = (storeName) => {
  const { namedState, namedActions, nameVariations } = getDataNames(storeName)

  return {
    state: {
      [namedState.itemsList]: [],
      [namedState.currentItem]: null,
    },

    actions: {
      async [namedActions.fetchItems]() {
        const response = await generalApiOperation.call(this, {
          operation: () => api.get(apiEndpoints[storeName].fetchList()),
        })

        const resData = response.data
        this[namedState.itemsList] = resData.data[storeName]
      },
      async [namedActions.fetchItemById](id) {
        const response = await generalApiOperation.call(this, {
          operation: () => api.get(apiEndpoints[storeName].fetchById(id)),
        })

        const resData = response.data
        this[namedState.currentItem] =
          resData.data[nameVariations.singularLower]
      },
      async [namedActions.createItem](itemData) {
        const response = await generalApiOperation.call(this, {
          operation: () => api.post(apiEndpoints[storeName].create(), itemData),
        })

        const resData = response.data
        this[namedState.itemsList].push(
          resData.data[nameVariations.singularLower]
        )
      },
      async [namedActions.updateItem](itemData) {
        const response = await generalApiOperation.call(this, {
          operation: () =>
            api.put(apiEndpoints[storeName].updateItem(itemData._id), itemData),
        })

        const resData = response.data
        const updatedItem = resData.data[nameVariations.singularLower]

        const itemInd = this[namedState.itemsList].findIndex(
          (item) => item._id === itemData._id
        )
        if (itemInd > -1) {
          this[namedState.itemsList][itemInd] = { ...updatedItem }
        }
      },
      async [namedActions.deleteItem](id) {
        await generalApiOperation.call(this, {
          operation: () =>
            api.delete(apiEndpoints[storeName].delete(), { data: { id } }),
        })

        this[namedState.itemsList] = this[namedState.itemsList].filter(
          (item) => item._id !== id
        )
      },
    },
  }
}
