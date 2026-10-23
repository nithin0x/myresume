# nithin0x

Portfolio of Nithin Kumar M, cybersecurity analyst and penetration tester.

Built with Next.js and Tailwind CSS. Published to portfolio.nithin0x.space through GitHub Pages.

## Local development

Use Node.js 22, matching CI, and install the locked dependencies:

    npm ci
    npm run dev

## Checks

    npx tsc --noEmit
    npm run build

The production build exports the site to `out/` for GitHub Pages.

Pull requests to `main` run the production build without deploying. Pushes to `main` and manual runs on `main` build and deploy the exported site. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**, not branch-based publishing.

Tailwind stays on version 3 because the stylesheet and PostCSS plugin configuration use its version 3 API.

## Design

The visual system lives in `src/app/globals.css`: warm paper, charcoal, and one orange accent for interactive elements. Layout spacing follows an 8px scale. Bricolage Grotesque headings and Instrument Sans body text load through `next/font/google`.

Profile links and certifications live in `src/data/profile.ts`. Credential links added from the public LinkedIn listing are included there; the existing employment dates are unchanged because the listing and repo disagree.

Content sections render on the server. Only navigation needs client-side JavaScript. The site supports keyboard navigation and reduced motion.
