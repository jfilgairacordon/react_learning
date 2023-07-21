import { Fact } from './components/Fact'
import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useFact } from './hooks/useFact'

export const App = () => {
  const { fact, getFact } = useFact()
  const image = useCatImage({ fact })

  const handleClick = () => {
    getFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      {
        (fact !== '' && image !== '')
          ? <Fact fact={fact} image={image} />
          : <p data-testid='loading'>Cargando...</p>
      }
      {
        (fact !== '' && image !== '') &&
          <button onClick={() => handleClick()}>REFRESH FACT</button>
      }
    </main>
  )
}
