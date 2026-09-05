# Still With Me

A quiet, configuration-driven collection of thank-yous for teachers and mentors whose lessons stayed. Every recipient gets a real static page at `/thankyou/<slug>/`; the root page never exposes a recipient directory.

Built with Astro and TypeScript for fast, server-free hosting on GitHub Pages.

## Local development

Requires Node.js 22.12 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Astro, then visit a sample route such as:

```text
http://localhost:4321/thankyou/meera-maam/
```

## Production checks

```bash
pnpm test
pnpm check
pnpm build
pnpm preview
```

The static site is written to `dist/`. No server, database, API, analytics, or runtime rendering is required.

## Adding a person

1. Open `src/data/people.ts`.
2. Copy one existing entry.
3. Give it a unique lowercase, hyphenated `slug`.
4. Change the name, relationship, and stage or stages.
5. Write the `whatStayed` text and personal `note`.
6. Add timeline `chapters`, Then → Now, or an easter egg if they fit the story.
7. Run `pnpm test && pnpm build`.
8. Commit and push. A push to `main` deploys automatically.

All meaningful recipient copy lives in that one data file. The shared journey, occasion, author, footer, privacy defaults, and universal copy live in `src/data/site.ts`.

Four fictional examples are included:

- a school teacher (`meera-maam`)
- an engineering professor (`professor-iyer`)
- an MBA faculty member (`dr-kavya-sen`)
- a career mentor spanning several chapters (`arjun-mentor`)

Remove or rewrite the examples before publishing. Never add contact details or content you would not be comfortable placing on a technically public URL.

### Optional sections

- Omit `pathsCrossed` to hide it.
- Set `thenNow.enabled` to `false` or omit `thenNow` to hide it.
- Set `easterEgg.enabled` to `false` or omit `easterEgg` to hide it.
- Omit an individual optional field such as `period`, `organization`, or `description` without leaving empty layout space.

The data validator rejects duplicate/invalid slugs, unknown journey stages, missing core note content, and enabled easter eggs with no lines.

## Custom domain and GitHub Pages

Before publishing, replace `yourdomain.com` in both:

- `astro.config.mjs`
- `public/CNAME`

Also set the matching `siteUrl` in `src/data/site.ts` so canonical metadata uses the correct origin. Do not add an Astro `base` when using a custom domain.

In the GitHub repository, open **Settings → Pages** and choose **GitHub Actions** as the source. Configure the domain and DNS in GitHub and with your DNS provider; the CNAME file alone does not configure DNS.

The workflow in `.github/workflows/deploy.yml` runs on every push to `main` and can also be started manually.

## Privacy and metadata

Personalized routes include `noindex, nofollow` by default. This discourages search indexing but does not make a page private or access-controlled. Set `siteConfig.privacy.noIndex` to `false` only if indexing is intentional.

Shared metadata includes the recipient's display name and a generic description; it never includes the personal note body. There is no analytics or tracking code.

## Project structure

```text
src/
├── components/       Narrative sections and timeline
├── data/             Global settings, recipients, types, validation
├── layouts/          Metadata, theme, and shared document shell
├── pages/            Root, static recipient routes, and 404
└── styles/           Editorial responsive visual system
public/               Favicon and custom-domain CNAME
```

## Design behavior

- mobile-first vertical journey; horizontal journey on wider screens
- system light/dark theme with a small persisted override
- viewport reveals that fully disable under `prefers-reduced-motion`
- no external fonts, images, client framework, or motion library
- semantic headings, visible focus states, and comfortable touch targets
