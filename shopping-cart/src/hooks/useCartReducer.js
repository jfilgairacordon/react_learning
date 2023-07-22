import { useReducer } from 'react'
import { CART_ACTION_TYPES, CART_INITAL_STATE, cartReducer } from '../reducers/cartReducer'

export function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, CART_INITAL_STATE)
  const addToCart = (product) => {
    dispatch({ type: CART_ACTION_TYPES.ADD_TO_CART, payload: product })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTION_TYPES.CLEAR_CART })
  }

  const removeCartProduct = (product) => {
    dispatch({ type: CART_ACTION_TYPES.REMOVE_CART_PRODUCT, payload: product })
  }

  return {
    state,
    addToCart,
    clearCart,
    removeCartProduct
  }
}
