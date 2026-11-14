import Link from 'next/link'
import TravelImage from '@/components/travel/TravelImage'
import { formatMinutes } from '@/lib/travel'
import type { TravelDay, TravelWalk, Trip } from '@/lib/travel/types'

interface TripDaysProps {
  trip: Trip
  days: TravelDay[]
}

function walkFor(trip: Trip, walkId?: string): TravelWalk | undefined {
  return walkId ? trip.walks.find((walk) => walk.id === walkId) : undefined
}

export default function TripDays({ trip, days }: TripDaysProps) {
  return (
    <section className="travel-section travel-section--white" id="days" aria-labelledby="days-title">
      <header className="travel-section-head">
        <div>
          <p className="studio-label">01 / The days</p>
          <h2 id="days-title">A week, in frames.</h2>
        </div>
        <div className="travel-section-intro">
          <p>
            The photos carry their own timestamps, so the trip can be reconstructed from the
            frames: where I was, when, and which walk was logged on Strava that day.
          </p>
          <p>
            Times below are local (UTC+5). Photographs by{' '}
            <Link href="/about">Adam Ahsan</Link>.
          </p>
        </div>
      </header>

      <div className="travel-days-grid">
        {days.map((day) => {
          const walk = walkFor(trip, day.walkId)
          return (
            <article className="travel-day" key={day.id}>
              <header className="travel-day-head">
                <p className="studio-label">{day.label}</p>
                <h3>{day.title}</h3>
              </header>

              <div className="travel-day-photos" data-count={day.photos.length}>
                {day.photos.map((photo) => (
                  <figure className="travel-day-photo" key={photo.src}>
                    <TravelImage
                      photo={photo}
                      sizes="(max-width: 1000px) 100vw, 30vw"
                    />
                    <figcaption>
                      <span>{photo.caption}</span>
                      <time>{photo.time}</time>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <p className="travel-day-summary">{day.summary}</p>

              {walk && (
                <p className="travel-day-activity">
                  <a href="#walks">
                    Strava · {walk.type.toLowerCase()} · {walk.distanceKm.toFixed(1)} km ·{' '}
                    {formatMinutes(walk.movingMin)}
                  </a>
                </p>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
