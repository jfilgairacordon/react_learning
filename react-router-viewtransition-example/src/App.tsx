import { useEffect } from 'react'
import './App.css'
import { CharacterGrid } from './characters/components/CharacterGrid'
import { Header } from './components/Header'
import { fetchCharacters } from './characters/services/fetch'
import { useCharactersActions } from './characters/hooks/useCharactersActions'

function App () {
  const { configureCharacters } = useCharactersActions()

  useEffect(() => {
    fetchCharacters()
      .then(data => { configureCharacters(data) })
      .catch(error => { console.log(error) })
  }, [])

  return (
    <>
      <main>
        <Header />
        <CharacterGrid />
      </main>
    </>
  )
}

export default App
