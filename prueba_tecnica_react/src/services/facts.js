import { FACT_API_ENDPOINT, IMAGE_API_ENDPOINT } from '../constants'

export const getRandomFact = () => {
  return fetch(FACT_API_ENDPOINT)
    .then(response => {
      if (!response.ok) throw new Error('Error fetching fact')
      return response.json()
    })
    .then(data => {
      return data.fact
    })
    .catch(error => {
      // Tanto si hay un error en la petición como si hay un error en el json
      console.error(error)
      return null
    })
}

export const fetchCatImage = (word) => {
  return fetch(`${IMAGE_API_ENDPOINT}${word}`)
    .then(response => {
      if (!response.ok) throw new Error('Error fetching image')
      return response.url
    })
    .catch(error => {
      // Tanto si hay un error en la petición como si hay un error en el json
      console.error(error)
      return null
    })
}
