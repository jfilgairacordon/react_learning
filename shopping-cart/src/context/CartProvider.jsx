import { createContext } from 'react'
import { useCartReducer } from '../hooks/useCartReducer'

// 1. Creamos el contexto
export const CartContext = createContext()

// 2. Creamos el componente Provider
export function CartProvider ({ children }) {
  const { state, addToCart, clearCart, removeCartProduct } = useCartReducer()

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      clearCart,
      removeCartProduct
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
