import { almatyTrip } from './travel/almaty'

export type {
  TravelArea,
  TravelChapter,
  TravelPlace,
  TravelWalk,
  Trip,
} from './travel/types'

import type { TravelPlace, Trip } from './travel/types'

export const trips: Trip[] = [almatyTrip]

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((trip) => trip.slug === slug)
}

export interface TripStats {
  days: number
  places: number
}

export function getTripStats(trip: Trip): TripStats {
  const from = new Date(`${trip.dates.from}T00:00:00Z`).getTime()
  const to = new Date(`${trip.dates.to}T00:00:00Z`).getTime()
  const days = Math.round((to - from) / 86_400_000) + 1

  return { days, places: trip.places.length }
}

export function formatTripDate(iso: string, options: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
    ...options,
  }).format(new Date(`${iso}T00:00:00Z`))
}

export function googleMapsUrl([longitude, latitude]: [number, number]): string {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
}

export function googleMapsPlaceUrl(place: TravelPlace): string {
  const label = place.mapsQuery ?? `${place.name}, ${place.area === 'east' ? 'Kazakhstan' : 'Almaty, Kazakhstan'}`
  const [longitude, latitude] = place.coordinates
  return `https://www.google.com/maps/search/${encodeURIComponent(label)}/@${latitude},${longitude},17z`
}
