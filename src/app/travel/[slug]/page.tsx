import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TravelCover from '@/components/travel/TravelCover'
import TravelImage from '@/components/travel/TravelImage'
import TripDays from '@/components/travel/TripDays'
import { createPageMetadata } from '@/lib/metadata'
import { serializeJsonLd } from '@/lib/schema'
import {
  getTripBySlug,
  googleMapsPlaceUrl,
  googleMapsUrl,
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
  return `${trip.name}, ${trip.country} | Travel notes by Adam Ahsan`
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
  const lakeCount = trip.places.filter((place) => /lake/i.test(place.name)).length
  const highestPeakM = 3300
  const placeOrder = new Map<string, number>()
  let placeCounter = 0
  for (const chapter of trip.chapters) {
    for (const placeId of chapter.placeIds) {
      if (!trip.places.some((place) => place.id === placeId)) continue
      placeCounter += 1
      placeOrder.set(placeId, placeCounter)
    }
  }
  const placeNumber = (placeId: string) => String(placeOrder.get(placeId) ?? 0).padStart(2, '0')

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
            <div><dt>Centre</dt><dd><a className="travel-map-link" href={googleMapsUrl(trip.coordinates)} target="_blank" rel="noopener noreferrer">Almaty</a></dd></div>
            <div><dt>Places</dt><dd>{stats.places}</dd></div>
          </dl>
        </section>

        <TripDays days={almatyMedia.days} />

        {almatyMedia.aside && (
          <aside className="travel-aside" aria-labelledby="travel-aside-title">
            <div className="travel-aside-copy">
              <p className="studio-label">{almatyMedia.aside.label}</p>
              <h2 id="travel-aside-title">{almatyMedia.aside.title}</h2>
              <p>{almatyMedia.aside.body}</p>
            </div>
            <div className="travel-aside-photos">
              {almatyMedia.aside.photos.map((photo) => (
                <figure className="travel-aside-photo" key={photo.src}>
                  <TravelImage photo={photo} sizes="(max-width: 1000px) 45vw, 260px" />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </aside>
        )}

        <section className="travel-section" id="places" aria-labelledby="places-title">
          <header className="travel-section-head">
            <div>
              <p className="studio-label">02 / The places</p>
              <h2 id="places-title">The places themselves.</h2>
            </div>
            <div className="travel-section-intro">
              <p>
                A saved list, grouped by where it sits: the city, the mountains at its edge, and
                the long day trips east. The original{' '}
                <a
                  className="travel-map-link"
                  href="https://2gis.kz/almaty/favorites/shared/cf77f8b9-7b90-48e8-b865-876330fc6723"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2GIS list
                </a>{' '}
                is public too.
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
                      <a
                        className="travel-place-coords travel-map-link"
                        href={googleMapsPlaceUrl(place)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${place.name} in Google Maps`}
                      >
                        Map <span aria-hidden="true">↗</span>
                      </a>
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
              Seven days in Kazakhstan: {stats.places} places, {lakeCount} lakes, and the
              highest point at Shymbulak Peak, about {highestPeakM.toLocaleString('en-US')} m up.
            </p>
          </div>
          <div className="travel-number-grid">
            <div><b>{stats.days}</b><span>days</span></div>
            <div><b>{stats.places}</b><span>places</span></div>
            <div><b>{lakeCount}</b><span>lakes</span></div>
            <div><b>{highestPeakM.toLocaleString('en-US')}</b><span>m · Shymbulak Peak</span></div>
            <p className="travel-source-note">{trip.sourceNote}</p>
            <p className="travel-source-note">
              <a
                className="travel-map-link"
                href="https://2gis.kz/almaty/favorites/shared/cf77f8b9-7b90-48e8-b865-876330fc6723"
                target="_blank"
                rel="noopener noreferrer"
              >
                The original 2GIS saved list
              </a>
            </p>
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
