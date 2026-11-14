import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AlmatyAtlas from '@/components/travel/AlmatyAtlas'
import CoordinatePlate from '@/components/travel/CoordinatePlate'
import WalkCard from '@/components/travel/WalkCard'
import { createPageMetadata } from '@/lib/metadata'
import { serializeJsonLd } from '@/lib/schema'
import {
  formatCoordinates,
  getTripBySlug,
  getTripStats,
  trips,
  type Trip,
} from '@/lib/travel'
import { createTravelGraph } from '@/lib/travel-schema'

interface TripPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }))
}

function tripTitle(trip: Trip) {
  return `${trip.name}, ${trip.country} — places, walks & field notes | Adam Ahsan`
}

export async function generateMetadata({ params }: TripPageProps): Promise<Metadata> {
  const { slug } = await params
  const trip = getTripBySlug(slug)
  if (!trip) return {}

  const stats = getTripStats(trip)
  return createPageMetadata({
    path: `/travel/${trip.slug}`,
    title: tripTitle(trip),
    absoluteTitle: true,
    description: `${trip.summary} ${stats.days} days, ${stats.places} places, ${stats.walks} walks and ${stats.climbM.toLocaleString('en-US')} m climbed.`,
    type: 'article',
    publishedTime: `${trip.publishedAt}T00:00:00+04:00`,
    modifiedTime: `${trip.updatedAt}T00:00:00+04:00`,
  })
}

export default async function TripPage({ params }: TripPageProps) {
  const { slug } = await params
  const trip = getTripBySlug(slug)
  if (!trip) notFound()

  const stats = getTripStats(trip)
  const graph = serializeJsonLd(createTravelGraph({ trip }))
  const placeNumber = (placeId: string) => String(trip.places.findIndex((place) => place.id === placeId) + 1).padStart(2, '0')

  return (
    <div className="studio-page travel-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />

      <article>
        <header className="travel-hero" aria-labelledby="trip-title">
          <div>
            <p className="studio-label travel-kicker">
              <Link href="/travel">Travel</Link>
              <span>/</span>
              <span>{trip.country}</span>
            </p>
            <h1 id="trip-title">{trip.name}</h1>
            <p className="travel-hero-meta">
              {trip.country} · {trip.dates.label} · {formatCoordinates(trip.coordinates)}
            </p>
            <p className="travel-hero-thesis">{trip.summary}</p>
            <dl className="travel-stats">
              <div><dt>Days</dt><dd>{stats.days}</dd></div>
              <div><dt>Places</dt><dd>{stats.places}</dd></div>
              <div><dt>Walks</dt><dd>{stats.walks}</dd></div>
              <div><dt>Distance</dt><dd>{stats.distanceKm} km</dd></div>
              <div><dt>Climbed</dt><dd>{stats.climbM.toLocaleString('en-US')} m</dd></div>
            </dl>
          </div>
          <CoordinatePlate trip={trip} />
        </header>

        <section className="travel-section travel-section--white" aria-labelledby="atlas-title">
          <header className="travel-section-head">
            <div>
              <p className="studio-label">01 / The atlas</p>
              <h2 id="atlas-title">Every pin is a place I saved.</h2>
            </div>
            <div className="travel-section-intro">
              {trip.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </header>
          <AlmatyAtlas places={trip.places} walks={trip.walks} />
        </section>

        <section className="travel-section" aria-labelledby="walks-title">
          <header className="travel-section-head">
            <div>
              <p className="studio-label">02 / The walks</p>
              <h2 id="walks-title">Four walks, all logged.</h2>
            </div>
            <div className="travel-section-intro">
              <p>
                Straight from Strava: distance, moving time and elevation from the activity
                records, route shapes from the GPX exports. All times are local.
              </p>
              <p>
                {stats.walks} walks · {stats.distanceKm} km · {stats.climbM.toLocaleString('en-US')} m climbed ·{' '}
                {Math.floor(stats.movingMin / 60)} h {stats.movingMin % 60} min moving.
              </p>
            </div>
          </header>
          <div className="travel-walks-grid">
            {trip.walks.map((walk, index) => (
              <WalkCard walk={walk} index={index} key={walk.id} />
            ))}
          </div>
        </section>

        <section className="travel-section travel-section--white" aria-labelledby="places-title">
          <header className="travel-section-head">
            <div>
              <p className="studio-label">03 / The places</p>
              <h2 id="places-title">The places themselves.</h2>
            </div>
            <div className="travel-section-intro">
              <p>
                A saved list, grouped by where it sits: the city, the mountains at its edge,
                and the long day trips east. Numbers match the pins on the atlas.
              </p>
            </div>
          </header>

          {trip.chapters.map((chapter) => (
            <section className="travel-chapter" aria-labelledby={`chapter-${chapter.id}`} key={chapter.id}>
              <div className="travel-chapter-copy">
                <p className="studio-label">{chapter.label}</p>
                <h3 id={`chapter-${chapter.id}`}>{chapter.title}</h3>
                <p>{chapter.description}</p>
              </div>
              <ol className="travel-place-list">
                {chapter.placeIds.map((placeId) => {
                  const place = trip.places.find((item) => item.id === placeId)
                  if (!place) return null
                  return (
                    <li className="travel-place" key={place.id}>
                      <span className="travel-place-index">{placeNumber(place.id)}</span>
                      <div>
                        <h4>{place.name}</h4>
                        <p>{place.note}</p>
                      </div>
                      <span className="travel-place-coords">
                        {place.coordinates[1].toFixed(3)}° N
                        <br />
                        {place.coordinates[0].toFixed(3)}° E
                      </span>
                    </li>
                  )
                })}
              </ol>
            </section>
          ))}
        </section>

        <section className="travel-numbers" aria-labelledby="numbers-title">
          <div>
            <p className="studio-label">04 / The numbers</p>
            <h2 id="numbers-title">The trip, in numbers.</h2>
            <p>
              Seven days in Kazakhstan, {stats.walks} logged walks, {stats.places} saved
              places. The lake walk alone was {trip.walks[3]?.distanceKm ?? 11} km and{' '}
              {trip.walks[3]?.elevationGainM ?? 835} m of climbing.
            </p>
          </div>
          <div className="travel-number-grid">
            <div><b>{stats.days}</b><span>days</span></div>
            <div><b>{stats.places}</b><span>places</span></div>
            <div><b>{stats.walks}</b><span>walks</span></div>
            <div><b>{stats.distanceKm}</b><span>km walked</span></div>
            <div><b>{stats.climbM.toLocaleString('en-US')}</b><span>m climbed</span></div>
            <p className="travel-source-note">{trip.sourceNote}</p>
          </div>
        </section>

        <nav className="travel-next" aria-label="Keep exploring">
          <div>
            <p className="studio-label">Next</p>
            <h2>More field atlases.</h2>
          </div>
          <div className="travel-next-links">
            <Link href="/travel">All travel</Link>
            <Link href="/about">About Adam</Link>
          </div>
        </nav>
      </article>
    </div>
  )
}
