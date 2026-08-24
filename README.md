# GlobalData UI Components

Shared React component library and Storybook catalogue for GlobalData.

This repository contains the initial foundation for the GlobalData design system:
- reusable UI components in `@globaldata/ui`
- design tokens in `@globaldata/design-tokens`
- a Storybook app for documentation, showcase screens and interaction review

## Workspace

```text
apps/
  storybook/        Storybook app and catalogue shell

packages/
  design-tokens/    Global design tokens exposed as CSS
  ui/               Reusable React components
  config/           Shared configuration package
```

## Current Scope

The current implementation includes:
- a CSS-based design token foundation
- a reusable `Button` component with variants, sizes and states
- Storybook stories for isolated component examples
- a richer `Overview` page for component documentation and presentation

## Scripts

Run commands from the repository root.

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
pnpm visual:test
```

## Storybook

Storybook is the main review surface for this repository.

It is used to:
- render component stories from `packages/ui/src`
- host richer overview and showcase screens
- review variants, states and interaction behaviour

Useful Storybook-specific commands:

```bash
pnpm --filter @globaldata/storybook dev
pnpm --filter @globaldata/storybook build
pnpm --filter @globaldata/storybook test
pnpm --filter @globaldata/storybook typecheck
pnpm --filter @globaldata/storybook visual:test
```

`pnpm visual:test` publishes the built Storybook to Chromatic and expects
`CHROMATIC_PROJECT_TOKEN` to be set in the environment.

## Notes

- The workspace uses `pnpm` and `turbo`.
- The repository expects Node `>= 22.13.0`.
- Global Storybook UI configuration lives in `apps/storybook/.storybook/`.
- The Storybook app is documentation infrastructure, not part of the published UI library surface.
