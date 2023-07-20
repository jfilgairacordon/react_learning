import { useEffect, useState } from 'react'
import { fetchCatImage } from '../services/facts'

export function useCatImage ({ fact }) {
  const [image, setImage] = useState()

  useEffect(() => {
    if (!fact) return
    // Recogemos la primera palabra del fact.
    const firstWord = fact.split(' ')[0]
    console.log(firstWord)
    fetchCatImage(firstWord).then(setImage)
  }, [fact])

  return image
}
