# Corti ShadCN Registry (Default Style)

Small starter registry for Corti components built on top of shadcn/ui.

## What is included

- `corti-button`
- `corti-empty-state`

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
    "@corti": "<your-hosted-url>/r/{name}.json"
  }
}
```

Then install items with the shadcn CLI:

```bash
npx shadcn@latest add @corti/corti-button
npx shadcn@latest add @corti/corti-empty-state
```
