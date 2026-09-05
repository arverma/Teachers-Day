# Still With Me

A quiet, configuration-driven collection of thank-yous for teachers and mentors whose lessons stayed. Every recipient gets a real static page at `/thankyou/<slug>/`; the root page never exposes a recipient directory.

Built with Astro and TypeScript for fast, server-free hosting on Cloudflare Pages at `mentor.arverma.dev`.

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
2. Find the `QUICK EDIT AREA` at the top of the file.
3. Copy one mentor entry and choose the closest `kind`.
4. Give it a unique lowercase, hyphenated `slug` and enter the person's `name`.
5. Optionally add a `note` array when you want to replace the prefilled note.
6. Run `pnpm build:cloudflare`.
7. Commit and push. Cloudflare deploys `main` to production and other branches as previews.

For example:

```ts
{
  slug: "person-name",
  name: "Person Name",
  kind: "engineering-professor",
  note: ["One personal memory.", "A short thank-you."],
}
```

Available kinds are `school-teacher`, `engineering-professor`, `engineering-admin`, `mba-faculty`, `sigmoid-senior`, `flipkart-senior`, and `quillbot-senior`. Use `engineering-admin` for people connected to your engineering journey who were not professors. Add multiple entries with the same company kind when several seniors mentored you there. Each kind supplies CV-based journey chapters, institutions, dates, introductory copy, Then → Now, and a default note. The shared journey, occasion, author, footer, privacy defaults, and universal copy live in `src/data/site.ts`.

The quick-edit area includes your current recipients and placeholders, including:

- a school teacher (`khalid-kareem-khan`)
- an engineering professor (`dr-nagesh-ch`)
- two engineering administrators (`mr-chingangbam-collin-singh` and `salam-monorama-devi`)
- an MBA faculty member (`dr-kavya-sen`)
- a senior from Sigmoid (`sigmoid-senior`)
- a senior from Flipkart (`flipkart-senior`)
- a senior from QuillBot (`quillbot-senior`)

Dr. Nagesh Ch reflects an existing user edit. The remaining names are placeholders and must be replaced before their URLs are shared. Never add contact details or content you would not be comfortable placing on a technically public URL.

Advanced preset copy and optional sections remain in the same file below the quick-edit area. The data validator rejects duplicate or invalid slugs, unknown journey stages, missing core note content, and enabled easter eggs with no lines.

## Deploying to Cloudflare Pages

This repository is prepared for Cloudflare Pages Git integration. It intentionally has no deployment token, Cloudflare adapter, Worker, or GitHub deployment workflow: the generated `dist/` directory is a complete static site.

### 1. Connect the repository

1. Push this repository to GitHub.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Import an existing Git repository**.
3. Authorize GitHub and select this repository.
4. Use these build settings:

| Setting | Value |
|---|---|
| Project name | `still-with-me` (or another available name) |
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `pnpm build:cloudflare` |
| Build output directory | `dist` |
| Root directory | Repository root (leave blank) |

The repository pins Node.js in `.node-version`. Under **Settings → Environment variables**, add `PNPM_VERSION` with the value `11.19.0` for both production and preview builds so Cloudflare uses the same package-manager version as local development.

After **Save and Deploy**, Cloudflare creates a temporary `*.pages.dev` address. Every push to `main` becomes a production deployment; other branches and pull requests receive isolated preview deployments.

### 2. Connect `mentor.arverma.dev`

1. Open the new Pages project.
2. Choose **Custom domains → Set up a domain**.
3. Enter `mentor.arverma.dev` and continue.

If `arverma.dev` already uses Cloudflare DNS, Cloudflare can create the DNS record automatically. Otherwise, first associate the domain in the Pages dashboard and then create a CNAME at the current DNS provider pointing `mentor` to the generated `<project>.pages.dev` hostname. Do not create the CNAME before associating the custom domain in Pages.

The production origin is already configured in `astro.config.mjs` and `src/data/site.ts`, so canonical and Open Graph URLs resolve to `https://mentor.arverma.dev`.

### 3. Verify and roll back

After the first deployment, check `/`, every configured `/thankyou/<slug>/` route, and an unknown route. Cloudflare Pages recognizes the generated top-level `404.html` automatically.

If a release is wrong, open the project's **Deployments** list, select the last known-good production deployment, and choose **Rollback**. Cloudflare keeps previous deployments available for this purpose.

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
public/               Favicon and Cloudflare response headers
```

## Design behavior

- mobile-first vertical journey; horizontal journey on wider screens
- system light/dark theme with a small persisted override
- viewport reveals that fully disable under `prefers-reduced-motion`
- no external fonts, images, client framework, or motion library
- semantic headings, visible focus states, and comfortable touch targets
