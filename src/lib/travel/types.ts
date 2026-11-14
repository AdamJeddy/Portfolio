export type TravelArea = 'city' | 'mountains' | 'east' | 'show' | 'midtown' | 'downtown'

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

export interface TravelDayTour {
  label: string
  title: string
  note?: string
  stops: string[]
}

export interface TravelDay {
  id: string
  /** Short label, e.g. "Sat 15 Aug". */
  label: string
  date: string
  title: string
  summary: string
  note?: string
  /** Optional guided store list shown in the day. */
  tour?: TravelDayTour
  photos: TravelPhoto[]
}

export interface TripAside {
  label: string
  title: string
  body: string
  photos: TravelPhoto[]
}

export interface TripPreviewPhoto {
  photo: TravelPhoto
  label: string
}

export interface TripMedia {
  hero: TravelPhoto
  days: TravelDay[]
  placePhotos: Record<string, TravelPhoto>
  aside?: TripAside
  /** Extra photography used by the log layout. */
  showPhotos?: TravelPhoto[]
  gallery?: TravelPhoto[]
  /** Hand-picked frames for the travel index strip. */
  preview?: TripPreviewPhoto[]
}

export interface TripEvent {
  name: string
  venue: string
  dates: string
  url?: string
}

export interface TripNumber {
  value: string
  label: string
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
  highestPoint?: { name: string; elevationM: number }
  summary: string
  intro: string[]
  publishedAt: string
  updatedAt: string
  sourceNote: string
  places: TravelPlace[]
  chapters: TravelChapter[]
  /** "atlas" is the original field-atlas layout; "log" is the trip-log layout. */
  layout?: 'atlas' | 'log'
  headline?: string
  /** Work trip details, used by the log layout. */
  event?: TripEvent
  numbers?: TripNumber[]
  /** Featured on the travel index preview strip. */
  featured?: boolean
}
