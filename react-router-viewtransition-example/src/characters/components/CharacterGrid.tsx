import './CharacterGrid.css'
import { useCharactersActions } from '../hooks/useCharactersActions'
import { SingleCharacter } from './SingleCharacter'

export function CharacterGrid () {
  const { characters } = useCharactersActions()

  return (
    <ul className="character-grid">
      {
        characters.map(character => {
          return (
            <SingleCharacter key={character.id} character={character} />
          )
        })
      }
    </ul>
  )
}
