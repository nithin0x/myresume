# nithin0x

Portfolio of Nithin Kumar M, cybersecurity analyst and penetration tester.

Built with Next.js and Tailwind CSS. Published to portfolio.nithin0x.space through GitHub Pages.

## Local development

Use Node.js 22.18 or newer in the 22.x series, matching CI, and install the locked dependencies:

    npm ci
    npm run dev

## Checks

    npm run lint
    npm run test:sync
    npm run build
    npm run typecheck
    npm run check:export

The production build generates `public/social.png` from the profile data, then exports the site to `out/` for GitHub Pages. The image generator uses the existing Next.js image renderer and Node.js TypeScript support.

To preview the exported site, run `python3 -m http.server 4174 --directory out` and open `http://localhost:4174`. The `next start` command requires a server build and does not serve this static export.

Pull requests to `main` run lint, sync tests, the production build, TypeScript, and static export checks without deploying. Pushes to `main` and manual runs on `main` build and deploy the exported site. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**, not branch-based publishing.

Tailwind stays on version 3 because the stylesheet and PostCSS plugin configuration use its version 3 API.

## Design

The visual system lives in `src/app/globals.css`: warm paper, charcoal, and one orange accent for interactive elements. Bricolage Grotesque headings and Instrument Sans body text load through `next/font/google`.

Profile details, metadata copy, links, and certifications live in `src/data/profile.ts`. Career records, projects, and skill categories live alongside it in `src/data/`. Credential links added from the public LinkedIn listing are included there; the existing employment dates are unchanged because the listing and repo disagree.

Content is included in the static HTML. Navigation and the lab/LinkedIn tabs use client-side JavaScript. Both card panels and navigation remain available without JavaScript. The site supports keyboard navigation and reduced motion.

## LinkedIn card and synchronization

The card reads `src/data/linkedin-post.json` at build time. The included record is a manually saved lab note linking to the LinkedIn profile; its publication date is unknown. It is not a live feed.

To enable daily updates, configure the repository Actions secret `LINKEDIN_FEED_URL` with an endpoint you control that returns one JSON object for your latest authored post. LinkedIn profile pages, RSS/XML feeds, and raw LinkedIn API responses are not supported directly; use an adapter that returns this shape:

```json
{
  "title": "Your post title",
  "summary": "Your post text or excerpt",
  "publishedDate": "2026-10-24",
  "url": "https://www.linkedin.com/feed/update/urn:li:activity:123456789/",
  "tags": ["Cybersecurity"]
}
```

The URL above is an example; supply the real post URL. `title`, `summary`, `publishedDate` (a valid `YYYY-MM-DD` date), and a direct HTTPS LinkedIn post URL are required. `headline`, `text`, and `date` are accepted aliases. `tags` is optional and must be an array of strings. Optional `id`, `author`, and `handle` must be nonempty strings; identity fields default to this portfolio's author.

Run `npm run sync:linkedin` with `LINKEDIN_FEED_URL` set locally, then rebuild to preview the updated card. `LINKEDIN_API_URL` is accepted as a local environment-variable alias for the same JSON contract. Without an endpoint the saved file stays unchanged. Failed or invalid responses fail the command and preserve the file. Unchanged content does not refresh `lastSynced` or create daily commits; that timestamp records when changed content was last saved successfully.

The sync workflow runs at 06:00 UTC daily or manually on `main`. It validates changes before committing and explicitly requests the Pages deployment workflow afterward. It requires permission to push to `main` and dispatch Actions workflows. Branch rules must allow that bot commit. If the commit succeeds but the deployment request fails, run **Deploy to GitHub Pages** manually on `main`. No LinkedIn feed provider or credentials are bundled with this repo.

## SEO and validation

The homepage has a canonical URL and linked Person/ProfilePage JSON-LD. `robots.ts` and `sitemap.ts` generate static files during the build. Social previews use a static PNG; the favicon is served from `public/`.

`npm run check:export` checks the exported HTML, fragment links, local assets, structured data references, crawler files, social image, and 404 indexability. ESLint uses the Next.js accessibility and Core Web Vitals rules.

See [the optimization audit](docs/portfolio-audit.md) for the editorial review, browser checks, measurements, and hosting limitation.

The [Scrimba-inspired design update](docs/scrimba-design-update.md) documents the sidebar layout, LinkedIn-sourced additions, and verified AZ-104 credential.

The [continuation review](docs/reverification.md) records fixes and verification of the LinkedIn synchronization and card changes.
