import { useEffect, useState } from 'react'
import { useViewTransitionNavigation } from './useViewTransitionNavigation'
import { useCharactersActions } from '../characters/hooks/useCharactersActions'
import { useParams } from 'react-router-dom'
import { type Character } from '../characters/types'
import { fetchCharacters } from '../characters/services/fetch'

export const useLoadCharacterPage = () => {
  const [character, setCharacter] = useState<Character | null>(null)
  const { characterId } = useParams()
  const { characters, configureCharacters } = useCharactersActions()
  const { handleNavigation } = useViewTransitionNavigation({ to: '/' })

  const findCharacter = (id: string, data: Character[]) => {
    return data.find(character => character.id.toString() === id)
  }

  useEffect(() => {
    if (characterId == null) return

    // Si el estado de characters es null, fetcheamos y luego lo buscamos.
    if (characters.length === 0) {
      fetchCharacters()
        .then(data => {
          configureCharacters(data)
          const singleCharacter = findCharacter(characterId, data)
          if (singleCharacter == null) {
            throw new Error(`Character with id ${characterId} not found`)
          }

          setCharacter(singleCharacter)
        })
        .catch(error => {
          console.log(error)
        })

      return
    }

    // Si el estado de characters no es null, buscamos directamente.
    const singleCharacter = findCharacter(characterId, characters)
    if (singleCharacter == null) {
      throw new Error(`Character with id ${characterId} not found`)
    }

    setCharacter(singleCharacter)
  }, [])

  return {
    handleNavigation,
    characterId,
    character
  }
}
