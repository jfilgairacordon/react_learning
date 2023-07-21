import { useEffect, useRef, useState } from 'react'

export function useSearchMovies () {
  const [query, setQuery] = useState('')
  const [error, setError] = useState()

  // Valor mutable que persiste entre renderizaciones
  const isFirstInput = useRef(true)

  const configureQuery = (value) => {
    if (value.startsWith(' ')) return
    setQuery(value)
  }

  // Validación de la búsqueda
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query === ''
      return
    }

    if (query?.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [query])

  return { query, error, configureQuery }
}
