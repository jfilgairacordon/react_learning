import { Products } from './components/Products'
import { products as initialProducts } from './mocks/products.json'
import { useFilters } from './hooks/useFilters'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Cart } from './components/Cart'
import { CartProvider } from './context/CartProvider'

function App () {
  const { filterProducts } = useFilters(initialProducts)

  return (
    <div className='page'>
      <Header />
      <CartProvider>
        <Cart />
        <Products products={filterProducts(initialProducts)} />
      </CartProvider>
      <Footer />
    </div>
  )
}

export default App
