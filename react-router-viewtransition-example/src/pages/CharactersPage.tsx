import { useEffect } from 'react'
import { CharacterGrid } from '../characters/components/CharacterGrid'
import { useCharactersActions } from '../characters/hooks/useCharactersActions'
import { Header } from '../components/Header'
import { fetchCharacters } from '../characters/services/fetch'

export function CharactersPage () {
  const { characters, configureCharacters } = useCharactersActions()

  useEffect(() => {
    if (characters.length > 0) return
    fetchCharacters()
      .then(data => { configureCharacters(data) })
      .catch(error => { console.log(error) })
  }, [])

  return (
    <main>
      <Header />
      <section>
        <CharacterGrid />
      </section>
    </main>
  )
}
