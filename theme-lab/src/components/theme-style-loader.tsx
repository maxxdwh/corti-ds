"use client"

import * as React from "react"
import themeAssistant from "../../../public/r/theme-assistant.json"
import themeClassic from "../../../public/r/theme-classic.json"
import themeConsole from "../../../public/r/theme-console.json"
import themeCore from "../../../public/r/theme-core.json"
import themeShowcase from "../../../public/r/theme-showcase.json"

type ThemeFile = {
  css?: {
    "@layer base"?: Record<string, Record<string, string>>
  }
  cssVars?: {
    theme?: Record<string, string>
  }
}

const THEME_FILES: ThemeFile[] = [
  themeCore,
  themeConsole,
  themeAssistant,
  themeClassic,
  themeShowcase,
]

function declarations(vars: Record<string, string>) {
  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ")
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
  const css = React.useMemo(() => toCss(THEME_FILES), [])

  React.useEffect(() => {
    const id = "theme-styles"
    let styleTag = document.getElementById(id) as HTMLStyleElement | null

    if (!styleTag) {
      styleTag = document.createElement("style")
      styleTag.id = id
      document.head.appendChild(styleTag)
    }

    styleTag.textContent = css
  }, [css])

  return null
}
