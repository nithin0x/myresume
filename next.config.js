/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    // This single-page export has a small stylesheet; avoid a blocking request.
    inlineCss: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
