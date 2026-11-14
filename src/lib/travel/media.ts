import { almatyMedia } from './almaty-media'
import { newYorkMedia } from './new-york-media'
import type { TripMedia } from './types'

/**
 * Media is kept per trip so the [slug] route can never show another trip's
 * photographs. Add a trip's media here when its page is added.
 */
const mediaBySlug: Record<string, TripMedia> = {
  almaty: almatyMedia,
  'new-york': newYorkMedia,
}

export function getTripMedia(slug: string): TripMedia | undefined {
  return mediaBySlug[slug]
}
