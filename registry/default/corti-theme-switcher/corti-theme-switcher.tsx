"use client"

import * as React from "react"

const STORAGE_KEY = "corti-theme"

const THEMES = [
  { label: "Console Light", value: "corti-console-light" },
  { label: "Console Dark", value: "corti-console-dark" },
  { label: "Assistant Light", value: "corti-assistant-light" },
  { label: "Assistant Dark", value: "corti-assistant-dark" },
] as const

type CortiTheme = (typeof THEMES)[number]["value"]

function isCortiTheme(value: string): value is CortiTheme {
  return THEMES.some((theme) => theme.value === value)
}

export function CortiThemeSwitcher() {
  const [theme, setTheme] = React.useState<CortiTheme>("corti-console-light")

  React.useEffect(() => {
    const root = document.documentElement
    const current = root.dataset.theme
    const stored = window.localStorage.getItem(STORAGE_KEY)

    const nextTheme = isCortiTheme(stored ?? "")
      ? stored
      : isCortiTheme(current ?? "")
        ? current
        : "corti-console-light"

    root.dataset.theme = nextTheme
    setTheme(nextTheme)
  }, [])

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextTheme = event.target.value

    if (!isCortiTheme(nextTheme)) {
      return
    }

    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
    setTheme(nextTheme)
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      Theme
      <select
        aria-label="Select theme"
        className="h-9 rounded-md border bg-background px-3 text-foreground"
        value={theme}
        onChange={onChange}
      >
        {THEMES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
