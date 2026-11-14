import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TravelCover from '@/components/travel/TravelCover'
import TravelImage from '@/components/travel/TravelImage'
import TripDays from '@/components/travel/TripDays'
import { createPageMetadata } from '@/lib/metadata'
import { serializeJsonLd } from '@/lib/schema'
import {
  formatCoordinates,
  getTripBySlug,
  getTripStats,
  trips,
  type Trip,
} from '@/lib/travel'
import { almatyMedia } from '@/lib/travel/almaty-media'
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

  return createPageMetadata({
    path: `/travel/${trip.slug}`,
    title: tripTitle(trip),
    absoluteTitle: true,
    description: `${trip.summary} Photographs by Adam Ahsan.`,
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
  const graph = serializeJsonLd(createTravelGraph({ trip, photo: almatyMedia.hero }))
  const photoCount = almatyMedia.days.reduce((total, day) => total + day.photos.length, 0) + 1
  const placeNumber = (placeId: string) => String(trip.places.findIndex((place) => place.id === placeId) + 1).padStart(2, '0')

  return (
    <div className="studio-page travel-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />

      <article>
        <TravelCover trip={trip} photo={almatyMedia.hero} />

        <section className="travel-intro" aria-label="Trip summary">
          <div className="travel-intro-copy">
            <p className="travel-thesis">{trip.summary}</p>
            <div className="travel-intro-body">
              {trip.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <dl className="travel-facts">
            <div><dt>Dates</dt><dd>{trip.dates.label}</dd></div>
            <div><dt>Centre</dt><dd>{formatCoordinates(trip.coordinates)}</dd></div>
            <div><dt>Places</dt><dd>{stats.places}</dd></div>
          </dl>
        </section>

        <TripDays days={almatyMedia.days} />

        <section className="travel-section" id="places" aria-labelledby="places-title">
          <header className="travel-section-head">
            <div>
              <p className="studio-label">02 / The places</p>
              <h2 id="places-title">The places themselves.</h2>
            </div>
            <div className="travel-section-intro">
              <p>
                A saved list, grouped by where it sits: the city, the mountains at its edge, and
                the long day trips east. Numbers match the pins on the atlas.
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
                  const photo = almatyMedia.placePhotos[place.id]
                  return (
                    <li className="travel-place" key={place.id}>
                      <span className="travel-place-index">{placeNumber(place.id)}</span>
                      <div className="travel-place-main">
                        {photo && (
                          <TravelImage className="travel-place-thumb" photo={photo} sizes="72px" />
                        )}
                        <div>
                          <h4>{place.name}</h4>
                          <p>{place.note}</p>
                        </div>
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
            <p className="studio-label">03 / The numbers</p>
            <h2 id="numbers-title">The trip, in numbers.</h2>
            <p>
              Seven days in Kazakhstan, {stats.places} places, and a page of photographs
              from each one.
            </p>
          </div>
          <div className="travel-number-grid">
            <div><b>{stats.days}</b><span>days</span></div>
            <div><b>{stats.places}</b><span>places</span></div>
            <div><b>{photoCount}</b><span>photographs</span></div>
            <div><b>{stats.distanceKm}</b><span>km walked</span></div>
            <div><b>{stats.climbM.toLocaleString('en-US')}</b><span>m climbed</span></div>
            <p className="travel-source-note">{trip.sourceNote}</p>
          </div>
        </section>

        <nav className="travel-next" aria-label="Keep exploring">
          <div>
            <p className="studio-label">Next</p>
            <h2>More trips.</h2>
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
