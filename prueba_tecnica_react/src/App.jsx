import { useEffect, useState } from 'react'
import { FACT_API_ENDPOINT, IMAGE_API_ENDPOINT } from './constants'
import { Fact } from './components/Fact'
import './App.css'

export const App = () => {
  const [fact, setFact] = useState()
  const [image, setImage] = useState()

  // Al montar el componente, hacemos una petición a la API para recoger el fact
  useEffect(() => {
    fetch(FACT_API_ENDPOINT)
      .then(response => {
        if (!response.ok) throw new Error('Error fetching fact')
        return response.json()
      })
      .then(data => setFact(data.fact))
      .catch(error => {
        // Tanto si hay un error en la petición como si hay un error en el json
        console.error(error)
      })
  }, [])

  // Cuando cambie el fact, vamos a por la img del gatito.
  useEffect(() => {
    if (!fact) return
    // Recogemos la primera palabra del fact.
    const firstWord = fact.split(' ')[0]
    console.log(firstWord)
    fetch(`${IMAGE_API_ENDPOINT}${firstWord}`)
      .then(response => setImage(response.url))
  }, [fact])

  const refreshFact = () => {
    fetch(FACT_API_ENDPOINT)
      .then(response => response.json())
      .then(data => setFact(data.fact))
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      {
        (fact !== '' && image !== '')
          ? <Fact fact={fact} image={image} />
          : <p>Cargando...</p>
      }
      {
        (fact !== '' && image !== '') &&
          <button onClick={() => refreshFact()}>REFRESH FACT</button>
      }
    </main>
  )
}
