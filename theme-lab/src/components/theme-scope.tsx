"use client"

import * as React from "react"

const ThemeScopeContext = React.createContext<HTMLElement | null>(null)

export function ThemeScopeProvider({
  container,
  children,
}: {
  container: HTMLElement | null
  children: React.ReactNode
}) {
  return (
    <ThemeScopeContext.Provider value={container}>
      {children}
    </ThemeScopeContext.Provider>
  )
}

export function useThemePortalContainer() {
  return React.useContext(ThemeScopeContext)
}

