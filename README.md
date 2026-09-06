# Still With Me

A configuration-driven thank-you site for the teachers and mentors whose lessons stayed with you. It includes an initials-only mentor constellation and a dedicated static page for every recipient at `/thankyou/<slug>/`.

Built with Astro and TypeScript. The result is a fast, server-free static site that can be deployed to Cloudflare Pages, Netlify, Vercel, GitHub Pages, or any static host.

## Make it yours

### 1. Fork and run the project

Fork this repository on GitHub, clone your fork, then install Node.js 22.12 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Astro.

### 2. Add your recipients

Open `src/data/people.ts` and edit the `QUICK EDIT AREA`. Each entry needs:

- a unique lowercase, hyphenated `slug`
- the recipient's display `name`
- the closest available `kind`
- an optional personal `note` array

```ts
{
  slug: "your-mentor",
  name: "Your Mentor",
  kind: "engineering-professor",
  note: [
    "A personal memory you share.",
    "What their guidance still means to you.",
  ],
}
```

The `kind` supplies a reusable journey, relationship label, introductory copy, Then → Now section, and default note. Available kinds are:

- `school-teacher`
- `engineering-professor`
- `engineering-admin`
- `mba-faculty`
- `sigmoid-senior`
- `flipkart-senior`
- `quillbot-senior`

Edit or replace the presets below the quick-edit area to match your own schools, workplaces, memories, and voice. The landing-page group titles and descriptions live in `mentorGroupDefinitions` in the same file.

### 3. Personalize the site

Open `src/data/site.ts` to change the site title, subtitle, author, occasion, domain, metadata, journey stages, and shared closing message. Replace the profile image in `public/images/` and update its path and alt text in the same configuration file.

Search the repository for the original domain and project name before deploying so canonical links and metadata point to your site.

### 4. Check your version

```bash
pnpm test
pnpm check
pnpm build
pnpm preview
```

The production site is generated in `dist/`. Check the landing page, every recipient link, and an unknown route before publishing.

## Deploy

Use these settings with any static hosting provider that supports Astro:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `pnpm build:cloudflare` |
| Output directory | `dist` |
| Root directory | Repository root |
| Node.js | 22.12 or newer |
| pnpm | 11.19.0 |

For Cloudflare Pages, import the fork from **Workers & Pages → Create application → Pages → Import an existing Git repository**, enter the settings above, and connect your custom domain after the first deployment succeeds.

## Privacy

Recipient pages use `noindex, nofollow` by default. This discourages search indexing, but it does not make a URL private or access-controlled. Only publish notes and personal details you are comfortable placing on a technically public page.

There is no analytics, tracking, database, API, or runtime server.

## Project structure

```text
src/
├── components/       Narrative sections shared by recipient pages
├── data/             Site settings, recipients, presets, and validation
├── layouts/          Metadata, theme, and shared document shell
├── pages/            Landing page, recipient routes, and 404 page
└── styles/           Responsive editorial visual system
public/               Images, favicon, and hosting headers
```

## Design behavior

- single-screen, initials-only mentor network on the landing page
- independent clusters with subtle, reduced-motion-aware star-like movement
- one statically generated thank-you page per recipient
- system light/dark theme with a persisted override
- motion disabled when `prefers-reduced-motion` is enabled
- semantic headings, visible focus states, and comfortable touch targets
- no external fonts, client framework, or animation library
