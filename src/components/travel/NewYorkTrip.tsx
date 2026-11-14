import Link from 'next/link'
import TravelImage from '@/components/travel/TravelImage'
import { getTripStats, googleMapsPlaceUrl, trips } from '@/lib/travel'
import type { Trip, TripMedia } from '@/lib/travel/types'

interface NewYorkTripProps {
  trip: Trip
  media: TripMedia
  graph: string
}

const tickerItems = [
  "NRF '26 Retail's Big Show",
  'Javits Center, New York',
  '11–13 January 2026',
  '4 nights / 5 days',
  'EK203 → EK204',
  '414 photographs, 57 videos',
]

const showTopics = [
  'Agentic commerce',
  'AI product imagery',
  'Autonomous convenience',
  'Beauty diagnostics',
  'In-store foot scanning',
  'Virtual models',
  'Ask Ralph',
  'The Next Now stage',
]

function Ticker() {
  const items = [...tickerItems, ...tickerItems]

  return (
    <div className="ny-ticker" aria-label="Trip at a glance">
      <div className="ny-ticker-track">
        {items.map((item, index) => (
          <span className="ny-ticker-item" key={`${item}-${index}`} aria-hidden={index >= tickerItems.length}>
            {item}
            <span className="ny-ticker-dot" aria-hidden="true">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function NewYorkTrip({ trip, media, graph }: NewYorkTripProps) {
  const stats = getTripStats(trip)
  const otherTrips = trips.filter((item) => item.slug !== trip.slug)
  const showPhotos = media.showPhotos ?? []
  const gallery = media.gallery ?? []
  const numbers = trip.numbers ?? []

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
    <div className="studio-page travel-page travel-page--nyc new-york-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />

      <article>
        <header className="ny-hero" aria-labelledby="ny-title">
          <div className="ny-hero-copy">
            <div className="ny-hero-top">
              <p className="studio-label ny-kicker">
                <Link href="/travel">Travel</Link>
                <span aria-hidden="true">/</span>
                <span>{trip.name}</span>
              </p>
              <p className="ny-stamp">
                <span>NRF &apos;26</span>
                <span>Retail&apos;s Big Show</span>
                <span>11–13 January</span>
              </p>
            </div>

            <div className="ny-hero-main">
              <h1 id="ny-title">
                New
                <br />
                {' '}
                York<span className="ny-hero-dot">.</span>
              </h1>
              <p className="ny-hero-lede">Five days, four nights, and a trade show in between.</p>
              <p className="ny-hero-meta">
                {trip.dates.label} · Javits Center, Manhattan
              </p>
            </div>

            {trip.flights && (
              <div className="ny-flights" aria-label="Flights">
                <div className="ny-flight">
                  <span className="ny-flight-code">{trip.flights.out.code}</span>
                  <span className="ny-flight-route">
                    {trip.flights.out.from} <span aria-hidden="true">→</span> {trip.flights.out.to}
                  </span>
                  <span className="ny-flight-time">{trip.flights.out.departs}</span>
                </div>
                <div className="ny-flight">
                  <span className="ny-flight-code">{trip.flights.back.code}</span>
                  <span className="ny-flight-route">
                    {trip.flights.back.from} <span aria-hidden="true">→</span> {trip.flights.back.to}
                  </span>
                  <span className="ny-flight-time">{trip.flights.back.departs}</span>
                </div>
              </div>
            )}
          </div>

          <figure className="ny-hero-media">
            <TravelImage
              photo={media.hero}
              priority
              sizes="(max-width: 1000px) 100vw, 46vw"
            />
            <figcaption>
              {media.hero.caption} · photograph by Adam Ahsan
            </figcaption>
          </figure>
        </header>

        <Ticker />

        <section className="ny-intro" aria-label="Trip summary">
          <div className="ny-intro-copy">
            <p className="studio-label">The trip</p>
            <h2>A work trip that kept turning into a walk.</h2>
            <div className="ny-intro-body">
              {trip.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>

          <aside className="ny-pass" aria-label="Trip record">
            <div className="ny-pass-head">
              <span>Trip record</span>
              <span>NYC / 01</span>
            </div>
            <dl className="ny-pass-rows">
              <div><dt>Passenger</dt><dd>Adam Ahsan</dd></div>
              <div><dt>Route</dt><dd>DXB ⇄ JFK</dd></div>
              <div><dt>Dates</dt><dd>{trip.dates.label}</dd></div>
              {trip.event && (
                <>
                  <div><dt>Purpose</dt><dd>{trip.event.name}</dd></div>
                  <div><dt>Venue</dt><dd>{trip.event.venue}</dd></div>
                </>
              )}
              <div><dt>Nights</dt><dd>{stats.days - 1}</dd></div>
            </dl>
            <div className="ny-pass-foot">
              <span className="ny-barcode" aria-hidden="true" />
              <span>EK203 · EK204</span>
            </div>
          </aside>
        </section>

        <section className="ny-section ny-days" id="days" aria-labelledby="days-title">
          <header className="ny-section-head">
            <div>
              <p className="studio-label">01 / The days</p>
              <h2 id="days-title">Five days, in order.</h2>
            </div>
            <p className="ny-section-note">
              Timestamps come from the camera roll. The show ran 11–13 January; the days around
              it were mine.
            </p>
          </header>

          <ol className="ny-day-list">
            {media.days.map((day, index) => (
              <li className="ny-day" key={day.id}>
                <div className="ny-day-rail">
                  <span className="ny-day-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="ny-day-date">{day.label}</span>
                </div>
                <div className="ny-day-body">
                  <div className="ny-day-head">
                    <h3>{day.title}</h3>
                    <p>{day.summary}</p>
                  </div>

                  {day.beats && (
                    <ul className="ny-beats" aria-label={`${day.label} timeline`}>
                      {day.beats.map((beat) => (
                        <li key={`${beat.time}-${beat.label}`}>
                          <span className="ny-beat-time">{beat.time}</span>
                          <span>{beat.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className={`ny-day-photos ny-day-photos--${day.photos.length}`}>
                    {day.photos.map((photo) => (
                      <figure className="ny-day-photo" key={photo.src}>
                        <TravelImage photo={photo} sizes="(max-width: 1000px) 90vw, 30vw" />
                        <figcaption>{photo.caption}</figcaption>
                      </figure>
                    ))}
                  </div>

                  {day.note && <p className="ny-day-note">{day.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {showPhotos.length > 0 && (
          <section className="ny-show" id="show" aria-labelledby="show-title">
            <figure className="ny-show-band">
              <TravelImage photo={showPhotos[0]} wide sizes="100vw" />
              <figcaption>{showPhotos[0].caption}</figcaption>
            </figure>

            <div className="ny-show-inner">
              <div className="ny-show-copy">
                <p className="studio-label">02 / The show</p>
                <h2 id="show-title">Three days under one roof.</h2>
                <p>
                  NRF Retail&apos;s Big Show took over the Javits Center for three days. I spent
                  them between the expo floor and the stages, listening for what retail thinks AI
                  is going to do next.
                </p>
                <p>
                  The vocabulary was consistent from booth to booth: agentic commerce, autonomous
                  convenience, AI-generated product imagery, in-store diagnostics. The difference
                  was in how much of it had actually shipped.
                </p>
                <ul className="ny-topics" aria-label="Themes from the show floor">
                  {showTopics.map((topic, index) => (
                    <li key={topic}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {topic}
                    </li>
                  ))}
                </ul>
                {trip.event?.url && (
                  <p className="ny-show-link">
                    <a href={trip.event.url} target="_blank" rel="noopener noreferrer">
                      NRF &apos;26 programme <span aria-hidden="true">↗</span>
                    </a>
                  </p>
                )}
              </div>

              <div className="ny-show-photos">
                {showPhotos.slice(1).map((photo) => (
                  <figure className="ny-show-photo" key={photo.src}>
                    <TravelImage photo={photo} sizes="(max-width: 1000px) 90vw, 24vw" />
                    <figcaption>{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="ny-after" aria-labelledby="after-title">
            <header className="ny-after-head">
              <div>
                <p className="studio-label">03 / After the floor</p>
                <h2 id="after-title">The show ends at five. The city doesn&apos;t.</h2>
              </div>
              <p>
                Every evening went the same way: out of Javits, onto the 7, and into whatever was
                still open. The best light was always after the floor.
              </p>
            </header>
            <div className="ny-after-strip">
              {gallery.map((photo) => (
                <figure className="ny-after-photo" key={photo.src}>
                  <TravelImage photo={photo} sizes="(max-width: 1000px) 78vw, 33vw" />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="ny-places" id="places" aria-labelledby="places-title">
          <header className="ny-section-head">
            <div>
              <p className="studio-label">04 / The places</p>
              <h2 id="places-title">Where the days went.</h2>
            </div>
            <p className="ny-section-note">
              {stats.places} places, grouped the way the trip happened: the venue, the middle of
              the island, and the first afternoon downtown.
            </p>
          </header>

          {trip.chapters.map((chapter) => (
            <div className="ny-chapter" key={chapter.id}>
              <div className="ny-chapter-head">
                <p className="studio-label">{chapter.label}</p>
                <h3>{chapter.title}</h3>
                <p>{chapter.description}</p>
              </div>
              <ul className="ny-place-grid">
                {chapter.placeIds.map((placeId) => {
                  const place = trip.places.find((item) => item.id === placeId)
                  if (!place) return null
                  const photo = media.placePhotos[place.id]
                  return (
                    <li className="ny-place" key={place.id}>
                      <a
                        className="ny-place-link"
                        href={googleMapsPlaceUrl(place, trip)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${place.name} in Google Maps`}
                      >
                        <span className="ny-place-thumb">
                          {photo ? (
                            <TravelImage photo={photo} sizes="(max-width: 640px) 45vw, 180px" />
                          ) : (
                            <span className="ny-place-fallback" aria-hidden="true" />
                          )}
                          <span className="ny-place-index">{placeNumber(place.id)}</span>
                        </span>
                        <span className="ny-place-copy">
                          <h4>{place.name}</h4>
                          <p>{place.note}</p>
                          <span className="ny-place-map">Map <span aria-hidden="true">↗</span></span>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </section>

        {media.aside && (
          <aside className="ny-paper" aria-labelledby="paper-title">
            <div className="ny-paper-copy">
              <p className="studio-label">05 / {media.aside.label}</p>
              <h2 id="paper-title">{media.aside.title}</h2>
              <p>{media.aside.body}</p>
            </div>
            <div className="ny-paper-photos">
              {media.aside.photos.map((photo) => (
                <figure className="ny-paper-photo" key={photo.src}>
                  <TravelImage photo={photo} sizes="(max-width: 1000px) 45vw, 260px" />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </aside>
        )}

        <section className="ny-numbers" aria-labelledby="numbers-title">
          <div className="ny-numbers-copy">
            <p className="studio-label">06 / The numbers</p>
            <h2 id="numbers-title">The trip, in numbers.</h2>
            <p>
              {stats.days} days, {stats.days - 1} nights, and a camera roll that took the rest of
              the year to sort. The show was three of those days; the other two were the way in and
              the way out.
            </p>
          </div>
          <div className="ny-number-grid">
            <div><b>{stats.days}</b><span>days</span></div>
            <div><b>{stats.places}</b><span>places</span></div>
            {numbers.map((item) => (
              <div key={item.label}><b>{item.value}</b><span>{item.label}</span></div>
            ))}
          </div>
          <p className="ny-source-note">{trip.sourceNote}</p>
        </section>

        <nav className="ny-next" aria-label="Keep exploring">
          <div>
            <p className="studio-label">Next</p>
            <h2>More trips.</h2>
          </div>
          <div className="ny-next-links">
            {otherTrips.map((item) => (
              <Link href={`/travel/${item.slug}`} key={item.slug}>
                {item.name}, {item.country}
              </Link>
            ))}
            <Link href="/travel">All travel</Link>
            <Link href="/about">About Adam</Link>
          </div>
        </nav>
      </article>
    </div>
  )
}
