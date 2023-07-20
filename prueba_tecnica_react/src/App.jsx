import { useEffect, useState } from 'react'
import { Fact } from './components/Fact'
import './App.css'
import { getRandomFact } from './services/facts'
import { useCatImage } from './hooks/useCatImage'

export const App = () => {
  const [fact, setFact] = useState()
  const image = useCatImage({ fact })

  // Al montar el componente, hacemos una petición a la API para recoger el fact
  useEffect(() => {
    getRandomFact().then(setFact)
  }, [])

  const handleClick = () => {
    getRandomFact().then(setFact)
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
          <button onClick={() => handleClick()}>REFRESH FACT</button>
      }
    </main>
  )
}
