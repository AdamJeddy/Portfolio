'use client'

import { useMemo, useState } from 'react'
import TravelImage from '@/components/travel/TravelImage'
import type { TravelArea, TravelPhoto, TravelPlace, TravelWalk } from '@/lib/travel/types'

interface AlmatyAtlasProps {
  places: TravelPlace[]
  walks: TravelWalk[]
  placePhotos: Record<string, TravelPhoto>
}

type View = 'city' | 'region'
type Filter = 'all' | TravelArea

const WIDTH = 780
const HEIGHT = 520
const WALK_COLORS = ['#0047ff', '#c9402f', '#198700', '#7b3fb5']

const PANELS: Record<View, { lonMin: number; lonMax: number; latMin: number; latMax: number; label: string }> = {
  city: { lonMin: 76.88, lonMax: 77.17, latMin: 43.02, latMax: 43.34, label: 'The city' },
  region: { lonMin: 76.7, lonMax: 79.35, latMin: 42.95, latMax: 43.42, label: 'The region' },
}

const AREA_LABELS: Record<TravelArea, string> = {
  city: 'City',
  mountains: 'Mountains',
  east: 'East',
}

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'city', label: 'City' },
  { id: 'mountains', label: 'Mountains' },
  { id: 'east', label: 'East' },
]

function project(view: View, [longitude, latitude]: [number, number]) {
  const panel = PANELS[view]
  const x = ((longitude - panel.lonMin) / (panel.lonMax - panel.lonMin)) * WIDTH
  const y = ((panel.latMax - latitude) / (panel.latMax - panel.latMin)) * HEIGHT
  return [x, y] as const
}

function inPanel(view: View, [longitude, latitude]: [number, number]) {
  const panel = PANELS[view]
  return longitude >= panel.lonMin && longitude <= panel.lonMax && latitude >= panel.latMin && latitude <= panel.latMax
}

interface PinLayout {
  place: TravelPlace
  index: number
  trueX: number
  trueY: number
  x: number
  y: number
  shifted: boolean
}

/**
 * Places in Almaty cluster tightly (the bazaar, cathedral, mosque, museum and
 * zoo sit within a couple of kilometres). Greedy deterministic spreading keeps
 * pins tappable without a mapping library; a dashed leader ties each pin back
 * to its real coordinate.
 */
function layoutPins(view: View, places: TravelPlace[]): PinLayout[] {
  const offsets: Array<[number, number]> = [[0, 0]]
  for (let ring = 1; ring <= 3; ring += 1) {
    const radius = ring * 26
    for (let step = 0; step < 10; step += 1) {
      const angle = (step / 10) * Math.PI * 2 + ring * 0.4
      offsets.push([Math.cos(angle) * radius, Math.sin(angle) * radius * 0.8])
    }
  }

  const placed: Array<{ x: number; y: number }> = []
  const result: PinLayout[] = []

  places.forEach((place, index) => {
    if (!inPanel(view, place.coordinates)) return
    const [trueX, trueY] = project(view, place.coordinates)
    let x = trueX
    let y = trueY
    let shifted = false

    for (const [dx, dy] of offsets) {
      const candidateX = Math.max(20, Math.min(WIDTH - 20, trueX + dx))
      const candidateY = Math.max(20, Math.min(HEIGHT - 20, trueY + dy))
      const free = placed.every((pin) => Math.hypot(pin.x - candidateX, pin.y - candidateY) >= 32)
      if (free) {
        x = candidateX
        y = candidateY
        shifted = dx !== 0 || dy !== 0
        break
      }
    }

    placed.push({ x, y })
    result.push({ place, index: index + 1, trueX, trueY, x, y, shifted })
  })

  return result
}

