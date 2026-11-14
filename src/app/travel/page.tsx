import Link from 'next/link'
import TravelImage from '@/components/travel/TravelImage'
import { createPageMetadata } from '@/lib/metadata'
import { serializeJsonLd } from '@/lib/schema'
import { formatTripDate, getTripStats, trips } from '@/lib/travel'
import { almatyMedia } from '@/lib/travel/almaty-media'
import { createTravelIndexGraph } from '@/lib/travel-schema'

export const metadata = createPageMetadata({
  path: '/travel',
  title: 'Travel notes: places I\'ve been | Adam Ahsan',
  absoluteTitle: true,
  description:
    'A travel notebook for the places I go: photographs, notes, and the small details that hold a trip together. First up: a week in Almaty, Kazakhstan.',
})

const graph = serializeJsonLd(createTravelIndexGraph(trips))

const previewPhotos = [
  { photo: almatyMedia.days[4].photos[1], label: 'Central State Museum' },
  { photo: almatyMedia.days[3].photos[0], label: 'Kolsai Lake' },
  { photo: almatyMedia.days[5].photos[0], label: 'Big Almaty Lake' },
]

export default function TravelIndex() {
  return (
    <div className="studio-page travel-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />

      <section className="travel-index-hero" aria-labelledby="travel-title">
        <div>
          <p className="studio-label">Travel / Field notes</p>
          <h1 id="travel-title">Places I&apos;ve been.</h1>
        </div>
        <p>
          A travel notebook for the places I go: photographs, notes, and the small details
          that hold a trip together.
        </p>
      </section>

      <section className="travel-index-list" aria-labelledby="travel-list-title">
        <p className="studio-label" id="travel-list-title">
          Trips / {String(trips.length).padStart(2, '0')}
        </p>
        {trips.map((trip, index) => {
          const stats = getTripStats(trip)
          const tripHref = `/travel/${trip.slug}`

          return (
            <article className="travel-card" key={trip.slug}>
              <div>
                <p className="studio-label">
                  Trip {String(index + 1).padStart(2, '0')} /{' '}
                  <span
                    className="travel-flag"
                    role="img"
                    aria-label="Flag of Kazakhstan"
                    style={{ backgroundImage: `url(${trip.flag})` }}
                  />{' '}
                  {trip.country}
                </p>
                <h2>
                  <Link href={tripHref}>{trip.name}</Link>
                </h2>
                <p className="travel-card-summary">
                  {trip.dates.label} · {trip.summary}
                </p>
                <p className="travel-card-stats">
                  <span>{stats.days} days</span>
                  <span>{stats.places} places</span>
                </p>
                <p className="travel-card-stats">
                  <span>Last updated {formatTripDate(trip.updatedAt)}</span>
                </p>
              </div>
              <figure className="travel-card-media">
                <Link className="travel-card-media-link" href={tripHref} aria-label={`Open ${trip.name}`}>
                  <TravelImage
                    photo={almatyMedia.hero}
                    priority
                    sizes="(max-width: 1000px) 100vw, 420px"
                  />
                </Link>
                <figcaption>{almatyMedia.hero.caption}</figcaption>
              </figure>
            </article>
          )
        })}

        <div className="travel-index-frames">
          <p className="studio-label">From the week</p>
          <div className="travel-index-frame-grid">
            {previewPhotos.map((item) => (
              <Link className="travel-index-frame" href="/travel/almaty" key={item.label}>
                <TravelImage photo={item.photo} sizes="(max-width: 1000px) 33vw, 420px" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <p className="travel-index-note">
        More trips as I travel. Places and notes come from my saved lists.
      </p>
    </div>
  )
}
