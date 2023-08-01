import { useLoadCharacterPage } from '../hooks/useLoadCharacterPage'

export function CharacterPage () {
  const { character, characterId, handleNavigation } = useLoadCharacterPage()

  return (
    <div>
      <a href="/characters" onClick={handleNavigation}>Volver</a>
      <h1 style={{ viewTransitionName: 'avatar-title-' + (characterId as string) }}>{character?.name}</h1>
      <img style={{ viewTransitionName: 'avatar-image-' + (characterId as string) }} src={character?.image} alt={`Avatar del personaje ${character?.name ?? ''}`} />
      <p>{character?.status}</p>
      <p>{character?.species}</p>
    </div>
  )
}
