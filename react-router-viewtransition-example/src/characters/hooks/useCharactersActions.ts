import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { setCharacters } from '../store/slice'
import { type Character } from '../types'

export const useCharactersActions = () => {
  const characters = useAppSelector((state) => state.characters)
  const dispatch = useAppDispatch()

  const configureCharacters = (characters: Character[]) => {
    dispatch(setCharacters(characters))
  }

  return {
    characters,
    configureCharacters
  }
}
