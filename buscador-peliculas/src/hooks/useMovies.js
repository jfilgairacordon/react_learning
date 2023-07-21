import { useCallback, useMemo, useRef, useState } from 'react'
import { fetchMovies } from '../services/movies'

export function useMovies ({ sort }) {
  const [responseMovies, setResponseMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const lastQuery = useRef() // mutable entre renderizados 😎

  // Solo se recalcula cuando cambian las dependencias.
  // lo mismo que el memo, pero para funciones.
  const getMovies = useCallback(({ query }) => {
    if (!query) return
    if (lastQuery.current === query) return
    lastQuery.current = query
    setLoading(true)
    fetchMovies({ query }).then(movies => {
      setResponseMovies(movies)
      setLoading(false)
    })
  }, []) // No hay dependencias, solo se ejecuta una vez.

  const sortedMovies = useMemo(() => {
    if (!sort) return responseMovies
    return [...responseMovies].sort((a, b) => {
      return a.title.localeCompare(b.title)
    })
  }, [responseMovies, sort])

  return {
    movies: sortedMovies,
    loading,
    getMovies
  }
}
