# nithin0x

Personal portfolio of Nithin Kumar M, built with Next.js and Tailwind CSS.

[View the portfolio](https://portfolio.nithin0x.space/)

## Development

Use Node.js 22.18 or newer in the 22.x series.

```sh
npm ci
npm run dev
```

Profile and résumé content lives in `src/data/`. Styles live in `src/app/globals.css`.

The downloadable résumé is `public/Nithin-Kumar-M-Resume.pdf`. Replace that file when updating the PDF; the introduction and toolbar link to it.

The design uses warm paper, charcoal, and orange, with light and dark themes. Headings use Bricolage Grotesque and body text uses Instrument Sans.

## Build and deploy

```sh
npm run lint
npm run test:sync
npm run build
npm run typecheck
npm run check:export
```

The build exports the site to `out/`. Pushes to `main` deploy through GitHub Actions. Set the repository's **Settings → Pages → Source** to **GitHub Actions**.

After export, the build adds a Content Security Policy with hashes for the generated inline scripts. It also permits Cloudflare's unversioned and versioned Web Analytics beacon paths; the proxied beacon reports to the same-origin `/cdn-cgi/rum` endpoint. Email links use Cloudflare's `email_off` comments to prevent obfuscation and decoder injection. CI audits dependencies and uses commit-pinned GitHub Actions. Dependabot checks npm packages and Actions weekly.

GitHub Pages serves the policy through an HTML meta tag. Header-only controls such as HSTS and CSP `frame-ancestors` require a host or proxy that supports custom response headers.

To preview the export, run `python3 -m http.server 4174 --directory out` and visit `http://localhost:4174`.

## PageSpeed and Cloudflare caching

The single-page export uses Next.js `experimental.inlineCss` to remove the blocking stylesheet request. Fonts are self-hosted and preloaded by `next/font`. Inlining increases the HTML size and removes separate stylesheet caching; check desktop Lighthouse when changing styles or upgrading Next.js.

GitHub Pages does not apply Next.js `headers()` or Cloudflare Pages `_headers` files. Configure the asset cache lifetime in Cloudflare for the `nithin0x.space` zone:

1. Create a **Cache Rule** with this expression:
   ```text
   (http.host eq "portfolio.nithin0x.space" and starts_with(http.request.uri.path, "/_next/static/"))
   ```
2. Set **Browser Cache TTL** to **Override origin** with a TTL of **1 year** (31,536,000 seconds). Keep this rule after any broader matching cache rules.
3. Confirm an asset response sends `Cache-Control` with `max-age=31536000`. Only Next.js fingerprinted assets match this rule; HTML, the résumé, and other files keep their existing cache behavior.

See [Cloudflare's Browser Cache TTL settings](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#browser-ttl). This dashboard change is required separately from the GitHub Pages deployment.

After deployment, run PageSpeed Insights for `https://portfolio.nithin0x.space/` with the **desktop** strategy. Check the search label, CSP/console/Issues audits, stylesheet blocking, asset cache headers, and the existing passing audits. The unused JavaScript and legacy JavaScript findings currently identify precompiled Next.js/React runtime bundles; changing application imports or Browserslist does not remove those framework internals.

## Content updates

The **Sync portfolio content** workflow runs daily at 06:00 UTC and supports manual runs. Changed content is validated, committed, and deployed automatically.

Blog posts and write-ups are imported from [nithin0x/myblogsite](https://github.com/nithin0x/myblogsite). Publish Markdown or MDX files under `src/content/docs/write-ups/` or `src/content/docs/Blogs/` with `title` and `description` frontmatter. Drafts and index pages are skipped. Run `npm run sync:blog` to refresh the saved library locally.

For automatic LinkedIn updates, set the Actions secret `LINKEDIN_FEED_URL` to a JSON endpoint returning the latest post:

```json
{
  "title": "Post title",
  "summary": "Post text or excerpt",
  "publishedDate": "2026-10-24",
  "url": "https://www.linkedin.com/feed/update/urn:li:activity:123456789/",
  "tags": ["Cybersecurity"]
}
```

Use a real direct HTTPS LinkedIn post URL and a valid `YYYY-MM-DD` date. `tags` is optional. A LinkedIn profile URL, RSS feed, or raw LinkedIn API response cannot serve as this endpoint. Without a configured feed, the saved post stays unchanged.

The feed endpoint must use HTTPS and return JSON directly, without redirects. Responses are limited to 64 KiB; titles to 200 characters; summaries to 12,000; and tags to 20 entries of up to 60 characters. Blog imports limit frontmatter to 16 KiB, titles to 200 characters, and descriptions to 1,000.

To select a LinkedIn post manually, run **Sync portfolio content** with its URL, title, text, and publication date. For local updates, use `npm run set:linkedin` with `LINKEDIN_POST_URL`, `LINKEDIN_POST_TITLE`, `LINKEDIN_POST_TEXT`, and `LINKEDIN_POST_DATE` set, then rebuild.
