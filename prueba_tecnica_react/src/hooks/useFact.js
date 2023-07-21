import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts'

export function useFact () {
  const [fact, setFact] = useState()

  const getFact = async () => {
    getRandomFact().then(setFact)
  }

  useEffect(() => {
    getFact()
  }, [])

  return { fact, getFact }
}
