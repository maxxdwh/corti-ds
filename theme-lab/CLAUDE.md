# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
```

No test suite exists in this project.

## Architecture

**Theme Lab** is a Next.js app that serves as a visual testing lab for the Corti Design System — it renders shadcn UI components under multiple theme variants so designers and developers can preview component appearance across themes.

### Theme System

Themes are defined as JSON files in `public/themes/` with CSS layer structure. Each theme file contains light and dark variants. The flow:

1. `ThemeStyleLoader` (`src/components/theme-style-loader.tsx`) fetches theme JSON at runtime, converts it to CSS, and injects it via `<style id="theme-styles">`. It also loads Google Fonts for theme-specific typography.
2. `ThemeSwitcher` (`src/components/theme-switcher.tsx`) manages selection state, persists to `localStorage` (`theme-family`, `theme-mode`), and detects system color preference.
3. `theme-core.json` contains shared semantic variable overrides (buttons, inputs, etc.) applied on top of every theme.

To add a new theme: create `public/themes/theme-{name}.json`, add it to `THEME_FILES` in `theme-style-loader.tsx`, and add the variant to `THEME_FAMILIES` in `theme-switcher.tsx`.

### Component Showcase

`src/components/component-lab.tsx` is the main showcase (~74KB). It renders all 56+ shadcn components. The list of components to display is driven by `src/data/shadcn-components.json`.

The home page (`src/app/page.tsx`) lazy-loads `ComponentLab` with `dynamic()` and `ssr: false`.

### CSS / Styling

- Tailwind CSS v4 with PostCSS
- Theme tokens use OKLCH color space as CSS custom properties
- `src/app/globals.css` defines base Tailwind config and CSS variable defaults
- Path alias: `@/*` → `src/*`
- shadcn config in `components.json` (style: `new-york`, baseColor: `neutral`)

### Key Patterns

- **"use client" everywhere** — this is a fully client-rendered app; no server components beyond the root layout
- `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) is used throughout for class composition
- `ThemeScopeProvider` (`src/components/theme-scope.tsx`) provides a React Context holding a portal container ref, used for rendering popover/dialog components inside the themed DOM subtree
