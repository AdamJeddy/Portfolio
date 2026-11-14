import type { TravelWalk } from '@/lib/travel/types'
import { formatMinutes, formatWalkDay } from '@/lib/travel'

interface WalkCardProps {
  walk: TravelWalk
  index: number
}

function elevationProfile(walk: TravelWalk) {
  const points = walk.track
    .map(([, , elevation], index) => ({ index, elevation }))
    .filter((point): point is { index: number; elevation: number } => typeof point.elevation === 'number')
  if (points.length < 2) return null

  const width = 320
  const height = 84
  const minimum = Math.min(...points.map((point) => point.elevation))
  const maximum = Math.max(...points.map((point) => point.elevation))
  const range = Math.max(maximum - minimum, 1)
  const step = width / (points.length - 1)

  const coordinates = points.map((point, index) => {
    const x = index * step
    const y = height - 8 - ((point.elevation - minimum) / range) * (height - 20)
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10]
  })
  const line = coordinates.map(([x, y]) => `${x},${y}`).join(' ')
  const area = `0,${height} ${line} ${width},${height}`

  return { line, area, width, height, minimum, maximum }
}

export default function WalkCard({ walk, index }: WalkCardProps) {
  const profile = elevationProfile(walk)
  const walkNumber = String(index + 1).padStart(2, '0')

  return (
    <article className="travel-walk">
      <header className="travel-walk-head">
        <p className="studio-label">{walk.type} {walkNumber} / {formatWalkDay(walk.date)}</p>
        <h3>{walk.name}</h3>
        <p className="travel-walk-note">{walk.note}</p>
      </header>

      {profile && (
        <figure className="travel-walk-profile">
          <svg viewBox={`0 0 ${profile.width} ${profile.height}`} role="img" aria-label={`Elevation profile for ${walk.name}, from ${profile.minimum} to ${profile.maximum} metres`}>
            <polygon points={profile.area} fill="#ddf46a" stroke="none" />
            <polyline points={profile.line} fill="none" stroke="#080907" strokeWidth="1.4" />
          </svg>
          <figcaption>
            <span>{profile.minimum} m</span>
            <span>{profile.maximum} m</span>
          </figcaption>
        </figure>
      )}

      <dl className="travel-walk-stats">
        <div><dt>Distance</dt><dd>{walk.distanceKm.toFixed(1)} km</dd></div>
        <div><dt>Moving</dt><dd>{formatMinutes(walk.movingMin)}</dd></div>
        <div><dt>Climb</dt><dd>{walk.elevationGainM} m</dd></div>
        <div><dt>Window</dt><dd>{walk.startLocal}–{walk.endLocal}</dd></div>
      </dl>
    </article>
  )
}
