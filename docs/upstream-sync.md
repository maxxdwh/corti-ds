# Upstream Sync Workflow

Use this process for scheduled shadcn syncs into Corti-owned components.

## Cadence

- Recommended: monthly (or quarterly for low-change periods).
- Create a staging branch for each sync cycle.

## Steps

1. Pull upstream shadcn changes into staging.
2. Diff each owned component against upstream baseline.
3. Preserve strict API parity by default (props/variants/behavior).
4. Keep Corti-only changes additive and non-breaking.
5. Validate accessibility behavior for Radix-driven interactions.
6. Validate theme-token compatibility across `console`, `assistant`, `classic`, `showcase`.
7. Ship selected changes with release notes.

## Acceptance Checklist

- No breaking API changes for existing consumers.
- Interactive behavior parity preserved.
- Semantic tokens still resolve correctly in light/dark modes.
- Generated `public/r/*.json` builds cleanly via `npm run registry:build`.
