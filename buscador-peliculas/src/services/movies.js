import { API_URL } from '../constants'

export function fetchMovies ({ query }) {
  if (!query) return Promise.resolve([])
  return fetch(`${API_URL}${query}`)
    .then(response => response.json())
    // TODO: Error handling
    .then(response => {
      if (!response?.Search) throw new Error('No se encontraron resultados')
      return response.Search
    })
    .then(movies => movies.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
    )
    .catch(error => {
      console.error(error)
      return []
    })
}
