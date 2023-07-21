import { Movie } from './Movie'

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0
  return (
    <section className='movies'>
      {
        hasMovies
          ? movies.map(movie => (
            <Movie key={movie.id} movie={movie} />
          ))
          : <p>No se encontraron resultados</p>
      }
    </section>
  )
}
