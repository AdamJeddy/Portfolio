import { readFile } from 'node:fs/promises'
import test from 'node:test'
import assert from 'node:assert/strict'

const dataPath = new URL('../src/lib/travel/almaty.ts', import.meta.url)
const schemaPath = new URL('../src/lib/travel-schema.ts', import.meta.url)
const pagePath = new URL('../src/app/travel/[slug]/page.tsx', import.meta.url)
const indexPath = new URL('../src/app/travel/page.tsx', import.meta.url)
const navPath = new URL('../src/components/layout/Nav.tsx', import.meta.url)
const sitemapPath = new URL('../src/app/sitemap.ts', import.meta.url)
const cssPath = new URL('../src/app/travel/travel.css', import.meta.url)

test('almaty trip data uses the real extracted places and walks, without metro logistics', async () => {
  const data = await readFile(dataPath, 'utf8')

  assert.match(data, /"slug": "almaty"/)
  assert.match(data, /"country": "Kazakhstan"/)
  assert.match(data, /"dates": \{/)
  assert.match(data, /2026-08-15/)
  assert.match(data, /2026-08-21/)

  // Coordinates are real and inside Kazakhstan.
  const coordinates = [...data.matchAll(/"coordinates": \[\s*([\d.]+),\s*([\d.]+)\s*\]/g)].map((match) => [
    Number(match[1]),
    Number(match[2]),
  ])
  assert.equal(coordinates.length, 19) // 18 places + trip centre
  for (const [longitude, latitude] of coordinates) {
    assert.ok(longitude >= 76 && longitude <= 80, `longitude out of range: ${longitude}`)
    assert.ok(latitude >= 42 && latitude <= 44, `latitude out of range: ${latitude}`)
  }

  // Metro stations were intentionally removed from the saved list.
  assert.doesNotMatch(data, /metro|метро/i)

  // Four Strava walks with elevation profiles and researched names.
  assert.match(data, /The park and the zoo/)
  assert.match(data, /Shymbulachka Peak/)
  assert.match(data, /Kaindy Lake/)
  assert.match(data, /Big Almaty Lake/)
  const distances = [...data.matchAll(/"distanceKm": ([\d.]+)/g)].map((match) => Number(match[1]))
  assert.equal(distances.length, 4)
  assert.ok(Math.abs(distances.reduce((sum, value) => sum + value, 0) - 18.71) < 0.01)
  assert.doesNotMatch(data, /, null\]/, 'walk tracks must keep elevation values')

  // Source attribution travels with the data.
  assert.match(data, /2GIS/)
  assert.match(data, /Strava/)
})

test('travel schema resolves the site person, website, itinerary and breadcrumbs', async () => {
  const schema = await readFile(schemaPath, 'utf8')

  assert.match(schema, /'@type': 'TouristTrip'/)
  assert.match(schema, /'@type': 'BreadcrumbList'/)
  assert.match(schema, /itinerary: \{/)
  assert.match(schema, /numberOfItems: trip\.places\.length/)
  assert.match(schema, /mainEntityOfPage/)
  assert.match(schema, /personNode/)
  assert.match(schema, /websiteNode/)
  assert.match(schema, /createTravelIndexGraph/)
})

test('travel routes are navigable, metadata-bearing, sitemap-listed and statically generated', async () => {
  const [page, index, nav, sitemap] = await Promise.all([
    readFile(pagePath, 'utf8'),
    readFile(indexPath, 'utf8'),
    readFile(navPath, 'utf8'),
    readFile(sitemapPath, 'utf8'),
  ])

  assert.match(page, /generateStaticParams/)
  assert.match(page, /generateMetadata/)
  assert.match(page, /AlmatyAtlas/)
  assert.match(page, /WalkCard/)
  assert.match(page, /CoordinatePlate/)
  assert.match(page, /travel\/\$\{trip\.slug\}/)
  assert.match(index, /CoordinatePlate/)
  assert.match(nav, /href: '\/travel'/)
  assert.match(sitemap, /\$\{SITE_URL\}\/travel/)
  assert.match(sitemap, /trips\.map/)
})

test('travel controls override the global button chrome instead of inheriting it', async () => {
  const css = await readFile(cssPath, 'utf8')

  assert.match(css, /\.travel-page button\.atlas-chip/)
  assert.match(css, /\.travel-page button\.atlas-pin/)
  assert.match(css, /\.travel-page \.atlas-list button/)
  assert.match(css, /text-transform: none/)
})
