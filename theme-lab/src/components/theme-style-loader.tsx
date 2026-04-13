"use client"

import * as React from "react"

type ThemeFile = {
  css?: {
    "@layer base"?: Record<string, Record<string, string>>
  }
  cssVars?: {
    theme?: Record<string, string>
  }
}

const THEME_FILES = [
  "/themes/theme-core.json",
  "/themes/theme-console.json",
  "/themes/theme-assistant.json",
  "/themes/theme-classic.json",
  "/themes/theme-showcase.json",
  "/themes/theme-retro-arcade.json",
]

const THEME_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&family=VT323&display=swap"

function declarations(vars: Record<string, string>) {
  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ")
}

function ensureThemeFonts() {
  const id = "theme-fonts"
  let link = document.getElementById(id) as HTMLLinkElement | null

  if (link) {
    return
  }

  link = document.createElement("link")
  link.id = id
  link.rel = "stylesheet"
  link.href = THEME_FONTS_HREF
  document.head.appendChild(link)
}

function toCss(themeFiles: ThemeFile[]) {
  const rules: string[] = []

  for (const file of themeFiles) {
    if (file.cssVars?.theme) {
      const vars = Object.fromEntries(
        Object.entries(file.cssVars.theme).map(([key, value]) => [
          `--${key}`,
          value,
        ])
      )
      rules.push(`:root { ${declarations(vars)} }`)
    }

    const layer = file.css?.["@layer base"]
    if (!layer) {
      continue
    }

    for (const [selector, style] of Object.entries(layer)) {
      rules.push(`${selector} { ${declarations(style)} }`)
    }
  }

  return rules.join("\n")
}

export function ThemeStyleLoader() {
  React.useEffect(() => {
    let cancelled = false

    async function load() {
      ensureThemeFonts()

      const responses = await Promise.all(
        THEME_FILES.map(async (file) => {
          const response = await fetch(file)
          return (await response.json()) as ThemeFile
        })
      )

      if (cancelled) {
        return
      }

      const css = toCss(responses)
      const id = "theme-styles"
      let styleTag = document.getElementById(id) as HTMLStyleElement | null

      if (!styleTag) {
        styleTag = document.createElement("style")
        styleTag.id = id
        document.head.appendChild(styleTag)
      }

      styleTag.textContent = css
    }

    load().catch((error) => {
      console.error("Failed to load Corti theme styles", error)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return null
}
