import { access, readFile, readdir } from 'node:fs/promises'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import assert from 'node:assert/strict'

const dataPath = new URL('../src/lib/travel/almaty.ts', import.meta.url)
const mediaPath = new URL('../src/lib/travel/almaty-media.ts', import.meta.url)
const newYorkDataPath = new URL('../src/lib/travel/new-york.ts', import.meta.url)
const newYorkMediaPath = new URL('../src/lib/travel/new-york-media.ts', import.meta.url)
const newYorkComponentPath = new URL('../src/components/travel/NewYorkTrip.tsx', import.meta.url)
const schemaPath = new URL('../src/lib/travel-schema.ts', import.meta.url)
const pagePath = new URL('../src/app/travel/[slug]/page.tsx', import.meta.url)
const indexPath = new URL('../src/app/travel/page.tsx', import.meta.url)
const navPath = new URL('../src/components/layout/Nav.tsx', import.meta.url)
const sitemapPath = new URL('../src/app/sitemap.ts', import.meta.url)
const cssPath = new URL('../src/app/travel/travel.css', import.meta.url)
const publicRoot = new URL('../public/', import.meta.url)

test('almaty trip data uses the real extracted places and manual additions', async () => {
  const data = await readFile(dataPath, 'utf8')

  assert.match(data, /"slug": "almaty"/)
  assert.match(data, /"country": "Kazakhstan"/)
  assert.match(data, /"dates": \{/)
  assert.match(data, /"highestPoint": \{/)
  assert.match(data, /2026-08-15/)
  assert.match(data, /2026-08-21/)

  // Coordinates are real and inside Kazakhstan.
  const coordinates = [...data.matchAll(/"coordinates": \[\s*([\d.]+),\s*([\d.]+)\s*\]/g)].map((match) => [
    Number(match[1]),
    Number(match[2]),
  ])
  assert.equal(coordinates.length, 17) // 16 places + trip centre
  for (const [longitude, latitude] of coordinates) {
    assert.ok(longitude >= 76 && longitude <= 80, `longitude out of range: ${longitude}`)
    assert.ok(latitude >= 42 && latitude <= 44, `latitude out of range: ${latitude}`)
  }

  // Metro stations were intentionally removed from the saved list.
  assert.doesNotMatch(data, /metro|метро/i)

  assert.doesNotMatch(data, /"walks"/)

  // Source attribution travels with the data.
  assert.match(data, /2GIS/)
  assert.doesNotMatch(data, /Strava/i)
})

test('curated media maps photos to days and places with real files', async () => {
  const media = await readFile(mediaPath, 'utf8')
  const days = [...media.matchAll(/"id": "day-\d+"/g)].length
  assert.equal(days, 6, 'six day cards (departure day removed)')

  assert.match(media, /"hero": \{/)
  assert.match(media, /"caption": "Above Big Almaty Lake"/)
  assert.match(media, /"placePhotos": \{/)
  assert.match(media, /"panfilov-park":/)
  assert.match(media, /"aside": \{/)
  assert.match(media, /Maxi Ice Tea/)
  assert.match(media, /"caption": "Lemon green tea"/)
  assert.match(media, /Someone in Almaty recommended/)
  assert.match(media, /I booked a guide online/)
  assert.match(media, /no ride-hailing cars/)
  assert.match(media, /"ascension-cathedral":/)

  // Every photo path is a local travel asset and has a generated small variant.
  const sources = [...media.matchAll(/"src": "(\/images\/travel\/almaty\/[a-z0-9-]+)"/g)].map((match) => match[1])
  assert.ok(sources.length >= 19, `expected at least 19 photo references, got ${sources.length}`)
  for (const source of new Set(sources)) {
    const file = new URL(`.${source}-360.webp`, publicRoot)
    const heroFile = new URL(`.${source}-480.webp`, publicRoot)
    const existsSmall = await access(file).then(() => true).catch(() => false)
    const existsHero = await access(heroFile).then(() => true).catch(() => false)
    assert.ok(existsSmall || existsHero, `missing generated photo variants for ${source}`)
  }

  // Photo mapping keys correspond to real places and walks.
  const data = await readFile(dataPath, 'utf8')
  const placeIds = new Set([...data.matchAll(/"id": "([a-z0-9-]+)"/g)].map((match) => match[1]))
  const placePhotoBlock = media.match(/"placePhotos": \{([\s\S]*?)\n  \}/)?.[1] ?? ''
  for (const match of placePhotoBlock.matchAll(/^\s{4}"([a-z0-9-]+)":/gm)) {
    assert.ok(placeIds.has(match[1]), `unknown place id in media map: ${match[1]}`)
  }

  // Every day has photos and an in-range date.
  assert.match(media, /"date": "2026-08-15"/)
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
  assert.match(page, /TravelCover/)
  assert.match(page, /TripDays/)
  assert.match(page, /TravelImage/)
  assert.match(page, /travel\/\$\{trip\.slug\}/)
  assert.match(index, /title: 'Travel notes: places I/)
  assert.doesNotMatch(page, /places, photographs & field notes/)
  assert.match(index, /TravelImage/)
  assert.match(index, /getTripMedia\(trip\.slug\)/)
  assert.match(nav, /href: '\/travel'/)
  assert.match(sitemap, /\$\{SITE_URL\}\/travel/)
  assert.match(sitemap, /trips\.map/)
})

test('travel controls override the global button chrome and photo layouts exist', async () => {
  const css = await readFile(cssPath, 'utf8')

  assert.match(css, /\.travel-cover/)
  assert.match(css, /\.travel-days-grid/)
  assert.match(css, /\.travel-day-photo::after/)
  assert.match(css, /\.travel-place-thumb/)
  assert.match(css, /\.travel-place-map/)
  assert.match(css, /body:has\(\.travel-page\) \.mobile-container \.mobile-menu-index/)
  assert.match(css, /\.travel-aside/)
})

test('travel photos ship without camera, location or colour metadata', async () => {
  const directory = new URL('../public/images/travel/almaty/', import.meta.url)
  const files = (await readdir(directory)).filter((file) => file.endsWith('.webp'))
  assert.ok(files.length > 30, `expected at least 30 generated photos, got ${files.length}`)
  for (const file of files) {
    const metadata = await sharp(fileURLToPath(new URL(file, directory))).metadata()
    assert.equal(metadata.exif, undefined, `${file} carries EXIF`)
    assert.equal(metadata.icc, undefined, `${file} carries an ICC profile`)
    assert.equal(metadata.xmp, undefined, `${file} carries XMP`)
    assert.equal(metadata.iptc, undefined, `${file} carries IPTC`)
  }
})

test('place coordinates link out to Google Maps', async () => {
  const [page, travel] = await Promise.all([readFile(pagePath, 'utf8'), readFile(new URL('../src/lib/travel.ts', import.meta.url), 'utf8')])
  assert.match(travel, /https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/)
  assert.match(page, /googleMapsPlaceUrl\(place\)/)
  assert.match(page, /googleMapsUrl\(trip\.coordinates\)/)
  assert.match(page, /2gis\.kz\/almaty\/favorites\/shared\/cf77f8b9-7b90-48e8-b865-876330fc6723/)
})

test('new york trip data is the January NRF trip', async () => {
  const data = await readFile(newYorkDataPath, 'utf8')

  assert.match(data, /"slug": "new-york"/)
  assert.match(data, /"country": "United States"/)
  assert.match(data, /"layout": "log"/)
  assert.match(data, /"featured": true/)
  assert.match(data, /2026-01-10/)
  assert.match(data, /2026-01-14/)
  assert.match(data, /"name": "New York City"/)
  assert.match(data, /"name": "NRF '26 Retail's Big Show"/)
  assert.doesNotMatch(data, /"flights"|"photographs"|"videos"|"numbers"/)

  const coordinates = [...data.matchAll(/"coordinates": \[\s*(-?[\d.]+),\s*([\d.]+)\s*\]/g)].map((match) => [
    Number(match[1]),
    Number(match[2]),
  ])
  assert.equal(coordinates.length, 15) // 14 places + trip centre
  for (const [longitude, latitude] of coordinates) {
    assert.ok(longitude >= -74.1 && longitude <= -73.9, `longitude out of range: ${longitude}`)
    assert.ok(latitude >= 40.6 && latitude <= 40.8, `latitude out of range: ${latitude}`)
  }

  const flag = await access(new URL('../public/icons/flags/united-states.svg', import.meta.url))
    .then(() => true)
    .catch(() => false)
  assert.ok(flag, 'missing US flag asset')
})

test('new york media maps the five days, the show, the gallery and the store tour', async () => {
  const media = await readFile(newYorkMediaPath, 'utf8')

  assert.equal([...media.matchAll(/"id": "day-\d+"/g)].length, 5)
  assert.match(media, /"caption": "Times Square"/)
  assert.match(media, /"caption": "Unparalleled parking"/)
  assert.match(media, /"caption": "Apple Store, Prince Street"/)
  assert.match(media, /"caption": "Charging Bull"/)
  assert.match(media, /"showPhotos": \[/)
  assert.match(media, /"gallery": \[/)
  assert.match(media, /"preview": \[/)
  assert.match(media, /"tour": \{/)
  assert.match(media, /"stops": \[/)
  assert.match(media, /"caption": "Antonio Marras"/)
  assert.match(media, /"caption": "Mulberry"/)
  assert.match(media, /"caption": "Gucci"/)
  assert.match(media, /"caption": "Buck Mason"/)
  assert.match(media, /"caption": "Arc'teryx"/)
  assert.doesNotMatch(media, /"caption": "Etro"|"caption": "Ralph Lauren"|"caption": "The RealReal"|"caption": "Aimé Leon Dore"/)
  assert.match(media, /"note": "Later, on my own, I went back for Gymshark\."/)
  assert.doesNotMatch(media, /"aside":|paper-|EK204|6:32 pm/)
  assert.doesNotMatch(media, /receipts/i)

  const sources = [...media.matchAll(/"src": "(\/images\/travel\/new-york\/[a-z0-9-]+)"/g)].map((match) => match[1])
  assert.ok(sources.length >= 40, `expected at least 40 photo references, got ${sources.length}`)
  for (const source of new Set(sources)) {
    const variants = await Promise.all(
      [360, 480, 720, 960].map((width) =>
        access(new URL(`.${source}-${width}.webp`, publicRoot)).then(() => true).catch(() => false),
      ),
    )
    assert.ok(variants.some(Boolean), `missing generated photo variants for ${source}`)
  }
})

test('new york photos ship without camera metadata', async () => {
  const directory = new URL('../public/images/travel/new-york/', import.meta.url)
  const files = (await readdir(directory)).filter((file) => file.endsWith('.webp'))
  assert.ok(files.length >= 60, `expected at least 60 generated photos, got ${files.length}`)
  for (const file of files) {
    const metadata = await sharp(fileURLToPath(new URL(file, directory))).metadata()
    assert.equal(metadata.exif, undefined, `${file} carries EXIF`)
    assert.equal(metadata.icc, undefined, `${file} carries an ICC profile`)
    assert.equal(metadata.xmp, undefined, `${file} carries XMP`)
    assert.equal(metadata.iptc, undefined, `${file} carries IPTC`)
  }
})

test('the new york log layout is wired into the trip route and featured index', async () => {
  const [component, page, index, travel] = await Promise.all([
    readFile(newYorkComponentPath, 'utf8'),
    readFile(pagePath, 'utf8'),
    readFile(indexPath, 'utf8'),
    readFile(new URL('../src/lib/travel.ts', import.meta.url), 'utf8'),
  ])

  assert.match(component, /ny-hero/)
  assert.match(component, /media\.showPhotos/)
  assert.match(component, /day\.tour/)
  assert.match(component, /ny-number-rail/)
  assert.match(component, /googleMapsPlaceUrl\(place, trip\)/)
  assert.match(component, /media\.days\.map/)
  assert.doesNotMatch(component, /media\.aside|trip\.flights|ny-beats|trip\.numbers|ny-hero-strip/)
  assert.match(page, /trip\.layout === 'log'/)
  assert.match(page, /NewYorkTrip/)
  assert.match(index, /featuredTrip/)
  assert.match(index, /previewMedia\?\.preview/)
  assert.match(index, /Flag of \$\{trip\.country\}/)
  assert.match(travel, /newYorkTrip/)
  assert.match(travel, /featuredTrip/)
})
