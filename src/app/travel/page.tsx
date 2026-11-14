import Link from 'next/link'
import CoordinatePlate from '@/components/travel/CoordinatePlate'
import { createPageMetadata } from '@/lib/metadata'
import { serializeJsonLd } from '@/lib/schema'
import {
  formatCoordinates,
  formatTripDate,
  getTripStats,
  trips,
} from '@/lib/travel'
import { createTravelIndexGraph } from '@/lib/travel-schema'

export const metadata = createPageMetadata({
  path: '/travel',
  title: 'Travel — field atlases of places and walks | Adam Ahsan',
  absoluteTitle: true,
  description:
    'A field atlas for the places I go: the map, the walks, the coordinates, and what I would tell a friend. First up: a week in Almaty, Kazakhstan.',
})

const graph = serializeJsonLd(createTravelIndexGraph(trips))

export default function TravelIndex() {
  return (
    <div className="studio-page travel-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />

      <section className="travel-index-hero" aria-labelledby="travel-title">
        <div>
          <p className="studio-label">Travel / Field atlases</p>
          <h1 id="travel-title">Places I&apos;ve been.</h1>
        </div>
        <p>
          A map-first notebook for the places I go: where I walked, what I saw, and the
          coordinates that hold it together.
        </p>
      </section>

      <section className="travel-index-list" aria-labelledby="travel-list-title">
        <p className="studio-label" id="travel-list-title">
          Atlases / {String(trips.length).padStart(2, '0')}
        </p>
        {trips.map((trip, index) => {
          const stats = getTripStats(trip)
          return (
            <Link className="travel-card" href={`/travel/${trip.slug}`} key={trip.slug}>
              <div>
                <p className="studio-label">
                  Atlas {String(index + 1).padStart(2, '0')} / {trip.country}
                </p>
                <h2>{trip.name}</h2>
                <p className="travel-card-summary">
                  {trip.dates.label} · {formatCoordinates(trip.coordinates)} · {trip.summary}
                </p>
                <p className="travel-card-stats">
                  <span>{stats.days} days</span>
                  <span>{stats.places} places</span>
                  <span>{stats.walks} walks</span>
                  <span>{stats.distanceKm} km</span>
                  <span>{stats.climbM.toLocaleString('en-US')} m climbed</span>
                </p>
                <p className="travel-card-stats">
                  <span>Last updated {formatTripDate(trip.updatedAt)}</span>
                  <span>Open the atlas →</span>
                </p>
              </div>
              <CoordinatePlate trip={trip} />
            </Link>
          )
        })}
      </section>

      <p className="travel-index-note">
        More atlases as I travel. Places and coordinates come from my saved lists; walks come
        from Strava.
      </p>
    </div>
  )
}
