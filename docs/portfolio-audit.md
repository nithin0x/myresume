# Portfolio optimization audit

Reviewed on 2026-10-24. Changes refine the existing Next.js static portfolio and retain its paper, charcoal, orange, Bricolage Grotesque, and Instrument Sans design.

## Humanizer review

Loaded and read the complete installed `.agents/skills/humanizer/SKILL.md` (version 3.1.0). Downloaded the upstream `blader/humanizer` file and compared it with `cmp`; both SHA-256 hashes were `0612f1dfb1672b0ea9b97e139bf1f06cabe98d8b27424fe8ff01e1fb4cc99cad`.

Applied the skill in file mode to hero, About, career descriptions, skills, projects, credentials, navigation, contact, footer, and metadata prose. Editorial changes were restricted to text; code and SEO implementation were handled separately.

The first pass identified slogan headings, repeated credentials, descriptive fragments, and repetitive project tags. Rewrites were compared with the original source before saving. Examples:

| Original | Final | Reason |
| --- | --- | --- |
| Security work, from both sides. | About | Replace the slogan with a useful heading. |
| Tools, labs & field notes. | Selected projects | Name the section directly. |
| The working toolkit. | Technical skills | Use a clear section heading. |
| Let's talk security. | Contact | Make the destination explicit. |
| Environment hardening ... automated via PowerShell and Bash | Harden AWS, Azure, and M365 ... Automate configuration changes with PowerShell and Bash. | Use active verbs while retaining systems, standards, and languages. |

The second pass reviewed all rendered copy against the original and scanned for contrasts, dramatic closers, forced triads, inflated claims, dashes, and decorative labels. Technical lists with three distinct entries were retained. No new achievements, credentials, dates, metrics, or project outcomes were added.

Both jobs, both degrees and GPAs, all seven certifications, credential dates and URLs, named tools and frameworks, and SC-500 study status remain. Existing employment dates were preserved. Full certificate names and month/year dates previously in the timeline were moved into the central certification records. CWES and AZ-104 still have no verification URL; none was invented.

## Content and implementation

- Reordered content: introduction, About, experience and education, projects, skills, certifications, contact.
- Removed the decorative lab illustration, years/certification/uptime counters, repeated hero credentials, duplicate certification timeline entries, redundant project tags/subtitles/metadata, and repeated contact details.
- Moved community participation into About instead of presenting it as a technical project. Kept all substantive project descriptions.
- Replaced filled project and contact cards with open rows. Reduced oversized secondary headings, spacing, and hover movement while preserving the existing colors and fonts.
- Added `src/data/experience.ts`, `projects.ts`, and `skills.ts`; expanded `profile.ts` as the shared source for identity, contact details, metadata, and credentials.
- Added `Certifications.tsx`; simplified the existing section components and removed obsolete CSS. Removed the navigation scroll listener used only for a background effect.
- Preserved the interactive mobile menu and added a no-JavaScript navigation fallback. Mobile section links move focus to their destination. Reduced motion disables smooth scrolling; focus indicators use contrasting colors.
- Retained existing runtime dependencies, which remain in use. Added only development lint tooling. Browser, axe, and Lighthouse tools were installed under `/tmp`, outside the project.

## SEO and static hosting

- Added the homepage canonical, shared title/description, Open Graph and Twitter metadata, and a 1200 × 630 PNG social preview with alt text.
- Added linked ProfilePage and Person JSON-LD on the homepage only. The 404 page remains noindex and does not inherit the person schema or homepage canonical.
- Added build-time `robots.txt` and `sitemap.xml`, with the homepage as the only indexable page. No artificial modification date was added.
- Fixed the favicon: `src/app/favicon.svg` did not produce the referenced asset. It now lives at `public/favicon.svg`.
- All content is present in exported HTML. No server runtime, API route, or image optimization service is required.
- Kept static export, trailing slashes, CNAME files, and the deployment workflow. Added lint and export validation to its build job.

## Validation

Passed ESLint with zero warnings, TypeScript, the production static build, `git diff --check`, and `npm run check:export`. The export check verifies single title/description/H1/canonical, unique IDs, internal anchor targets, local asset existence, section order, JSON-LD references, social metadata/image dimensions, crawler files, and 404 indexability.

Chromium checks at 320, 390, 768, 1024, and 1440 pixels found no horizontal overflow or uncaught JavaScript errors. Axe reported zero WCAG A/AA or best-practice violations at each width. Reviewed desktop, tablet, mobile, and social preview screenshots. Menu activation, Escape/focus return, link destination focus, reduced motion, and navigation with JavaScript disabled passed.

All eight unique external profile and credential links returned HTTP 200, including redirects. HTTP checks establish reachability, not credential ownership or completeness of third-party content. Email delivery was not tested.

| Local Lighthouse check | Before | After |
| --- | --- | --- |
| Mobile performance | 98 | 99 |
| Desktop performance | 100 | 100 |
| Mobile LCP | 2.4 s | 1.8 s |
| CLS, both viewports | 0 | 0 |
| Final accessibility / best practices / SEO | | 100 / 100 / 100 |

The HTML payload decreased from 73,059 to 54,507 bytes before compression (about 26%). Referenced CSS decreased from 17,349 to 12,929 bytes (about 25%). The final mobile run transferred 219 KiB, versus 223 KiB before. Next.js framework JavaScript remains the main Lighthouse unused-JavaScript finding; no runtime-stripping workaround was introduced.

Local Lighthouse results are recorded in `validation-results.json`. The comparison uses the pre-edit exported site and the final export on the same local server implementation with gzip and 600-second cache headers. Mobile uses Lighthouse's default simulated throttling; desktop uses its desktop configuration. These are single-run lab measurements, not field Core Web Vitals. The initial uncompressed-server trial was superseded because it did not model compressed static delivery. Real-user INP and production latency remain unmeasured.

## Hosting limitation

The live URL `https://portfolio.nithin0x.space/` returned HTTP 200 but served the repository README, not the portfolio. The repository already documents GitHub Actions as the required Pages source. Changes are local and have not been deployed; repository hosting settings were not changed. Publishing the exported site through the existing workflow and checking Pages' source is necessary before these improvements reach the live domain.

The build reports the existing React 18 deprecation warning from Next.js 16. A React major-version migration was outside this refinement. Automated accessibility checks do not replace assistive-technology testing; no manual screen-reader or Safari/Firefox audit was performed. JSON-LD was parsed and checked locally, without a hosted rich-results validation service.
