import Link from 'next/link'
import TravelImage from '@/components/travel/TravelImage'
import { formatCoordinates } from '@/lib/travel'
import type { TravelPhoto, Trip } from '@/lib/travel/types'

interface TravelCoverProps {
  trip: Trip
  photo: TravelPhoto
}

export default function TravelCover({ trip, photo }: TravelCoverProps) {
  return (
    <header className="travel-cover" aria-labelledby="trip-title">
      <div className="travel-cover-media">
        <TravelImage photo={photo} priority sizes="100vw" />
      </div>
      <div className="travel-cover-shade" aria-hidden="true" />
      <div className="travel-cover-copy">
        <p className="studio-label travel-kicker">
          <Link href="/travel">Travel</Link>
          <span>/</span>
          <span>
            <span
              className="travel-flag"
              role="img"
              aria-label="Flag of Kazakhstan"
              style={{ backgroundImage: `url(${trip.flag})` }}
            />
            {trip.country}
          </span>
        </p>
        <h1 id="trip-title">{trip.name}</h1>
        <p className="travel-cover-meta">
          {trip.country} · {trip.dates.label} · {formatCoordinates(trip.coordinates)}
        </p>
      </div>
      <p className="travel-cover-credit">
        {photo.caption} · photograph by Adam Ahsan
      </p>
    </header>
  )
}
