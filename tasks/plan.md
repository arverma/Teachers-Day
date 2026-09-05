# Implementation Plan: Still With Me

## Overview

Build a configuration-driven Astro microsite that statically generates one private-by-default appreciation page per recipient, without exposing a recipient directory.

## Architecture Decisions

- Astro static output with one generated `/thankyou/<slug>/index.html` page per person.
- Typed site and recipient data, backed by a small runtime validator that fails builds on unsafe or malformed configuration.
- Plain Astro components and CSS; client JavaScript is limited to theme persistence and viewport reveals.
- A mobile-first vertical journey becomes horizontal on wider screens.

## Task List

### Phase 1: Foundation

- Task 1: Establish Astro, TypeScript, testing, and static-host configuration.
- Task 2: Define and validate the global and per-person content model with four fictional examples.
- Task 3: Generate the root, recipient, and 404 routes.

### Checkpoint: Foundation

- Unit tests pass and every configured recipient builds to a static route.

### Phase 2: Experience

- Task 4: Build the personalized narrative components and responsive journey.
- Task 5: Add the editorial visual system, accessible dark mode, and reduced-motion-safe reveals.
- Task 6: Add private metadata, favicon, and optional-section behavior.

### Checkpoint: Experience

- All sample pages render correctly at mobile and desktop widths in both themes.

### Phase 3: Ship

- Task 7: Add GitHub Pages deployment, CNAME, and editing/development documentation.
- Task 8: Run tests, type checks, production build, browser QA, and final code review.

### Checkpoint: Complete

- All acceptance criteria in the supplied build brief are verified, with no console errors or recipient index.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| GitHub Pages route refreshes | High | Emit directory-style static routes and a root `404.html`. |
| Invalid content creates broken pages | High | Validate slugs, stage references, uniqueness, and required copy during import/build. |
| Timeline becomes cramped | Medium | Switch from a vertical mobile track to a horizontal desktop track at 48rem. |
| Motion or theme script harms UX | Medium | Respect reduced motion, use system theme by default, and keep scripts dependency-free. |

## Open Questions

- Replace `yourdomain.com` before publishing.

