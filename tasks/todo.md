# Still With Me — Tasks

## Task 1: Project foundation

- [x] Astro static output, TypeScript, and test commands are configured.
- [x] Standard generated and secret files are ignored.
- Verify: `npm test`, `npm run check`, `npm run build`.
- Dependencies: None.

## Task 2: Content model

- [x] Global copy and all person-specific content live in typed data files.
- [x] Four fictional category/stage examples are included.
- [x] Invalid or duplicate configuration fails validation.
- Verify: focused data-model tests.
- Dependencies: Task 1.

## Task 3: Static routes

- [x] Root is generic and does not list names.
- [x] One route is generated for every configured person.
- [x] Unknown routes receive a graceful `404.html`.
- Verify: build output inspection and local preview.
- Dependencies: Task 2.

## Checkpoint: Foundation

- [x] Tests pass and generated route inventory is correct.

## Task 4: Personalized experience

- [x] Every requested narrative section is represented by a focused Astro component.
- [x] Optional sections vanish without empty markup or spacing.
- [x] Journey supports one or many stages/chapters.
- Verify: sample routes in the browser.
- Dependencies: Task 3.

## Task 5: Visual system and interaction

- [x] Responsive editorial styling works from 320px through desktop.
- [x] Theme toggle is accessible and persists preference.
- [x] Reveals disable under reduced motion.
- Verify: mobile/desktop screenshots, keyboard, theme, and motion checks.
- Dependencies: Task 4.

## Task 6: Metadata and privacy

- [x] Recipient metadata is personalized without leaking note contents.
- [x] `noindex, nofollow`, canonical URLs, theme colors, and favicon are present.
- Verify: built HTML inspection.
- Dependencies: Task 3.

## Checkpoint: Experience

- [x] Sample pages are polished and error-free in browser QA.

## Task 7: Deployment and documentation

- [x] Cloudflare Pages build settings deploy static output from `main` through Git integration.
- [x] `mentor.arverma.dev` is configured as the canonical production domain.
- [x] README documents adding recipients and local/production workflows.
- Verify: Cloudflare settings and README inspection.
- Dependencies: Tasks 3 and 6.

## Task 8: Final verification

- [x] Unit tests, type checks, and production build pass.
- [x] Known and unknown routes, themes, breakpoints, console, optional fields, privacy, and no-directory behavior are verified.
- [x] Five-axis code review has no blocking findings.
- Verify: full automated and browser QA.
- Dependencies: All earlier tasks.

## Checkpoint: Complete

- [x] All supplied acceptance criteria are met.
