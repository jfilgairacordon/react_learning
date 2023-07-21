import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearchMovies } from './hooks/useSearchMovies'

function App () {
  const { movies } = useMovies()
  const { query, error, configureQuery } = useSearchMovies()

  const handleSubmit = (event) => {
    event.preventDefault()

    // Si no hiciesemos la decomposición,
    // tendríamos toda la lista de campos
    // const data = new FormData(event.target)
    // const { query } = Object.fromEntries(data)

    // Otra forma de obtener el valor de un campo
    // const query = data.get('query')

    // if (!query) return
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form onSubmit={handleSubmit} className='form'>
          <input name='query' value={query} onChange={configureQuery} type='text' placeholder='Super Man, Barbie, Avengers...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <p style={{ color: 'red' }}>{error}</p>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
