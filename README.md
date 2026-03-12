# Corti DS Registry

Corti's shadcn/ui-based component registry and theme library.

This repo publishes:

- Corti-specific components such as `button`, `empty-state`, `stat-card`, and `activity-row`
- namespaced shadcn/ui primitives under `@corti/*`
- shared themes: `Console`, `Assistant`, `Classic`, and `Showcase`
- a `theme-switcher` component and a local Theme Lab for visual review

## Ownership Model

Corti treats an item as **owned** when its implementation source is local to this repo and referenced by a `files` entry in `registry.json` (under `registry/default/...`).

- `registry:block` and `registry:ui` are packaging categories.
- Ownership is operationally defined by local source control, not item type.
- `registryDependencies` are reserved for true prerequisites (for example, `@corti/button` for `dialog`), not as the primary component source.

## Structure

- `registry.json`
  Source of truth for registry items and themes.
- `registry/default/...`
  Source files for Corti-owned registry items.
- `public/r/...`
  Generated installable registry JSON files.
- `theme-lab/...`
  Local app for reviewing components and themes.

Do not edit `public/r/*.json` directly. Rebuild from `registry.json`.

## Themes

Available themes:

- `theme-console`
  Baseline shadcn-style light and dark tokens under the Corti namespace.
- `theme-assistant`
  Corti assistant theme.
- `theme-classic`
  Retro desktop-inspired theme with beveled chrome.
- `theme-showcase`
  High-contrast editorial/demo theme.

`Console` is the default baseline option. In Theme Lab and `theme-switcher`, choosing `Console` clears `data-theme` overrides and falls back to standard shadcn styling.

Runtime theme values:

- `corti-console-light`
- `corti-console-dark`
- `corti-assistant-light`
- `corti-assistant-dark`
- `corti-classic-light`
- `corti-classic-dark`
- `corti-showcase-light`
- `corti-showcase-dark`

Example:

```ts
document.documentElement.dataset.theme = "corti-classic-light"
```

To return to baseline shadcn styling, remove the override:

```ts
delete document.documentElement.dataset.theme
```

## Build

Install dependencies:

```bash
npm install
```

Build the registry:

```bash
npm run registry:build
```

Watch registry output during theme or component work:

```bash
npm run registry:watch
```

## Consume From Another Project

Add the registry to the consumer app's `components.json`:

```json
{
  "registries": {
    "@corti": "<your-hosted-url>/public/r/{name}.json"
  }
}
```

Install components with the shadcn CLI:

```bash
npx shadcn@latest add @corti/button
npx shadcn@latest add @corti/empty-state
npx shadcn@latest add @corti/stat-card
npx shadcn@latest add @corti/activity-row
npx shadcn@latest add @corti/theme-console
npx shadcn@latest add @corti/theme-assistant
npx shadcn@latest add @corti/theme-classic
npx shadcn@latest add @corti/theme-showcase
npx shadcn@latest add @corti/theme-switcher
```

Install standard shadcn primitives from this registry the same way:

```bash
npx shadcn@latest add @corti/input @corti/select @corti/sidebar
```

To overwrite an existing installed item:

```bash
npx shadcn@latest add -o @corti/<item-name>
```

## Included Items

Corti-owned items:

- `button`
- `empty-state`
- `stat-card`
- `section-header`
- `status-pill`
- `loading-panel`
- `activity-row`
- `theme-core`
- `theme-console`
- `theme-assistant`
- `theme-classic`
- `theme-showcase`
- `theme-switcher`

The registry also republishes the default shadcn/ui catalog under `@corti/*`, including:

- `accordion`
- `alert`
- `alert-dialog`
- `avatar`
- `badge`
- `card`
- `dialog`
- `field`
- `form`
- `input`
- `popover`
- `progress`
- `select`
- `sheet`
- `sidebar`
- `switch`
- `table`
- `tabs`
- `textarea`
- `toast`
- `tooltip`

See `public/r/` for the full generated list.

## Phased Ownership Rollout

The migration to full Corti ownership is intentionally phased to preserve shadcn API parity and reduce break risk.

- **Phase 1 (implemented):** `button`, `input`, `textarea`, `select`, `dialog`, `sheet`, `popover`, `tabs`, `switch`, `checkbox`, `radio-group`
- **Phase 2 (planned):** navigation/data/feedback surfaces
- **Phase 3 (planned):** remaining long-tail components + consistency pass

Phase 1 components are now source-backed in `registry/default/...` and include semantic token hooks.

To inspect remaining non-owned registry UI items:

```bash
node scripts/list-unowned-items.mjs
```

## Upstream Sync Cadence

Upstream shadcn changes are merged on a scheduled cadence, not continuously:

1. Pull latest upstream component changes into a staging branch.
2. Review API, behavior, and accessibility parity diffs.
3. Verify token compatibility and theme output.
4. Merge selected changes with concise release notes.

This keeps Corti-owned components stable while still tracking upstream improvements.

## Theme Editing

If you need to change a theme, start here:

- `registry.json`
- `registry/default/corti-theme-switcher/corti-theme-switcher.tsx`
- `theme-lab/public/themes/*.json`
- `theme-lab/src/components/theme-style-loader.tsx`
- `theme-lab/src/components/theme-switcher.tsx`

After editing:

```bash
npm run registry:build
```

If you changed Theme Lab surfaces or theme previews, also verify the app build from `theme-lab/`:

```bash
npm run build
```

## Theme Lab

Theme Lab is the local preview app for registry components and theme behavior. Use it to review:

- theme token application
- dialogs, sheets, popovers, and other portal surfaces
- component states across `Console`, `Assistant`, `Classic`, and `Showcase`

Theme Lab theme files live in `theme-lab/public/themes/`.
