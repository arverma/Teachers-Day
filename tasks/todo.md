# Still With Me — Tasks

## Task 1: Project foundation

- [ ] Astro static output, TypeScript, and test commands are configured.
- [ ] Standard generated and secret files are ignored.
- Verify: `npm test`, `npm run check`, `npm run build`.
- Dependencies: None.

## Task 2: Content model

- [ ] Global copy and all person-specific content live in typed data files.
- [ ] Four fictional category/stage examples are included.
- [ ] Invalid or duplicate configuration fails validation.
- Verify: focused data-model tests.
- Dependencies: Task 1.

## Task 3: Static routes

- [ ] Root is generic and does not list names.
- [ ] One route is generated for every configured person.
- [ ] Unknown routes receive a graceful `404.html`.
- Verify: build output inspection and local preview.
- Dependencies: Task 2.

## Checkpoint: Foundation

- [ ] Tests pass and generated route inventory is correct.

## Task 4: Personalized experience

- [ ] Every requested narrative section is represented by a focused Astro component.
- [ ] Optional sections vanish without empty markup or spacing.
- [ ] Journey supports one or many stages/chapters.
- Verify: sample routes in the browser.
- Dependencies: Task 3.

## Task 5: Visual system and interaction

- [ ] Responsive editorial styling works from 320px through desktop.
- [ ] Theme toggle is accessible and persists preference.
- [ ] Reveals disable under reduced motion.
- Verify: mobile/desktop screenshots, keyboard, theme, and motion checks.
- Dependencies: Task 4.

## Task 6: Metadata and privacy

- [ ] Recipient metadata is personalized without leaking note contents.
- [ ] `noindex, nofollow`, canonical URLs, theme colors, and favicon are present.
- Verify: built HTML inspection.
- Dependencies: Task 3.

## Checkpoint: Experience

- [ ] Sample pages are polished and error-free in browser QA.

## Task 7: Deployment and documentation

- [ ] GitHub Pages action deploys static output on pushes to `main`.
- [ ] CNAME placeholder is included.
- [ ] README documents adding recipients and local/production workflows.
- Verify: workflow and README inspection.
- Dependencies: Tasks 3 and 6.

## Task 8: Final verification

- [ ] Unit tests, type checks, and production build pass.
- [ ] Known and unknown routes, themes, breakpoints, console, optional fields, privacy, and no-directory behavior are verified.
- [ ] Five-axis code review has no blocking findings.
- Verify: full automated and browser QA.
- Dependencies: All earlier tasks.

## Checkpoint: Complete

- [ ] All supplied acceptance criteria are met.
