# Deck template — design notes

Source: built for the GlobalData React vs Stencil decision deck (`globaldata/react-vs-stencil.html`). This folder strips that deck down to the reusable system, generic content only. Hand `index.html` + these notes to any repo that needs a client decision deck.

**Run locally:** open `index.html` in a browser. Slides render fullscreen, one at a time, at 1440×800. `@media print` breaks each slide to its own page for a PDF export.

---

## 1. What this is

A single self-contained HTML file: no build step, no dependencies beyond two Google/Fontshare font links. Copy it, edit the content and tokens, done. Designed to be pasted into Figma slide-by-slide for further polish, not to ship as a live web page.

## 2. Navigation

One slide visible at a time via `.slide.active { display:flex }`, everything else `display:none`.

- `?slide=N` query param controls which slide shows (1-indexed, clamped to the slide count).
- Left/Up arrow → previous slide, Right/Down arrow → next slide. Updates the URL via `history.replaceState` so the param stays shareable/deep-linkable.
- Slide count is read from the DOM (`document.querySelectorAll('.slide')`) — add or remove `<section class="slide ...">` blocks and navigation adjusts automatically, nothing to hardcode.
- Print ignores all of this: `@media print` forces every slide to `display:flex !important` and stacks them with `page-break-after`, so a PDF export still contains every slide regardless of nav state.

## 3. Colour

```
--coral   accent, numerals, negative marks, pending/status tags
--ink     dark-slide background, body text on light slides
--paper   light-slide background
--off     text colour on dark slides
```

These four tokens plus two rule/muted variants per theme are the entire palette. Set real hex values at the `:root` block, that's the only place they live. If you don't have exact brand hex yet, sample from a logo or template asset and flag it as provisional, don't invent values.

## 4. Type

- **Display font** (headings only: `h1`, `h2`, `.col-head`) — swap the Fontshare/Google Fonts `<link>` and the `--display` variable together.
- **Body font** (everything else) — swap the `--body` variable.
- Scale: h1 88px / h2 52px / col-head 30px / lede 19px / body-title 17px / body-text 16px / marks 15.5px / eyebrow 12px uppercase. Don't introduce new sizes, use these.
- Both fonts need to be installed locally (or substituted deliberately) before pasting into Figma, or Figma will silently swap them on paste. That's a check to do before handover, not something to fix in code.

## 5. Logo

Inline the client's logo as an SVG string in the `LOGO` constant, with every `fill`/`stroke` set to `currentColor`. That's what makes it flip automatically between light and dark slides without a second asset. If Figma paste fidelity is poor with an inlined SVG, fall back to two static SVGs (one per colourway) and swap based on slide theme, ask before doing this since it changes the injection mechanism.

## 6. Layout

- Slide: 1440×800, padding 64px top/bottom, 80px sides.
- Logo: absolute, top 40px, right 80px, 101×33.
- Standard header pattern: `h1`/`h2`, then a 1px `.rule`, then `.content` at 56px margin-top.
- Three slide themes: `.slide--light`, `.slide--dark`, `.slide--coral` (coral defined, included as an option for a section-divider slide if one is ever wanted, not used by default).

## 7. Components — reuse these, don't invent new patterns

| Component | Use for | Slides in the GlobalData deck |
|---|---|---|
| `.stack` | Numbered sequential points, coral numerals, title over body | Overview, case-for-X, workflow, recommendation |
| `.compare` | Two-column A-vs-B with in-favour/against marks | Short-term / long-term comparisons |
| `.targets` + `.measures` | Grid of evidence items plus a measures strip underneath | Benchmarking / evidence slides |
| `.footnote` | Bottom-anchored qualifier for the whole slide | Comparison slides |
| `.pending` | Coral-bordered status tag for a slide whose findings aren't in yet | Evidence slide, before the research lands |

If new content doesn't fit one of these, that's a signal to ask for a new component rather than bend the closest one or hand-roll something bespoke, keeps the deck internally consistent.

## 8. Output route

HTML → copy into Figma → refine there. Don't convert to PPTX, PDF or a React/JS app unless the brief specifically calls for it, the whole point of this template is a zero-build handoff.

## 9. Content register (carried over from GlobalData, applies generally)

- Declarative, specification-register prose. No passive constructions, no rationale essays, no filler, no AI-sounding phrasing (run a humanizer pass before final handover).
- Every claim traceable to a real source (call notes, strategy docs, a client-approved deck). Nothing invented, nothing assumed.
- No em dashes in body copy. Heading-separator dashes (e.g. "Short term — now to December") are a deliberate typographic convention, not prose, and are fine to keep.
- Confirm the shape of a structural change (new section, split slide, reordered flow) before making it. Confirm content edits inline, don't batch several assumed changes into one pass.
