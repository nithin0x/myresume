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

The design follows nithin0x.space, with light and dark themes, its terminal logo, and self-hosted JetBrains Mono. The font license is included in `src/assets/fonts/OFL.txt`.

## Build and deploy

```sh
npm run lint
npm run test:sync
npm run build
npm run typecheck
npm run check:export
```

The build exports the site to `out/`. Pushes to `main` deploy through GitHub Actions. Set the repository's **Settings → Pages → Source** to **GitHub Actions**.

To preview the export, run `python3 -m http.server 4174 --directory out` and visit `http://localhost:4174`.

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

To select a LinkedIn post manually, run **Sync portfolio content** with its URL, title, text, and publication date. For local updates, use `npm run set:linkedin` with `LINKEDIN_POST_URL`, `LINKEDIN_POST_TITLE`, `LINKEDIN_POST_TEXT`, and `LINKEDIN_POST_DATE` set, then rebuild.
