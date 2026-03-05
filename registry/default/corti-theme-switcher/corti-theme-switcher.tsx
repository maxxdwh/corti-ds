"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const STORAGE_KEY = "corti-theme"

const THEMES = [
  { label: "Console Light", value: "corti-console-light" },
  { label: "Console Dark", value: "corti-console-dark" },
  { label: "Assistant Light", value: "corti-assistant-light" },
  { label: "Assistant Dark", value: "corti-assistant-dark" },
  { label: "Showcase Light", value: "corti-showcase-light" },
  { label: "Showcase Dark", value: "corti-showcase-dark" },
] as const

type CortiTheme = (typeof THEMES)[number]["value"]

function isCortiTheme(value: string): value is CortiTheme {
  return THEMES.some((theme) => theme.value === value)
}

function applyTheme(theme: CortiTheme) {
  const root = document.documentElement
  const isDark = theme.endsWith("-dark")

  root.dataset.theme = theme
  root.classList.toggle("dark", isDark)
  root.style.colorScheme = isDark ? "dark" : "light"
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

    applyTheme(nextTheme)
    setTheme(nextTheme)
  }, [])

  function onChange(nextTheme: string) {
    if (!isCortiTheme(nextTheme)) {
      return
    }

    applyTheme(nextTheme)
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
    setTheme(nextTheme)
  }

  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Theme</span>
      <Select value={theme} onValueChange={onChange}>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          {THEMES.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
