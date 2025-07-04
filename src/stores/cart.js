import { defineStore } from "pinia"
import { generalStoreObj } from "./helpers/generalStoreObj"
import api from "@/config/axios"
import apiEndpoints from "@/constants/apiEndpoints"
import { useAuthStore } from "./auth"
import { getMergedProdsAndQty, getProdIdQtyObj } from "./helpers/cart"

export const useCartStore = defineStore("cart", {
  state: () => ({
    ...generalStoreObj.state,
    productsList: [],
    populatedProductsList: [],
    isInitialized: false,
  }),
  getters: {
    ...generalStoreObj.getters,
    totalPrice: ({ populatedProductsList }) =>
      populatedProductsList.reduce(
        (acc, cartProd) => acc + cartProd.quantity * cartProd.product.price,
        0
      ),
    cartProductsNumber: ({ productsList }) => productsList.length,
  },
  actions: {
    ...generalStoreObj.actions,
    saveToLocalStorage() {
      localStorage.setItem("cart_products", JSON.stringify(this.productsList))
    },
    async initCart() {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) await this.fetchUserCartProducts()
      else this.getGuestCartProducts()
    },
    getGuestCartProducts() {
      const products = JSON.parse(localStorage.getItem("cart_products"))
      if (!Array.isArray(products)) this.productsList = []
      else this.productsList = products
      this.isInitialized = true
    },
    async fetchUserCartProducts() {
      this.startLoading()
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(api.get(apiEndpoints.cart.fetchProductsList()))
          }, 2000)
        })
        const { cart } = response.data.data
        this.populatedProductsList = cart.products
        this.productsList = cart.products.map(({ product, quantity }) => ({
          product: product._id,
          quantity,
        }))
        this.isInitialized = true
      } catch (error) {
        this.setError(error)
      } finally {
        this.setLoading(false)
      }
    },

    async addProduct(productId) {
      this.startLoading()
      const authStore = useAuthStore()
      try {
        if (authStore.isAuthenticated) {
          const response = await api.post(apiEndpoints.cart.addProduct(), {
            productId,
          })
          const { cart } = response.data.data
          this.productsList = cart.products
        } else {
          const prodIndex = this.productsList.findIndex(
            ({ product }) => product === productId
          )
          if (prodIndex < 0) {
            this.productsList.push({
              product: productId,
              quantity: 1,
            })
          } else {
            this.productsList[prodIndex].quantity++
          }
          this.saveToLocalStorage()
        }
      } catch (error) {
        this.setError(error)
      } finally {
        this.setLoading(false)
      }
    },
    async deleteProduct(productId) {
      this.startLoading()
      const authStore = useAuthStore()
      try {
        if (authStore.isAuthenticated) {
          const response = await api.delete(apiEndpoints.cart.deleteProduct(), {
            data: { productId },
          })
          const { cart } = response.data.data
          this.populatedProductsList = cart.products
          this.productsList = cart.products.map(({ product, quantity }) => ({
            product: product._id,
            quantity,
          }))
        } else {
          const prodInd = this.productsList.findIndex(
            ({ product }) => product === productId
          )
          if (prodInd > -1) {
            this.productsList.splice(prodInd, 1)
            this.populatedProductsList.splice(prodInd, 1)
          }
          // this.productsList = this.productsList.filter(
          //   ({ product }) => product !== productId
          // )
          this.saveToLocalStorage()
        }
      } catch (error) {
        this.setError(error)
      } finally {
        this.setLoading(false)
      }
    },
    async updateQuantity(productId, qty) {
      this.startLoading()

      const authStore = useAuthStore()
      try {
        if (authStore.isAuthenticated) {
          const response = await api.put(apiEndpoints.cart.updateQty(), {
            productId,
            quantity: qty,
          })

          const { cart } = response.data.data
          this.populatedProductsList = cart.products
          this.productsList = cart.products.map(({ product, quantity }) => ({
            product: product._id,
            quantity,
          }))
        } else {
          const targetProdInd = this.productsList.findIndex(
            ({ product }) => product === productId
          )
          if (targetProdInd > -1) {
            this.productsList[targetProdInd].quantity = qty
            if (this.populatedProductsList[targetProdInd])
              this.populatedProductsList[targetProdInd].quantity = qty
          } else this.productsList.push({ product: productId, quantity: qty })

          this.saveToLocalStorage()
        }
      } catch (error) {
        this.setError(error)
      } finally {
        this.setLoading(false)
      }
    },
    async mergeCarts() {
      this.startLoading()
      try {
        const response = await api.post(apiEndpoints.cart.merge(), {
          productsList: this.productsList,
        })
        const { cart } = response.data.data
        this.productsList = cart.products
        localStorage.removeItem("cart_products")
      } catch (error) {
        this.setError(error)
      } finally {
        this.setLoading(false)
      }
    },
    async populateProductsList() {
      this.startLoading()

      const prodIdQtyObj = getProdIdQtyObj(this.productsList)

      try {
        const response = await api.post(apiEndpoints.products.fetchByIds(), {
          idsList: Object.keys(prodIdQtyObj),
        })
        const { products } = response.data.data
        this.populatedProductsList = getMergedProdsAndQty(
          products,
          prodIdQtyObj
        )
      } catch (error) {
        this.setError(error)
      } finally {
        this.setLoading(false)
      }
    },
    clearPopulatedProducts() {
      this.populatedProductsList = []
    },
  },
})
