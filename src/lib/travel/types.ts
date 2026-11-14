export type TravelArea = 'city' | 'mountains' | 'east'

export interface TravelPlace {
  id: string
  name: string
  area: TravelArea
  /** [longitude, latitude] */
  coordinates: [number, number]
  note: string
  /** Overrides the Google Maps search query when the display name is not the POI name. */
  mapsQuery?: string
  source: '2gis' | 'manual'
}

export interface TravelWalk {
  id: string
  name: string
  type: 'Walk' | 'Hike'
  /** ISO date in the destination's local timezone. */
  date: string
  /** Local start/end times, e.g. "11:02". */
  startLocal: string
  endLocal: string
  note: string
  distanceKm: number
  movingMin: number
  elevationGainM: number
  elevationMinM: number
  elevationMaxM: number
  /** Simplified route as [longitude, latitude, elevation metres]. */
  track: Array<[number, number, number | null]>
}

export interface TravelChapter {
  id: TravelArea
  label: string
  title: string
  description: string
  placeIds: string[]
}

export interface TravelPhoto {
  /** Base path without the width suffix, e.g. /images/travel/almaty/day15-mosque */
  src: string
  alt: string
  caption?: string
  width: number
  height: number
  /** Tiny inline placeholder used as a blurred backdrop while the photo loads. */
  lqip?: string
}

export interface TravelDay {
  id: string
  /** Short label, e.g. "Sat 15 Aug". */
  label: string
  date: string
  title: string
  summary: string
  /** Optional Strava walk logged on that day. */
  walkId?: string
  photos: TravelPhoto[]
}

export interface TripMedia {
  hero: TravelPhoto
  days: TravelDay[]
  placePhotos: Record<string, TravelPhoto>
}

export interface Trip {
  slug: string
  name: string
  country: string
  countryCode: string
  /** Flag emoji shown next to the country name. */
  flag: string
  /** [longitude, latitude] of the place centre. */
  coordinates: [number, number]
  dates: { from: string; to: string; label: string }
  summary: string
  intro: string[]
  publishedAt: string
  updatedAt: string
  sourceNote: string
  places: TravelPlace[]
  walks: TravelWalk[]
  chapters: TravelChapter[]
}
