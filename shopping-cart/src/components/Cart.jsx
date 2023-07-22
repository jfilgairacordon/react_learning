import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import './Cart.css'
import { useCart } from '../hooks/useCart.js'
import { CartItem } from './CartItem.jsx'

export function Cart () {
  const cartCheckboxId = useId()
  const { cart, clearCart } = useCart()

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input type='checkbox' id={cartCheckboxId} hidden />

      <aside className='cart'>
        <ul>
          {
            cart.map(product => (
              <CartItem key={product.id} product={product} />
            ))
          }
        </ul>

        <button onClick={() => { clearCart() }}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}
