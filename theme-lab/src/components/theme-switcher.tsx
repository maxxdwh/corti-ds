"use client"

import * as React from "react"
import { Laptop, Moon, Sun } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const THEME_STORAGE_KEY = "theme-family"
export const MODE_STORAGE_KEY = "theme-mode"

export const THEME_FAMILIES = [
  { label: "Shadcn Default", value: "shadcn" },
  { label: "Console", value: "corti-console" },
  { label: "Assistant", value: "corti-assistant" },
  { label: "Showcase", value: "corti-showcase" },
] as const

export const THEME_MODES = ["system", "light", "dark"] as const

export type ThemeFamily = (typeof THEME_FAMILIES)[number]["value"]
export type ThemeMode = (typeof THEME_MODES)[number]

export function isThemeFamily(value: string): value is ThemeFamily {
  return THEME_FAMILIES.some((theme) => theme.value === value)
}

export function isThemeMode(value: string): value is ThemeMode {
  return THEME_MODES.includes(value as ThemeMode)
}

export function resolveMode(mode: ThemeMode) {
  if (mode !== "system") {
    return mode
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function ThemeSwitcher({
  themeFamily,
  mode,
  onThemeFamilyChange,
  onModeChange,
}: {
  themeFamily: ThemeFamily
  mode: ThemeMode
  onThemeFamilyChange: (value: ThemeFamily) => void
  onModeChange: (value: ThemeMode) => void
}) {
  const modeIcons: Record<ThemeMode, React.ReactNode> = {
    system: <Laptop className="size-4" />,
    light: <Sun className="size-4" />,
    dark: <Moon className="size-4" />,
  }

  function handleThemeFamilyChange(nextThemeFamily: string) {
    if (isThemeFamily(nextThemeFamily)) {
      onThemeFamilyChange(nextThemeFamily)
    }
  }

  function handleModeChange(nextMode: string) {
    if (isThemeMode(nextMode)) {
      onModeChange(nextMode)
    }
  }

  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Theme</span>
      <Select value={themeFamily} onValueChange={handleThemeFamilyChange}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          {THEME_FAMILIES.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Tabs value={mode} onValueChange={handleModeChange}>
        <TabsList>
          <TabsTrigger value="system" title="System" aria-label="System theme">
            {modeIcons.system}
          </TabsTrigger>
          <TabsTrigger value="light" title="Light" aria-label="Light theme">
            {modeIcons.light}
          </TabsTrigger>
          <TabsTrigger value="dark" title="Dark" aria-label="Dark theme">
            {modeIcons.dark}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
