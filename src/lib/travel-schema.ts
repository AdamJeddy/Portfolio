import { PERSON_NAME, SITE_URL } from './site'
import { PERSON_ID, personNode, personReference, websiteNode, WEBSITE_ID } from './schema'
import type { Trip } from './travel/types'

interface TravelPageGraphInput {
  trip: Trip
  photo?: { src: string; alt: string }
}

/**
 * Travel pages are modelled as a TouristTrip (with the visited places as an
 * itinerary) plus an Article for dates/author. The Person and WebSite nodes are
 * published on every page so the @id references never dangle.
 */
export function createTravelGraph({ trip, photo }: TravelPageGraphInput) {
  const url = `${SITE_URL}/travel/${trip.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        '@id': `${url}#trip`,
        name: `${trip.name}, ${trip.country}`,
        description: trip.summary,
        url,
        datePublished: trip.publishedAt,
        dateModified: trip.updatedAt,
        author: personReference,
        isPartOf: { '@id': WEBSITE_ID },
        ...(photo ? { image: `${SITE_URL}${photo.src}-1600.webp` } : {}),
        itinerary: {
          '@type': 'ItemList',
          numberOfItems: trip.places.length,
          itemListElement: trip.places.map((place, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'TouristAttraction',
              name: place.name,
              geo: {
                '@type': 'GeoCoordinates',
                latitude: place.coordinates[1],
                longitude: place.coordinates[0],
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: trip.name,
                addressCountry: trip.countryCode,
              },
            },
          })),
        },
      },
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: `A week in ${trip.name}, ${trip.country}`,
        description: trip.summary,
        datePublished: `${trip.publishedAt}T00:00:00+04:00`,
        dateModified: `${trip.updatedAt}T00:00:00+04:00`,
        author: personReference,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        isPartOf: { '@id': WEBSITE_ID },
        ...(photo ? { image: { '@type': 'ImageObject', url: `${SITE_URL}${photo.src}-1600.webp`, caption: photo.alt } } : {}),
        publisher: { '@id': PERSON_ID, name: PERSON_NAME, url: SITE_URL },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Travel', item: `${SITE_URL}/travel` },
          { '@type': 'ListItem', position: 3, name: trip.name, item: url },
        ],
      },
      personNode,
      websiteNode,
    ],
  }
}

export function createTravelIndexGraph(trips: Trip[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/travel#collection`,
        url: `${SITE_URL}/travel`,
        name: 'Travel',
        description: 'Places I have been, the walks I logged, and the notes I brought back.',
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: trips.length,
          itemListElement: trips.map((trip, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'TouristTrip',
              name: `${trip.name}, ${trip.country}`,
              url: `${SITE_URL}/travel/${trip.slug}`,
              description: trip.summary,
            },
          })),
        },
      },
      personNode,
      websiteNode,
    ],
  }
}
