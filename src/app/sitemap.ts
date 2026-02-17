import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://curiosokit.dev';
  
  const staticPages = [
    '',
    '/components',
    '/buttons',
    '/ascii-media',
    '/text-animations',
    '/tilted-card',
  ];

  const sitemapEntries = staticPages.map((slug) => ({
    url: `${baseUrl}${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: slug === '' ? 1 : 0.8,
  }));

  return sitemapEntries;
}
