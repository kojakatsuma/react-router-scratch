import React, { useContext, useMemo } from 'react'
import { RouterContext } from './RouterContenxt'

const compilePath = (path) => {
  const keys = []

  path = path.replace(/:(\w+)/g, (_, key) => {
    keys.push(key)
    return '([^\\/]+)'
  })
  const source = `^(${path})`
  const regex = new RegExp(source, 'i')

  return { regex, keys }
}

const matchRoutes = (children, location) => {
  const matches = []

  React.Children.forEach(children, (route) => {
    const { regex, keys } = compilePath(route.props.path)
    const match = location.match(regex)
    if (match) {
      const params = match.slice(2)
      matches.push({
        route: route.props.children,
        params: keys.reduce((collection, param, index) => {
          collection[param] = params[index]
          return collection
        }, {}),
      })
    }
  })
  return matches[0]
}

const RouteContext = React.createContext({ params: {} })

export const Routes = ({ children }) => {
  const { location } = useContext(RouterContext)

  const match = useMemo(() => matchRoutes(children, location), [
    children,
    location,
  ])

  const value = useMemo(() => ({ params: match.params }), [match])

  if(!match) return null;


  return (
    <RouteContext.Provider value={value}>
      {match.route}
    </RouteContext.Provider>
  )
}

export const useParams = () => useContext(RouteContext).params
