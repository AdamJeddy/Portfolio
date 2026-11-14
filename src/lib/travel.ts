import { almatyTrip } from './travel/almaty'

export type {
  TravelArea,
  TravelChapter,
  TravelPlace,
  TravelWalk,
  Trip,
} from './travel/types'

import type { TravelArea, TravelPlace, Trip } from './travel/types'

export const trips: Trip[] = [almatyTrip]

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((trip) => trip.slug === slug)
}

export interface TripStats {
  days: number
  places: number
  walks: number
  distanceKm: number
  climbM: number
  movingMin: number
}

export function getTripStats(trip: Trip): TripStats {
  const from = new Date(`${trip.dates.from}T00:00:00Z`).getTime()
  const to = new Date(`${trip.dates.to}T00:00:00Z`).getTime()
  const days = Math.round((to - from) / 86_400_000) + 1
  const distanceKm = trip.walks.reduce((sum, walk) => sum + walk.distanceKm, 0)
  const climbM = trip.walks.reduce((sum, walk) => sum + walk.elevationGainM, 0)
  const movingMin = trip.walks.reduce((sum, walk) => sum + walk.movingMin, 0)

  return {
    days,
    places: trip.places.length,
    walks: trip.walks.length,
    distanceKm: Math.round(distanceKm * 10) / 10,
    climbM: Math.round(climbM),
    movingMin,
  }
}

export function getPlacesByArea(trip: Trip, area: TravelArea): TravelPlace[] {
  return trip.places.filter((place) => place.area === area)
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

export function formatWalkDay(iso: string): string {
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`))
}

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  if (hours === 0) return `${remaining} min`
  if (remaining === 0) return `${hours} h`
  return `${hours} h ${remaining} min`
}

export function formatCoordinates([longitude, latitude]: [number, number]): string {
  return `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`
}