export default function AlmatyAtlas({ places, walks, placePhotos }: AlmatyAtlasProps) {
  const [view, setView] = useState<View>('city')
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedId, setSelectedId] = useState<string>(places[0]?.id ?? '')
  const [showWalks, setShowWalks] = useState(true)

  const selected = places.find((place) => place.id === selectedId) ?? null
  const selectedIndex = selected ? places.findIndex((place) => place.id === selected.id) + 1 : null

  const pins = useMemo(() => layoutPins(view, places), [places, view])

  const routes = useMemo(
    () =>
      walks.map((walk, index) => ({
        id: walk.id,
        name: walk.name,
        color: WALK_COLORS[index % WALK_COLORS.length],
        date: walk.date,
        points: walk.track
          .filter(([longitude, latitude]) => inPanel(view, [longitude, latitude]))
          .map(([longitude, latitude]) => project(view, [longitude, latitude])),
      })),
    [walks, view],
  )

  const filteredPlaces = places.filter((place) => filter === 'all' || place.area === filter)
  const dimmed = (place: TravelPlace) => filter !== 'all' && place.area !== filter

  const choosePlace = (place: TravelPlace) => {
    setSelectedId(place.id)
    if (!inPanel(view, place.coordinates)) setView('region')
  }

  return (
    <div className="atlas">
      <div className="atlas-main">
        <div className="atlas-toolbar">
          <div className="atlas-views" role="group" aria-label="Map scale">
            {(['city', 'region'] as View[]).map((option) => (
              <button
                key={option}
                type="button"
                className={`atlas-chip ${view === option ? 'is-on' : ''}`}
                onClick={() => setView(option)}
                aria-pressed={view === option}
              >
                {PANELS[option].label}
              </button>
            ))}
          </div>
          <div className="atlas-layers">
            <button
              type="button"
              className={`atlas-chip ${showWalks ? 'is-on' : ''}`}
              onClick={() => setShowWalks((current) => !current)}
              aria-pressed={showWalks}
            >
              Walks
            </button>
          </div>
        </div>

        <div className="atlas-map" role="group" aria-label={`Atlas map of ${PANELS[view].label.toLowerCase()}, ${pins.length} places and ${routes.length} walks`}>
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true" focusable="false">
            <rect width={WIDTH} height={HEIGHT} fill="#efe9db" />
            <g stroke="#080907" strokeOpacity=".1" strokeWidth="1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                <line key={`v-${index}`} x1={(WIDTH / 10) * index} y1="0" x2={(WIDTH / 10) * index} y2={HEIGHT} />
              ))}
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <line key={`h-${index}`} x1="0" y1={(HEIGHT / 7) * index} x2={WIDTH} y2={(HEIGHT / 7) * index} />
              ))}
            </g>

            <g fontFamily="var(--font-geist-mono), monospace" fill="#080907" fillOpacity=".45" fontSize="10" letterSpacing="2">
              <text x="24" y="34">{PANELS[view].latMax.toFixed(2)} N / {PANELS[view].lonMin.toFixed(2)} E</text>
              <text x={WIDTH - 24} y={HEIGHT - 22} textAnchor="end">
                {PANELS[view].latMin.toFixed(2)} N / {PANELS[view].lonMax.toFixed(2)} E
              </text>
            </g>

            <g fontFamily="var(--font-geist-mono), monospace" fill="#080907" fillOpacity=".3" fontSize="11" letterSpacing="2.5">
              {view === 'city' ? (
                <>
                  <text x={WIDTH * 0.34} y={HEIGHT * 0.56}>ALMATY</text>
                  <text x={WIDTH * 0.72} y={HEIGHT * 0.86}>TRANS-ILI ALATAU</text>
                  <text x={WIDTH * 0.3} y={HEIGHT * 0.84}>BIG ALMATY LAKE</text>
                </>
              ) : (
                <>
                  <text x={WIDTH * 0.2} y={HEIGHT * 0.58}>ALMATY</text>
                  <text x={WIDTH * 0.86} y={HEIGHT * 0.1}>CHARYN</text>
                  <text x={WIDTH * 0.66} y={HEIGHT * 0.9}>KAINDY</text>
                  <text x={WIDTH * 0.48} y={HEIGHT * 0.72}>TIEN SHAN</text>
                </>
              )}
            </g>

            {showWalks &&
              routes.map((route) =>
                route.points.length > 1 ? (
                  <g key={route.id}>
                    <polyline
                      points={route.points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')}
                      fill="none"
                      stroke={route.color}
                      strokeWidth="2.4"
                      strokeOpacity=".85"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx={route.points[0][0]} cy={route.points[0][1]} r="3" fill={route.color} />
                  </g>
                ) : null,
              )}

            <g stroke="#080907" strokeOpacity=".3" strokeWidth="1" strokeDasharray="2 3">
              {pins.filter((pin) => pin.shifted).map((pin) => (
                <line key={`leader-${pin.place.id}`} x1={pin.trueX} y1={pin.trueY} x2={pin.x} y2={pin.y} />
              ))}
            </g>
            {pins.filter((pin) => pin.shifted).map((pin) => (
              <circle key={`anchor-${pin.place.id}`} cx={pin.trueX} cy={pin.trueY} r="1.8" fill="#080907" fillOpacity=".45" />
            ))}

            <g stroke="#080907" strokeOpacity=".35" strokeWidth="1">
              <line x1={WIDTH - 74} y1="44" x2={WIDTH - 74} y2="24" />
              <line x1={WIDTH - 84} y1="34" x2={WIDTH - 64} y2="34" />
            </g>
            <text x={WIDTH - 74} y="60" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fontSize="9" fill="#080907" fillOpacity=".5">N</text>
          </svg>

          <div className="atlas-pins">
            {pins.map(({ place, index, x, y }) => {
              const active = place.id === selectedId
              return (
                <button
                  key={place.id}
                  type="button"
                  className={`atlas-pin ${active ? 'is-active' : ''} ${dimmed(place) ? 'is-dimmed' : ''}`}
                  style={{ left: `${(x / WIDTH) * 100}%`, top: `${(y / HEIGHT) * 100}%` }}
                  onClick={() => choosePlace(place)}
                  aria-pressed={active}
                  aria-label={`Place ${String(index).padStart(2, '0')}: ${place.name}${place.note ? `. ${place.note}` : ''}`}
                >
                  {String(index).padStart(2, '0')}
                </button>
              )
            })}
          </div>

          {showWalks && (
            <div className="atlas-legend" aria-label="Walking routes">
              <span>
                <i style={{ background: '#0047ff' }} aria-hidden="true" />
                Walked routes
              </span>
            </div>
          )}
        </div>
      </div>

      <aside className="atlas-side" aria-label="Atlas places">
        <div className="atlas-filters" role="group" aria-label="Filter places">
          {FILTERS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`atlas-chip ${filter === option.id ? 'is-on' : ''}`}
              onClick={() => setFilter(option.id)}
              aria-pressed={filter === option.id}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="atlas-selected" aria-live="polite">
          {selected ? (
            <>
              {placePhotos[selected.id] && (
                <figure className="atlas-selected-photo">
                  <TravelImage
                    photo={placePhotos[selected.id]}
                    sizes="(max-width: 1000px) 90vw, 260px"
                  />
                  <figcaption>{placePhotos[selected.id].caption}</figcaption>
                </figure>
              )}
              <p className="studio-label">
                {selectedIndex !== null ? String(selectedIndex).padStart(2, '0') : '—'} / {AREA_LABELS[selected.area]}
              </p>
              <h3>{selected.name}</h3>
              <p>{selected.note}</p>
              <p className="atlas-coords">
                {selected.coordinates[1].toFixed(4)}° N, {selected.coordinates[0].toFixed(4)}° E
              </p>
            </>
          ) : (
            <p>Tap a pin to read about a place.</p>
          )}
        </div>

        <ol className="atlas-list">
          {filteredPlaces.map((place) => {
            const index = places.findIndex((item) => item.id === place.id) + 1
            return (
              <li key={place.id}>
                <button
                  type="button"
                  className={place.id === selectedId ? 'is-active' : ''}
                  onClick={() => choosePlace(place)}
                  aria-pressed={place.id === selectedId}
                >
                  <span>{String(index).padStart(2, '0')}</span>
                  <span className="atlas-list-name">
                    {placePhotos[place.id] && (
                      // eslint-disable-next-line @next/next/no-img-element -- static export, pre-generated WebP thumb
                      <img
                        src={`${placePhotos[place.id].src}-360.webp`}
                        alt=""
                        width="34"
                        height="28"
                        loading="lazy"
                      />
                    )}
                    {place.name}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </aside>
    </div>
  )
}
