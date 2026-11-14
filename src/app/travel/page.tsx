import Link from 'next/link'
import TravelImage from '@/components/travel/TravelImage'
import { createPageMetadata } from '@/lib/metadata'
import { serializeJsonLd } from '@/lib/schema'
import { formatTripDate, getTripStats, trips } from '@/lib/travel'
import { getTripMedia } from '@/lib/travel/media'
import { createTravelIndexGraph } from '@/lib/travel-schema'

export const metadata = createPageMetadata({
  path: '/travel',
  title: 'Travel notes: places I\'ve been | Adam Ahsan',
  absoluteTitle: true,
  description:
    'A travel notebook for the places I go: photographs, notes, and the small details that hold a trip together. First up: a week in Almaty, Kazakhstan.',
})

const graph = serializeJsonLd(createTravelIndexGraph(trips))

const previewTrip = trips[0]
const previewMedia = previewTrip ? getTripMedia(previewTrip.slug) : undefined
const previewPhotos = previewMedia
  ? [
      { photo: previewMedia.days[4]?.photos[2], label: 'Bill Viola at Kasteyev' },
      { photo: previewMedia.days[3]?.photos[0], label: 'Kolsai Lake' },
      { photo: previewMedia.days[5]?.photos[0], label: 'Big Almaty Lake' },
    ].filter((item): item is { photo: NonNullable<typeof item.photo>; label: string } => Boolean(item.photo))
  : []

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
          Trips
        </p>
        {trips.map((trip) => {
          const stats = getTripStats(trip)
          const media = getTripMedia(trip.slug)
          const tripHref = `/travel/${trip.slug}`

          return (
            <article className="travel-card" key={trip.slug}>
              <div>
                <p className="studio-label">
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
              {media && (
                <figure className="travel-card-media">
                  <Link className="travel-card-media-link" href={tripHref} aria-label={`Open ${trip.name}`}>
                    <TravelImage
                      photo={media.hero}
                      priority
                      sizes="(max-width: 1000px) 100vw, 420px"
                    />
                  </Link>
                  <figcaption>{media.hero.caption}</figcaption>
                </figure>
              )}
            </article>
          )
        })}

        {previewPhotos.length > 0 && previewTrip && (
          <div className="travel-index-frames">
            <div className="travel-index-frames-head">
              <p className="studio-label">From the week</p>
              <span className="travel-index-frames-hint" aria-hidden="true">Swipe →</span>
            </div>
            <div className="travel-index-frame-grid" aria-label="Photos from the week">
              {previewPhotos.map((item) => (
                <Link className="travel-index-frame" href={`/travel/${previewTrip.slug}`} key={item.label}>
                  <TravelImage
                    photo={item.photo}
                    sizes="(max-width: 640px) 78vw, (max-width: 1000px) 33vw, 420px"
                  />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <p className="travel-index-note">
        More trips as I travel. Places and notes come from my saved lists.
      </p>
    </div>
  )
}
