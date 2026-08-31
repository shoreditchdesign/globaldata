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

Reusable components in `@globaldata/ui`:
- `Button`
- `Switch`
- `Dialog` (`DialogTrigger`, `DialogPopup`)
- `TextInput`
- `Tabs` (`TabsList`, `TabsTab`, `TabsPanel`)
- `Pagination` (`PaginationIndicators`, `PaginationPrevious`, `PaginationNext`)
- `Table`
- `Card`
- `ArticleRow`
- `ArticleBlock`
- `CarouselCard`
- `Carousel`

Design tokens live in `@globaldata/design-tokens`. Storybook is the main component documentation.

## Usage

Import components from the package entry point, and always load the compiled styles:

```tsx
import { Button, Dialog, DialogPopup, DialogTrigger } from "@globaldata/ui";
import "@globaldata/ui/styles.css";
```

To review components locally, start Storybook from the repository root:

```bash
pnpm dev
```

That runs the Storybook app (`@globaldata/storybook`). Equivalent:

```bash
pnpm --filter @globaldata/storybook dev
```

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

## Deployment & CI

Current setup:
- Repo hosted on GitHub (`shoreditchdesign/globaldata`).
- GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, test and build on every PR and on `main`.
- Vercel hosts `apps/storybook`, connected directly to this GitHub repo — every push auto-builds and deploys.

This is a Sprint 1 demonstration setup, not GlobalData's final infrastructure. `bitbucket-pipelines.yml` in the repo root shows the equivalent Bitbucket Pipelines config — same `pnpm`/`turbo` commands, different CI wrapper — for the planned Sprint 2 migration to GlobalData's own Bitbucket + hosting. That migration is expected to be low effort: no dependency on GitHub-specific tooling, no tech debt tying the codebase to this setup.

## Notes

- The workspace uses `pnpm` and `turbo`.
- The repository expects Node `>= 22.13.0`.
- Global Storybook UI configuration lives in `apps/storybook/.storybook/`.
- The Storybook app is documentation infrastructure, not part of the published UI library surface.
