import { useEffect, useState, Children } from 'react'
import { match } from 'path-to-regexp'
import { EVENTS } from '../constants'
import { getCurrentPath } from '../utils.js'

export function Router ({ children, routes = [], defaultComponent: DefaultPage = () => <h1>404</h1> }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(EVENTS.NAVIGATION, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.NAVIGATION, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  const allRoutes = routes.concat(routesFromChildren).filter(Boolean)

  let routeParams = {}

  const Page = allRoutes.find(route => {
    if (route.path === currentPath) return true

    const matcherURL = match(route.path, { decode: decodeURIComponent })
    const matchResult = matcherURL(currentPath)

    if (!matchResult) return false
    routeParams = matchResult.params
    return true
  })?.component

  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultPage routeParams={routeParams} />
}
