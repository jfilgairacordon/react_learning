export const CART_INITAL_STATE = JSON.parse(window.localStorage.getItem('cart')) ?? []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  CLEAR_CART: 'CLEAR_CART',
  REMOVE_CART_PRODUCT: 'REMOVE_CART_PRODUCT'
}

const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

const updateStateByAction = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const prodIndex = state.findIndex(prod => prod.id === action.payload.id)
    if (prodIndex === -1) {
      return [...state, { ...action.payload, quantity: 1 }]
    }

    const newCart = structuredClone(state) // Copia profunda, no se pued con spread.
    newCart[prodIndex].quantity += 1
    return newCart
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => [],
  [CART_ACTION_TYPES.REMOVE_CART_PRODUCT]: (state, action) => state.filter(prod => prod.id !== action.payload.id)
}

export function cartReducer (state, action) {
  const { type: actionType } = action
  const updateState = updateStateByAction[actionType]
  const newState = updateState ? updateState(state, action) : state

  // Actualizamos localStorage y retornamos el nuevo estado.
  updateLocalStorage(newState)
  return newState
}
