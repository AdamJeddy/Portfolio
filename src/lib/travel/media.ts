import { almatyMedia } from './almaty-media'
import type { TripMedia } from './types'

/**
 * Media is kept per trip so the [slug] route can never show another trip's
 * photographs. Add a trip's media here when its page is added.
 */
const mediaBySlug: Record<string, TripMedia> = {
  almaty: almatyMedia,
}

export function getTripMedia(slug: string): TripMedia | undefined {
  return mediaBySlug[slug]
}
