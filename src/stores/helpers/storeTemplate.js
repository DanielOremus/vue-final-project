import apiEndpoints from "@/constants/apiEndpoints"
import api from "@/config/axios"
import pluralize from "pluralize"
import { packInFormData } from "./index"

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
      clearCurrentItem: `clearCurrent${singularCapital}`,
    },
    nameVariations: {
      singularLower,
      singularCapital,
      pluralLower,
      pluralCapital,
    },
  }
}

export function getStoreTemplateObj(storeName, generalApiOperation) {
  const { namedState, namedActions, nameVariations } = getDataNames(storeName)

  return {
    state: {
      [namedState.itemsList]: [],
      [namedState.currentItem]: null,
      currentPage: 0,
      perPage: 8,
      total: 0,
    },

    actions: {
      async [namedActions.fetchItems](query = {}) {
        const response = await generalApiOperation.call(this, {
          operation: () =>
            api.get(apiEndpoints[storeName].fetchList(), {
              params: {
                perPage: this.perPage,
                page: this.currentPage,
                ...query,
              },
            }),

          successCallback: (response) => {
            const resData = response.data
            this[namedState.itemsList] = resData.data[storeName]
            this.currentPage = resData.data.page
            this.perPage = resData.data.perPage
            this.total = resData.data.count
          },
        })
      },
      async [namedActions.fetchItemById](id, query = {}) {
        const response = await generalApiOperation.call(this, {
          operation: () =>
            api.get(apiEndpoints[storeName].fetchById(id), { params: query }),
          successCallback: (response) => {
            const resData = response.data
            this[namedState.currentItem] =
              resData.data[nameVariations.singularLower]
          },
        })
      },
      async [namedActions.createItem](itemData, headers = {}) {
        if (headers["Content-Type"] === "multipart/form-data") {
          itemData = packInFormData(itemData)
        }

        const response = await generalApiOperation.call(this, {
          operation: () =>
            api.post(apiEndpoints[storeName].create(), itemData, {
              headers,
            }),
          // successCallback: (response) => {
          //   const resData = response.data
          //   this[namedState.itemsList].push(
          //     resData.data[nameVariations.singularLower]
          //   )
          // },
        })
      },
      async [namedActions.updateItem](itemData, headers = {}) {
        const { _id } = itemData
        if (headers["Content-Type"] === "multipart/form-data") {
          itemData = packInFormData(itemData)
        }
        const response = await generalApiOperation.call(this, {
          operation: () =>
            api.put(apiEndpoints[storeName].update(_id), itemData, {
              headers,
            }),
          successCallback: (response) => {
            const resData = response.data
            const updatedItem = resData.data[nameVariations.singularLower]

            const itemInd = this[namedState.itemsList].findIndex(
              (item) => item._id === itemData._id
            )
            if (itemInd > -1) {
              this[namedState.itemsList][itemInd] = { ...updatedItem }
            }
          },
        })
      },
      async [namedActions.deleteItem](id) {
        await generalApiOperation.call(this, {
          operation: () =>
            api.delete(apiEndpoints[storeName].delete(), { data: { id } }),
          successCallback: (response) => {
            this[namedState.itemsList] = this[namedState.itemsList].filter(
              (item) => item._id !== id
            )
          },
        })
      },
      setListPage(pageNumber) {
        this.currentPage = pageNumber
      },
      [namedActions.clearCurrentItem]() {
        this[namedState.currentItem] = null
        this.setError(null)
      },
    },
  }
}
