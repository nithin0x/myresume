# Design and content update

## References and design

Inspected [Scrimba](https://scrimba.com/) in Chromium on 2026-10-24. Adapted its persistent desktop navigation, compact introduction, selected navigation treatment, and small catalog of content. The portfolio keeps its warm background, orange accent, existing typefaces, and open career/skills sections. A restrained lavender panel contains an actual lab note. No Scrimba branding, illustrations, marketing copy, or course assets were copied.

The sidebar appears at 1200px and above. Tablet uses the horizontal navigation; mobile uses the existing keyboard-accessible disclosure menu. The no-JavaScript fallback remains available at all sizes. The existing SEO implementation and static deployment workflow are unchanged.

## Content sources and preservation

Compared the current content against commit `a413d0b`, before the initial optimization. Retained both employment records, original employment dates, both degrees and GPAs, all seven certifications, every named technical tool/framework, all three technical projects, and SC-500 study status. Restored the explicit mentoring description from the former community project. The uptime/years counters, duplicate certification lists, and repeated project metadata remain removed.

Consulted the publicly indexed LinkedIn profiles at [cybernithin](https://in.linkedin.com/in/cybernithin) and [nithin0x](https://in.linkedin.com/in/nithin0x), which share the portfolio/blog URLs, employer, and education. Direct browser access to LinkedIn hit its authentication wall. Additions are limited to information visible in those public listings:

- Coimbatore location; English, Tamil, and Malayalam proficiency.
- TryHackMe, Pwned Labs, HackingHub, and HackSmarter Labs practice, alongside the original HTB, PortSwigger, and Vulnlab entries.
- Debian/i3 customization and study interests in cloud, AI, systems engineering, and security.
- A short P.O.O. lab note from the user's authored LinkedIn post. This is explicitly Hack The Box lab work; it is not presented as client work or a production incident. The link goes to the LinkedIn profile/posts, not an invented article URL.
- CRTP's full name and May 2026 issue month, and Azure Fundamentals' full name and August 2026 issue month.

Verified the user-provided [Microsoft Azure Administrator Associate credential](https://learn.microsoft.com/en-us/users/nithin0x/credentials/421ba67c5874fa2a?ref=https%3A%2F%2Fwww.linkedin.com%2F) directly in Chromium. The page names Nithin Kumar, credential `421BA67C5874FA2A`, earned October 17, 2026, expiring October 18, 2027. Added the exact provided URL, full title with AZ-104, issue month, and expiration date. CWES remains as supplied in the original portfolio, without an invented verification link.

LinkedIn's general HTB Pro Labs listing is represented through lab practice, not an additional professional certification. Reposts, liked posts, follower counts, and unrelated search results were not treated as the user's achievements. Employment dates were not changed because the accessible LinkedIn view does not reliably expose them.

Continued the previously loaded and upstream-verified `blader/humanizer` workflow: checked new prose for writing patterns, rewrote it in the existing voice, compared each claim with the source, and reviewed the final copy again. No outcomes or credentials were invented.

## Changed files

- `src/app/globals.css`: navigation layouts, compact hero, project catalog, credential rows, responsive styles.
- `src/components/Hero.tsx`, `Nav.tsx`, `Projects.tsx`: layout and navigation changes.
- `src/components/About.tsx`, `Certifications.tsx`: supported profile additions and credential expiration display.
- `src/data/profile.ts`, `projects.ts`: shared content and exact credential link.
- `public/social.png`: regenerated with the updated location.

## Validation

Production static build, ESLint, TypeScript, static export checks, and whitespace checks passed. Browser and Lighthouse results for this revision are saved alongside this report in `scrimba-validation.json`. Measurements from the previous optimization report apply to that earlier revision.


Reviewed screenshots and checked 320, 390, 640, 768, 1024, 1199, 1200, 1440, and 1920px widths. No horizontal overflow, sidebar overlap, uncaught JavaScript errors, or axe WCAG A/AA violations. Keyboard menu behavior, reduced motion, and no-JavaScript navigation passed. The exported AZ-104 link exactly matches the user-provided URL.

Local Lighthouse: 98 mobile / 100 desktop performance; accessibility, best practices, and SEO were 100 on both. CLS was zero. The immediate previous revision scored 98 / 100 in the same comparison. Results are single-run lab measurements from a gzip-served static export, not live-site Core Web Vitals. No performance gain is claimed.

No new dependencies were added. The build retains its pre-existing Next.js warning about React 18 deprecation. No deployment, production performance measurement, manual screen-reader audit, or Safari/Firefox check was performed.

A short-window check caught the sidebar email link extending beyond the viewport. The sidebar now sizes its content naturally and scrolls. Focused-link visibility passed at 1440 × 480 desktop and 740 × 360 mobile landscape sizes after the fix.
