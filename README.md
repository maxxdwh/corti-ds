# Corti ShadCN Registry (Default Style)

Small starter registry for Corti components built on top of shadcn/ui.

## What is included

- Custom Corti DS items:
  - `button` (Corti wrapper)
  - `empty-state`
  - `stat-card`
  - `section-header`
  - `status-pill`
  - `loading-panel`
  - `activity-row`
  - `theme-core`
  - `theme-console`
  - `theme-assistant`
  - `theme-showcase`
  - `theme-win95`
  - `theme-switcher`
- Full shadcn default UI catalog under `@corti/*` names (no `corti-*` duplicates), e.g.:
  - `accordion`
  - `input`
  - `select`
  - `table`
  - `sidebar`
  - `toast`

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
npx shadcn@latest add @corti/button
npx shadcn@latest add @corti/empty-state
npx shadcn@latest add @corti/stat-card
npx shadcn@latest add @corti/section-header
npx shadcn@latest add @corti/status-pill
npx shadcn@latest add @corti/loading-panel
npx shadcn@latest add @corti/activity-row
npx shadcn@latest add @corti/theme-console
npx shadcn@latest add @corti/theme-assistant
npx shadcn@latest add @corti/theme-showcase
npx shadcn@latest add @corti/theme-win95
npx shadcn@latest add @corti/theme-switcher
npx shadcn@latest add @corti/input @corti/select @corti/sidebar
```

Set a theme at runtime:

```ts
document.documentElement.dataset.theme = "corti-console-light"
// or: corti-console-dark, corti-assistant-light, corti-assistant-dark,
// corti-showcase-light, corti-showcase-dark,
// corti-win95-light, corti-win95-dark
```

`theme-switcher` includes a `Shadcn Default` option that removes `data-theme` overrides.

If you update a component/theme that is already installed in a consumer app, reinstall with overwrite:

```bash
npx shadcn@latest add -o @corti/<item-name>
```

## Manual theme edits

If you want to manually tweak a theme, edit these files:

- `registry.json`:
  - `theme-console`
  - `theme-assistant`
  - `theme-showcase`
  - `theme-win95`
- `registry/default/corti-theme-switcher/corti-theme-switcher.tsx` (theme options + switch behavior)

After editing, rebuild and republish:

```bash
npm run registry:build
```

Do not edit `public/r/*.json` directly. Those files are generated from `registry.json`.
