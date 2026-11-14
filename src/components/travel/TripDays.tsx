import Link from 'next/link'
import TravelImage from '@/components/travel/TravelImage'
import type { TravelDay } from '@/lib/travel/types'

interface TripDaysProps {
  days: TravelDay[]
}

export default function TripDays({ days }: TripDaysProps) {
  return (
    <section className="travel-section travel-section--white" id="days" aria-labelledby="days-title">
      <header className="travel-section-head">
        <div>
          <p className="studio-label">01 / The days</p>
          <h2 id="days-title">A week, in frames.</h2>
        </div>
        <div className="travel-section-intro">
          <p>
            The photos and the saved places rebuild the trip day by day: what I saw, where I
            was, and how the day fits together.
          </p>
          <p>
            Photographs by <Link href="/about">Adam Ahsan</Link>.
          </p>
        </div>
      </header>

      <div className="travel-days-grid">
        {days.map((day) => (
          <article className="travel-day" key={day.id}>
            <header className="travel-day-head">
              <p className="studio-label">{day.label}</p>
              <h3>{day.title}</h3>
            </header>

            <div className="travel-day-photos" data-count={day.photos.length}>
              {day.photos.map((photo) => (
                <figure className="travel-day-photo" key={photo.src}>
                  <TravelImage photo={photo} sizes="(max-width: 1000px) 100vw, 30vw" />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>

            <p className="travel-day-summary">{day.summary}</p>
            {day.note && <p className="travel-day-note">{day.note}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}
