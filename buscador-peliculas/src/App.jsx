import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearchMovies } from './hooks/useSearchMovies'
import debounce from 'just-debounce-it'

function App () {
  const { query, error, configureQuery } = useSearchMovies()
  const [sort, setSort] = useState(false)
  const { movies, loading, getMovies } = useMovies({ query, sort })

  const handleSort = (event) => {
    setSort(event.target.checked)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ query })

    // Si no hiciesemos la decomposición,
    // tendríamos toda la lista de campos
    // const data = new FormData(event.target)
    // const { query } = Object.fromEntries(data)

    // Otra forma de obtener el valor de un campo
    // const query = data.get('query')

    // if (!query) return
  }

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ query: search })
  }, 500), [])

  const handleQueryChange = (event) => {
    const newQuery = event.target.value
    configureQuery(newQuery)
    debouncedGetMovies(newQuery)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form onSubmit={handleSubmit} className='form'>
          <input name='query' value={query} onChange={handleQueryChange} type='text' placeholder='Super Man, Barbie, Avengers...' />
          <input name='sort' type='checkbox' value={sort} onChange={handleSort} />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        {loading && <p>Cargando...</p>}
        <p style={{ color: 'red' }}>{error}</p>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
