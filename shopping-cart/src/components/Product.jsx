import { useCart } from '../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'

export function Product ({ product }) {
  const { cart, addToCart, removeCartProduct } = useCart()

  const isInCart = cart.some(prod => prod.id === product.id)

  const handleProductClick = (product) => {
    if (isInCart) {
      removeCartProduct(product)
      return
    }

    addToCart(product)
  }

  return (
    <li>
      <img src={product.thumbnail} alt={product.title} />
      <div>
        <strong>{product.title}</strong> - ${product.price}
      </div>
      <div>
        <button
          style={{ backgroundColor: isInCart ? 'red' : '#09f' }}
          onClick={() => handleProductClick(product)}
        >
          {
            isInCart
              ? <RemoveFromCartIcon />
              : <AddToCartIcon />
          }
        </button>
      </div>
    </li>
  )
}
