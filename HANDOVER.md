# Session handover — GlobalData UI Components

This repo is a working copy of `178604-global-data-ui-components`, moved to a fresh repository under the `shoreditchdesign` GitHub account so Phase 5 (CI + Vercel preview deploy) can be built without needing org-admin permission on the original repo (owned by `midnightagency`).

Original repo remote: `git@github-shoreditchdesign:midnightagency/178604-global-data-ui-components.git`, still intact, untouched, not force-pushed or altered by this move. This is a copy, not a migration of the original.

## What's been done this session

**Verified Sprint 1 phases 1–4 against `Sprint 1 - Front-End Foundations.pdf`** (in `docs/sprint-1/`). All four confirmed complete against actual commits and repo state. Phase 5 (CI wired to PRs + preview deployment) was not started — that gap is why this repo move happened.

**Closed both open items from `Sprint 1 - Recommendations.docx`** (also in `docs/sprint-1/`, converted to PDF):
1. Stylelint enforcement for the CSS Modules decision — `packages/config/stylelint.config.js`, blocks hard-coded color/spacing values, forces `var(--token)`. Deliberately does NOT extend `stylelint-config-standard` (pulled in ~150 unrelated rules that fought the codebase's camelCase CSS Modules convention — extended once, then removed).
2. Playwright visual regression, alongside Chromatic (not replacing it) — `apps/storybook/playwright-visual.config.ts` + `apps/storybook/tests/visual.spec.ts`. Screenshots every Storybook story via its `index.json`, diffs against committed baselines in `apps/storybook/tests/visual.spec.ts-snapshots/`.

**Built a second component, `Switch`** (`packages/ui/src/Switch/`) on `@base-ui/react/switch` (note: package renamed from `@base-ui-components/react`, which is deprecated — use `@base-ui/react`). Proves CSS Modules + Base UI works exactly like Tailwind + shadcn, minus Tailwind. Styled via Base UI's `data-checked`/`data-disabled` attribute hooks.

**Rebrand: purple → `#0034EC` flat blue + Poppins.** Token-only change in `packages/design-tokens/src/tokens.css`, since `Button.module.css` was already fully token-driven. Verified against a client-supplied screenshot. `Switch`'s "on" color derives from the same token, so it updated automatically.

**Built two client-facing deliverables**, both gitignored (see `.gitignore`, `docs/sprint-1/`):
- `docs/sprint-1/Sprint 1 - Walkthrough.md` — client-facing walkthrough doc, copy-paste commands throughout, includes a specific "walking the client through Storybook" section (what to click, in what order, what's visually compelling to show).
- `docs/sprint-1/Sprint 1 - Slides.html` — slide deck built on `template/index.html`'s exact system (same CSS tokens and components: stack, compare, targets+measures, pending tag, cover/close). Open directly in a browser; arrow keys navigate, `?slide=N` deep-links, `@media print` exports to PDF. Real Shore—Ditch Design logo wired in from `template/logo.svg`, `currentColor` so it flips light/dark automatically.

## Known gotchas hit and fixed (don't re-discover these)

- **`serve` breaks Storybook's preview bootstrap.** It auto-redirects `/iframe.html` → `/iframe` (clean-URLs), which silently stalls every story on the loading skeleton with zero console errors. Use `http-server` instead (already the setup here) — it doesn't rewrite paths.
- **Playwright's bare `--update-snapshots` only fills in missing baselines**, it does not overwrite existing mismatched ones. Need `--update-snapshots=all` to force a real refresh, or delete the snapshot directory first.
- **Playwright baselines are platform-tagged** (`-darwin.png` here, built on macOS). Linux CI will need one `--update-snapshots=all` run to establish `-linux.png` baselines. Expected behavior, not a bug.
- **`git checkout -- <file>` reverts to the last commit, not the last edit.** Nothing in this repo is committed yet as of the move — check `git log` before assuming a `git checkout` is safe against any file.

## Why this repo exists — Phase 5 / Vercel

Plan for Phase 5: a GitHub Actions job (`pnpm lint && pnpm typecheck && pnpm test && pnpm build` on every PR) plus a Vercel preview deployment of `apps/storybook`, in Shoreditch's own environment, per the planning document's own fallback plan (used until GlobalData supplies real infrastructure detail, or if the actual target turns out to be Bitbucket).

Blocker on the original repo: it's owned by `midnightagency`, and linking a personal Vercel account to it needs org-level GitHub App approval, not just collaborator access. This repo, under `shoreditchdesign`, avoids that.

## Current state (Sprint 1 demonstration setup)

- **Repo host:** GitHub (`shoreditchdesign/globaldata`).
- **CI:** `.github/workflows/ci.yml` — lint/typecheck/test/build on every PR and on `main`.
- **Deploy:** Vercel, connected directly to this GitHub repo (native git integration), auto-deploys `apps/storybook` on every push. Output Directory set to `storybook-static` in Vercel project settings.

This is deliberately a Shoreditch-owned demonstration environment — it proves the Storybook setup, CI gate, and deploy pipeline all work end-to-end. It is not GlobalData's final infrastructure.

## Planned Sprint 2 migration — Bitbucket + GlobalData infra

`bitbucket-pipelines.yml` (repo root) is a working, ready-to-use equivalent of `ci.yml` for Bitbucket Pipelines: same `pnpm`/`turbo` commands (`pnpm lint && pnpm typecheck && pnpm test && pnpm build`), CLI-token deploy to Vercel (`VERCEL_TOKEN`/`VERCEL_ORG_ID`/`VERCEL_PROJECT_ID`) instead of Vercel's GitHub App integration.

This exists to demonstrate the migration is low effort, not to imply it's already done:
- Nothing in the codebase is GitHub-specific — no tech debt tying the project to this host.
- Migration is a repo mirror (GitHub → Bitbucket) + one new CI-wrapper yml file + reconnecting the deploy target (Vercel token method, or GlobalData's own hosting if that's the actual target) — commands and build config carry over unchanged.

## Next steps in this repo

1. ~~`pnpm install`, then `pnpm lint && pnpm typecheck && pnpm test && pnpm build` to confirm the copy is intact and green.~~ Done — CI now runs this on every PR.
2. ~~Create a Vercel project linked to this repo.~~ Done — connected via GitHub, auto-deploying.
3. ~~Add `.github/workflows/ci.yml`.~~ Done.
4. Once GlobalData's actual deployment target is known (their infra, or Bitbucket), port `bitbucket-pipelines.yml` (or the real equivalent) over for real — this file is currently a demonstration artifact, not wired to a live Bitbucket repo.

## Repo structure reference

Doc conventions, phase mapping, commit-to-phase mapping, and full technical detail on every decision above are in `docs/sprint-1/Sprint 1 - Walkthrough.md` — read that before re-deriving anything from scratch.
