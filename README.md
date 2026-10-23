# nithin0x

Portfolio of Nithin Kumar M, cybersecurity analyst and penetration tester.

Built with Next.js and Tailwind CSS. Published to portfolio.nithin0x.space through GitHub Pages.

## Local development

Use Node.js 22.18 or newer in the 22.x series, matching CI, and install the locked dependencies:

    npm ci
    npm run dev

## Checks

    npm run lint
    npm run build
    npm run typecheck
    npm run check:export

The production build generates `public/social.png` from the profile data, then exports the site to `out/` for GitHub Pages. The image generator uses the existing Next.js image renderer and Node.js TypeScript support.

To preview the exported site, run `python3 -m http.server 4174 --directory out` and open `http://localhost:4174`. The `next start` command requires a server build and does not serve this static export.

Pull requests to `main` run lint, the production build, and static export checks without deploying. Pushes to `main` and manual runs on `main` build and deploy the exported site. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**, not branch-based publishing.

Tailwind stays on version 3 because the stylesheet and PostCSS plugin configuration use its version 3 API.

## Design

The visual system lives in `src/app/globals.css`: warm paper, charcoal, and one orange accent for interactive elements. Bricolage Grotesque headings and Instrument Sans body text load through `next/font/google`.

Profile details, metadata copy, links, and certifications live in `src/data/profile.ts`. Career records, projects, and skill categories live alongside it in `src/data/`. Credential links added from the public LinkedIn listing are included there; the existing employment dates are unchanged because the listing and repo disagree.

Content sections render on the server. Only navigation needs client-side JavaScript. The site supports keyboard navigation and reduced motion.

## SEO and validation

The homepage has a canonical URL and linked Person/ProfilePage JSON-LD. `robots.ts` and `sitemap.ts` generate static files during the build. Social previews use a static PNG; the favicon is served from `public/`.

`npm run check:export` checks the exported HTML, fragment links, local assets, structured data references, crawler files, social image, and 404 indexability. ESLint uses the Next.js accessibility and Core Web Vitals rules.

See [the optimization audit](docs/portfolio-audit.md) for the editorial review, browser checks, measurements, and hosting limitation.

The [Scrimba-inspired design update](docs/scrimba-design-update.md) documents the sidebar layout, LinkedIn-sourced additions, and verified AZ-104 credential.
