import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'

export function Filters () {
  const { filters, setFilters } = useFilters()
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleMinPriceChange = (event) => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Precio mínimo (min: 0€ - max: 1000€)</label>
        <input
          type='range'
          name='price'
          id={minPriceFilterId}
          min={0}
          max={1000}
          onChange={handleMinPriceChange}
          value={filters.minPrice}
        />
        <span>{filters.minPrice}€</span>
      </div>

      <div>
        <label htmlFor='category'>Category</label>
        <select name='category' id={categoryFilterId} value={filters.category} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='laptops'>Portátiles</option>
          <option value='smartphones'>Móviles</option>
        </select>
      </div>
    </section>
  )
}
