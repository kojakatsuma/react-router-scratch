import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export const RouterContext = createContext<{
  location: string
  push: (_location: string) => void
}>({ location: '', push: () => {} })

export const Router: React.FC = ({ children }) => {
  const [location, setLocation] = useState(window.location.pathname)

  const handlePush = useCallback((newLocation: string) => {
    window.history.pushState({}, '', newLocation)
    setLocation(newLocation)
  }, [])

  const handleHashChange = useCallback(() => {
    setLocation(window.location.pathname)
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', handleHashChange)
    return () => window.removeEventListener('popstate', handleHashChange)
  }, [handleHashChange])

  const value = useMemo(() => {
    return { location, push: handlePush }
  }, [location, handlePush])

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  )
}

export const Link: React.FC<{ to: string }> = ({ to, children }) => {
  const { push } = useContext(RouterContext)
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      push(to)
    },
    [push, to],
  )

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  )
}
