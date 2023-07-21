export function Movie ({ movie }) {
  return (
    <article className='movie'>
      <img src={movie.poster} alt={movie.title} />
      <h2>{movie.title}</h2>
      <span>{movie.year}</span>
    </article>
  )
}
