import { useCart } from '../hooks/useCart'

export function CartItem ({ product }) {
  const { addToCart } = useCart()
  return (
    <li>
      <img src={product.thumbnail} alt={product.title} />
      <div>
        <strong>{product.title}</strong> - ${product.price}
      </div>

      <footer>
        <small>
          Qty: {product.quantity}
        </small>
        <button onClick={() => addToCart(product)}>+</button>
      </footer>
    </li>
  )
}
