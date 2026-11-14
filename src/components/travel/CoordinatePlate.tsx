import type { Trip } from '@/lib/travel/types'
import { getTripStats } from '@/lib/travel'

interface CoordinatePlateProps {
  trip: Trip
}

const plateWidth = 480
const plateHeight = 600
const inset = 26

/** A compact typographic "coordinate plate" used in place of a hero photograph. */
export default function CoordinatePlate({ trip }: CoordinatePlateProps) {
  const stats = getTripStats(trip)
  const cityPlaces = trip.places.filter((place) => place.area !== 'east')
  const bounds = {
    lonMin: 76.84,
    lonMax: 77.17,
    latMin: 43.02,
    latMax: 43.33,
  }
  const project = ([longitude, latitude]: [number, number]) => {
    const x = inset + ((longitude - bounds.lonMin) / (bounds.lonMax - bounds.lonMin)) * (plateWidth - inset * 2)
    const y = inset + ((bounds.latMax - latitude) / (bounds.latMax - bounds.latMin)) * (plateHeight - inset * 2)
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10] as const
  }
  const walks = trip.walks
    .map((walk) => walk.track.filter(([longitude, latitude]) => longitude >= bounds.lonMin && longitude <= bounds.lonMax && latitude >= bounds.latMin && latitude <= bounds.latMax))
    .filter((points) => points.length > 1)

  return (
    <figure className="travel-plate">
      <svg viewBox={`0 0 ${plateWidth} ${plateHeight}`} role="img" aria-label={`Coordinate plate for ${trip.name}, ${trip.country}`}>
        <rect width={plateWidth} height={plateHeight} fill="#003b32" />
        <g stroke="#f2eee4" strokeOpacity=".13" strokeWidth="1">
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <line key={`v${index}`} x1={inset + index * ((plateWidth - inset * 2) / 6)} y1={inset} x2={inset + index * ((plateWidth - inset * 2) / 6)} y2={plateHeight - inset} />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <line key={`h${index}`} x1={inset} y1={inset + index * ((plateHeight - inset * 2) / 7)} x2={plateWidth - inset} y2={inset + index * ((plateHeight - inset * 2) / 7)} />
          ))}
        </g>
        <rect x={inset} y={inset} width={plateWidth - inset * 2} height={plateHeight - inset * 2} fill="none" stroke="#ddf46a" strokeOpacity=".4" />

        {walks.map((points, walkIndex) => (
          <polyline
            key={walkIndex}
            points={points.map(([longitude, latitude]) => project([longitude, latitude]).join(',')).join(' ')}
            fill="none"
            stroke="#ddf46a"
            strokeWidth="1.4"
            strokeOpacity={0.55}
          />
        ))}

        {cityPlaces.map((place) => {
          const [x, y] = project(place.coordinates)
          return (
            <g key={place.id}>
              <circle cx={x} cy={y} r="3.2" fill="#ddf46a" />
              <circle cx={x} cy={y} r="7" fill="none" stroke="#ddf46a" strokeOpacity=".3" />
            </g>
          )
        })}

        <text x={inset} y={54} fill="#ddf46a" fontFamily="var(--font-geist-mono), monospace" fontSize="10" letterSpacing="2.4">
          FIELD ATLAS / KZ-01
        </text>
        <text x={plateWidth - inset} y={54} textAnchor="end" fill="#f2eee4" fillOpacity=".6" fontFamily="var(--font-geist-mono), monospace" fontSize="9" letterSpacing="1.6">
          {trip.countryCode} / {trip.coordinates[1].toFixed(2)}N {trip.coordinates[0].toFixed(2)}E
        </text>

        <text x={inset} y={plateHeight - 146} fill="#f2eee4" fontFamily="var(--font-studio-page), Arial, sans-serif" fontSize="86" fontWeight="800" letterSpacing="-4">
          {trip.name}
        </text>
        <text x={inset} y={plateHeight - 112} fill="#f2eee4" fillOpacity=".72" fontFamily="var(--font-geist-mono), monospace" fontSize="11" letterSpacing="2.2">
          {trip.country.toUpperCase()} / {trip.dates.label.toUpperCase()}
        </text>
        <line x1={inset} y1={plateHeight - 92} x2={plateWidth - inset} y2={plateHeight - 92} stroke="#f2eee4" strokeOpacity=".25" />
        <text x={inset} y={plateHeight - 66} fill="#ddf46a" fontFamily="var(--font-geist-mono), monospace" fontSize="9" letterSpacing="1.8">
          {stats.places} PLACES · {stats.walks} WALKS · {stats.distanceKm} KM
        </text>
        <text x={plateWidth - inset} y={plateHeight - 66} textAnchor="end" fill="#f2eee4" fillOpacity=".55" fontFamily="var(--font-geist-mono), monospace" fontSize="9" letterSpacing="1.8">
          {stats.climbM} M CLIMBED
        </text>

        <g stroke="#ddf46a" strokeOpacity=".7" strokeWidth="1">
          <line x1={22} y1={plateHeight - 26} x2={plateWidth - 22} y2={plateHeight - 26} />
        </g>
        <text x={inset} y={plateHeight - 36} fill="#f2eee4" fillOpacity=".5" fontFamily="var(--font-geist-mono), monospace" fontSize="8" letterSpacing="1.4">
          HAND-DRAWN ATLAS · NO BASEMAP
        </text>
      </svg>
      <figcaption className="studio-label">Almaty, Kazakhstan — atlas plate</figcaption>
    </figure>
  )
}
