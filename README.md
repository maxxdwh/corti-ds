# Corti ShadCN Registry (Default Style)

Small starter registry for Corti components built on top of shadcn/ui.

## What is included

- `corti-button`
- `corti-empty-state`
- `corti-stat-card`
- `corti-section-header`
- `corti-status-pill`
- `corti-loading-panel`
- `corti-activity-row`
- `corti-theme-core`
- `corti-theme-console`
- `corti-theme-assistant`
- `corti-theme-showcase`
- `corti-theme-switcher`

All registry source files live under `registry/default/...`.
Base dependencies are pinned to shadcn `styles/default/*` endpoints.

## Build the registry

```bash
npm install
npm run registry:build
```

This generates installable JSON files in `public/r`.

## Use from another project

Add this registry URL to your consumer project's `components.json`:

```json
{
  "registries": {
    "@corti": "<your-hosted-url>/public/r/{name}.json"
  }
}
```

Then install items with the shadcn CLI:

```bash
npx shadcn@latest add @corti/corti-button
npx shadcn@latest add @corti/corti-empty-state
npx shadcn@latest add @corti/corti-stat-card
npx shadcn@latest add @corti/corti-section-header
npx shadcn@latest add @corti/corti-status-pill
npx shadcn@latest add @corti/corti-loading-panel
npx shadcn@latest add @corti/corti-activity-row
npx shadcn@latest add @corti/corti-theme-console
npx shadcn@latest add @corti/corti-theme-assistant
npx shadcn@latest add @corti/corti-theme-showcase
npx shadcn@latest add @corti/corti-theme-switcher
```

Set a theme at runtime:

```ts
document.documentElement.dataset.theme = "corti-console-light"
// or: corti-console-dark, corti-assistant-light, corti-assistant-dark,
// corti-showcase-light, corti-showcase-dark
```

For `corti-theme-showcase`, load `IBM Plex Mono` and `Press Start 2P` in your app for best visual result.

`corti-theme-switcher` includes a `Shadcn Default` option that removes `data-theme` overrides.

## Manual theme edits

If you want to manually tweak a theme, edit these files:

- `registry.json`:
  - `corti-theme-console`
  - `corti-theme-assistant`
  - `corti-theme-showcase`
- `registry/default/corti-theme-switcher/corti-theme-switcher.tsx` (theme options + switch behavior)

After editing, rebuild and republish:

```bash
npm run registry:build
```

Do not edit `public/r/*.json` directly. Those files are generated from `registry.json`.
