import type { MetadataRoute } from 'next'
import { BUSINESS } from '@/lib/business'
import { VEHICLES } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: BUSINESS.siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...VEHICLES.map((vehicle) => ({
      url: `${BUSINESS.siteUrl}/inventory/${vehicle.id}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
