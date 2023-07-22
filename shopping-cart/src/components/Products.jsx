import { Product } from './Product'
import './Products.css'

export function Products ({ products }) {
  return (
    <main className='products'>
      <ul>
        {
          products.map(product => {
            return (
              <Product key={product.id} product={product} />
            )
          })
        }
      </ul>
    </main>
  )
}
