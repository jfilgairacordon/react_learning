import { type Character } from '../types'
import { useViewTransitionNavigation } from '../../hooks/useViewTransitionNavigation'

type Props = | {
  character: Character
}
export function SingleCharacter ({ character }: Props) {
  const { name, species, image, status, id } = character
  const to = `/character/${id}`
  const { handleNavigation } = useViewTransitionNavigation({ to })

  return (
    <li className="character">
      <div className="character_image">
        <img style={{ viewTransitionName: 'avatar-image-' + id.toString() }} src={image} alt={`Avatar del personaje ${name}`} />
      </div>
      <div style={{ viewTransitionName: 'avatar-title-' + id.toString() }} className="character_name">{name}</div>
      <div className="character_species">{species}</div>
      <div className="character_status">{status}</div>
      <a href={`/character/${id}`} onClick={handleNavigation}>Ver más</a>
    </li>
  )
}
