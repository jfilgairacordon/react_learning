import { flushSync } from 'react-dom'
import { useNavigate } from 'react-router-dom'

type Props = | { to: string }

export const useViewTransitionNavigation = ({ to }: Props) => {
  const navigate = useNavigate()
  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    document.startViewTransition(() => {
      flushSync(() => {
        navigate(to)
      })
    })
  }

  return {
    handleNavigation
  }
}
