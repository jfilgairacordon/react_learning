import { EVENTS } from '../constants'

export const navigate = (path) => {
  window.history.pushState({}, '', window.location.origin + path)
  const navEvent = new Event(EVENTS.NAVIGATION)
  window.dispatchEvent(navEvent)
}

export function Link ({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManeagableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManeagableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to) // Con spa.
    }
  }

  return <a onClick={handleClick} href={to} target={target} {...props} />
}
