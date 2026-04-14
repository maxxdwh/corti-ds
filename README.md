# Corti DS Registry

A shadcn/ui-compatible component and theme registry for Corti. Install components and themes directly into any shadcn project via the CLI — no copy-pasting required.

**Registry URL:** `https://maxxdwh.github.io/corti-ds/public/r/{name}.json`

---

## Quick Start

### 1. Add the registry to your project

In your project's `components.json`, add the `@corti` registry:

```json
{
  "registries": {
    "@corti": "https://maxxdwh.github.io/corti-ds/public/r/{name}.json"
  }
}
```

### 2. Install components

Use the shadcn CLI to pull in any registry item:

```bash
npx shadcn@latest add @corti/button
npx shadcn@latest add @corti/input @corti/select @corti/sidebar
```

### 3. Install a theme

Pick a theme and install it:

```bash
npx shadcn@latest add @corti/theme-console    # Monochrome baseline
npx shadcn@latest add @corti/theme-assistant  # Corti blue
npx shadcn@latest add @corti/theme-classic    # Retro desktop chrome
npx shadcn@latest add @corti/theme-showcase   # High-contrast editorial
npx shadcn@latest add @corti/theme-retro-arcade  # Pixel/arcade
```

`theme-core` is installed automatically as a dependency of any theme.

### 4. Apply a theme at runtime

Set `data-theme` on the root `<html>` element:

```ts
document.documentElement.dataset.theme = "corti-assistant-light"
```

Available values:

| Theme | Light | Dark |
|---|---|---|
| Console | `corti-console-light` | `corti-console-dark` |
| Assistant | `corti-assistant-light` | `corti-assistant-dark` |
| Classic | `corti-classic-light` | `corti-classic-dark` |
| Showcase | `corti-showcase-light` | `corti-showcase-dark` |
| Retro Arcade | `corti-retro-arcade-light` | `corti-retro-arcade-dark` |

To fall back to standard shadcn styling (no Corti theme), remove the attribute:

```ts
delete document.documentElement.dataset.theme
```

### 5. (Optional) Add the theme switcher

Install the `theme-switcher` component for a ready-made UI control:

```bash
npx shadcn@latest add @corti/theme-switcher
```

---

## MCP Setup

The registry supports the shadcn MCP server, which lets Claude install and use components on your behalf.

In your project, run:

```bash
npx shadcn@latest mcp init --client claude
```

Then restart Claude Code. You can then prompt Claude with things like:
> *"Add the @corti/button and @corti/theme-assistant to this project"*

---

## Available Items

### Themes

| Name | Description |
|---|---|
| `theme-core` | Shared semantic tokens (auto-installed with any theme) |
| `theme-console` | Monochrome light/dark — closest to shadcn defaults |
| `theme-assistant` | Corti blue — matches the Corti assistant product |
| `theme-classic` | Retro desktop-inspired with beveled chrome |
| `theme-showcase` | High-contrast editorial theme with IBM Plex Mono |
| `theme-retro-arcade` | Pixel-inspired arcade aesthetic |

### Components

All standard shadcn/ui components are available under `@corti/*`:

`accordion` · `alert` · `alert-dialog` · `avatar` · `badge` · `button` · `card` · `checkbox` · `dialog` · `dropdown-menu` · `form` · `input` · `label` · `popover` · `progress` · `radio-group` · `select` · `separator` · `sheet` · `sidebar` · `skeleton` · `slider` · `switch` · `table` · `tabs` · `textarea` · `toast` · `toggle` · `tooltip`

---

## Updating an Installed Item

If a component or theme has been updated in the registry, reinstall with the overwrite flag:

```bash
npx shadcn@latest add -o @corti/<item-name>
```

---

## Contributing / Local Development

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Build the registry

Compiles `registry.json` into installable JSON files under `public/r/`:

```bash
npm run registry:build
```

### Watch mode

Rebuilds automatically as you edit registry items:

```bash
npm run registry:watch
```

> Do not edit files in `public/r/` directly — they are generated. Edit `registry.json` or the source files under `registry/default/`, then rebuild.

### Editing a theme

1. Open `registry.json` and find the theme entry (e.g. `theme-showcase`)
2. Edit the CSS variable values
3. Run `npm run registry:build`
4. Preview changes in Theme Lab (see below)

### Theme Lab

A local preview app for reviewing components across all themes:

```bash
cd theme-lab
npm install
npm run dev
```

---

## Deployment

The registry is deployed via GitHub Pages from the `main` branch. Pushing to `main` automatically publishes updated registry files at:

```
https://maxxdwh.github.io/corti-ds/public/r/{name}.json
```
