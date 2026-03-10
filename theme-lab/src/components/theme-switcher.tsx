"use client"

import * as React from "react"
import { Laptop, Moon, Sun } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export const THEME_STORAGE_KEY = "theme-family"
export const MODE_STORAGE_KEY = "theme-mode"

export const THEME_FAMILIES = [
  { label: "Console", value: "corti-console" },
  { label: "Assistant", value: "corti-assistant" },
  { label: "Classic", value: "corti-classic" },
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
  className,
}: {
  themeFamily: ThemeFamily
  mode: ThemeMode
  onThemeFamilyChange: (value: ThemeFamily) => void
  onModeChange: (value: ThemeMode) => void
  className?: string
}) {
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
    <div className={cn("space-y-3", className)}>
      <div className="space-y-1.5">
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Theme
        </span>
        <div
          className={cn(
            "space-y-1 border border-border/70 bg-secondary/40 p-1",
            themeFamily === "corti-classic" ? "rounded-none" : "rounded-xl"
          )}
        >
          {THEME_FAMILIES.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={themeFamily === option.value}
              className={cn(
                "flex h-10 w-full items-center border px-3 text-left text-sm font-medium focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                themeFamily === "corti-classic"
                  ? "rounded-none transition-none"
                  : "rounded-lg transition-colors",
                themeFamily === "corti-classic" && themeFamily === option.value
                  ? "bg-background text-foreground shadow-[inset_1px_1px_0_var(--classic-shadow-deep),inset_-1px_-1px_0_var(--classic-highlight)]"
                  : themeFamily === "corti-classic"
                    ? "bg-secondary text-muted-foreground shadow-[inset_1px_1px_0_var(--classic-highlight),inset_-1px_-1px_0_var(--classic-shadow-deep)] hover:bg-secondary"
                    : "hover:bg-background/80",
                themeFamily === option.value
                  ? "border-border bg-background text-foreground"
                  : "border-transparent text-muted-foreground"
              )}
              onClick={() => handleThemeFamilyChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <Tabs value={mode} onValueChange={handleModeChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="system" title="System" aria-label="System theme">
            <Laptop className="size-4" />
          </TabsTrigger>
          <TabsTrigger value="light" title="Light" aria-label="Light theme">
            <Sun className="size-4" />
          </TabsTrigger>
          <TabsTrigger value="dark" title="Dark" aria-label="Dark theme">
            <Moon className="size-4" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
