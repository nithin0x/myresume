import type { MetadataRoute } from 'next'
import { profile } from '@/data/profile'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('sitemap.xml', profile.url).href,
  }
}
