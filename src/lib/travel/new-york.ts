import type { Trip } from './types'

/**
 * New York City, January 2026: five days around NRF Retail's Big Show.
 * Places and captions were matched to the trip notes and the camera roll.
 * Show dates are from NRF's 2026 programme.
 */
export const newYorkTrip: Trip = {
  "slug": "new-york",
  "name": "New York City",
  "country": "United States",
  "countryCode": "US",
  "flag": "/icons/flags/united-states.svg",
  "coordinates": [
    -73.9855,
    40.758
  ],
  "dates": {
    "from": "2026-01-10",
    "to": "2026-01-14",
    "label": "10–14 January 2026"
  },
  "layout": "log",
  "featured": true,
  "headline": "Five days in New York City for NRF's Big Show",
  "event": {
    "name": "NRF '26 Retail's Big Show",
    "venue": "Jacob K. Javits Convention Center",
    "dates": "11–13 January 2026",
    "url": "https://nrfbigshow.nrf.com/"
  },
  "summary": "Five days in New York City for NRF's Big Show: three days on the expo floor at Javits, and the city before and after.",
  "intro": [
    "I was in New York City for NRF Retail's Big Show: three days on the floor at the Javits Center, with the city before and after.",
    "The trip had two halves. The first was the show — the halls, the stages, and the same words about AI and retail in every conversation. The second was everything around it: the walking, the subways, the steam, the stores. These are the notes from both."
  ],
  "publishedAt": "2026-11-14",
  "updatedAt": "2026-11-14",
  "sourceNote": "Places, captions and the store list from the trip photographs and notes. Photographs by Adam Ahsan.",
  "places": [
    {
      "id": "javits-center",
      "name": "Jacob K. Javits Convention Center",
      "area": "show",
      "coordinates": [
        -74.0021,
        40.7577
      ],
      "note": "The convention center on Eleventh Avenue, under a glass grid roof. NRF took over the whole building for three days.",
      "mapsQuery": "Jacob K. Javits Convention Center, New York",
      "source": "manual"
    },
    {
      "id": "vessel-hudson-yards",
      "name": "The Vessel, Hudson Yards",
      "area": "show",
      "coordinates": [
        -74.0023,
        40.7539
      ],
      "note": "Thomas Heatherwick's copper honeycomb, two blocks south of Javits on the way to the 7 train.",
      "mapsQuery": "The Vessel, Hudson Yards, New York",
      "source": "manual"
    },
    {
      "id": "times-square",
      "name": "Times Square",
      "area": "midtown",
      "coordinates": [
        -73.9855,
        40.758
      ],
      "note": "The crossroads at 42nd and Broadway, best after dark and in the rain.",
      "mapsQuery": "Times Square, New York",
      "source": "manual"
    },
    {
      "id": "rockefeller-center",
      "name": "Rockefeller Center",
      "area": "midtown",
      "coordinates": [
        -73.9787,
        40.7587
      ],
      "note": "The lit trees and Channel Gardens, a block from St Patrick's.",
      "mapsQuery": "Rockefeller Center, New York",
      "source": "manual"
    },
    {
      "id": "st-patricks-cathedral",
      "name": "St Patrick's Cathedral",
      "area": "midtown",
      "coordinates": [
        -73.9754,
        40.7585
      ],
      "note": "The Fifth Avenue cathedral, still glowing after the show floor closed.",
      "mapsQuery": "St. Patrick's Cathedral, New York",
      "source": "manual"
    },
    {
      "id": "empire-state-building",
      "name": "Empire State Building",
      "area": "midtown",
      "coordinates": [
        -73.9857,
        40.7484
      ],
      "note": "The 1931 tower on 34th Street, caught in the last light between two older buildings.",
      "mapsQuery": "Empire State Building, New York",
      "source": "manual"
    },
    {
      "id": "macys-herald-square",
      "name": "Macy's Herald Square",
      "area": "midtown",
      "coordinates": [
        -73.9909,
        40.7507
      ],
      "note": "The department store on 34th Street, with the \"World's Largest Store\" banner still up.",
      "mapsQuery": "Macy's Herald Square, New York",
      "source": "manual"
    },
    {
      "id": "moma-design-store",
      "name": "MoMA Design Store",
      "area": "midtown",
      "coordinates": [
        -73.978,
        40.7614
      ],
      "note": "The museum's design shop on West 53rd, where a tote bag became the souvenir of the day.",
      "mapsQuery": "MoMA Design Store, 44 W 53rd St, New York",
      "source": "manual"
    },
    {
      "id": "new-york-public-library",
      "name": "New York Public Library",
      "area": "midtown",
      "coordinates": [
        -73.9822,
        40.7532
      ],
      "note": "The Beaux-Arts library on Fifth Avenue at 42nd, with its stone lions on the steps.",
      "mapsQuery": "New York Public Library, Stephen A. Schwarzman Building",
      "source": "manual"
    },
    {
      "id": "chrysler-building",
      "name": "Chrysler Building",
      "area": "midtown",
      "coordinates": [
        -73.9755,
        40.7516
      ],
      "note": "The 1930 Art Deco tower on Lexington, its crown lit for the evening.",
      "mapsQuery": "Chrysler Building, New York",
      "source": "manual"
    },
    {
      "id": "apple-fifth-avenue",
      "name": "Apple Fifth Avenue",
      "area": "midtown",
      "coordinates": [
        -73.9725,
        40.7639
      ],
      "note": "The glass cube on the GM Building plaza, open when everything else had closed.",
      "mapsQuery": "Apple Fifth Avenue, New York",
      "source": "manual"
    },
    {
      "id": "katzs-delicatessen",
      "name": "Katz's Delicatessen",
      "area": "downtown",
      "coordinates": [
        -73.9874,
        40.7223
      ],
      "note": "The Lower East Side deli on East Houston, serving since 1888. You keep the green ticket.",
      "mapsQuery": "Katz's Delicatessen, New York",
      "source": "manual"
    },
    {
      "id": "charging-bull",
      "name": "Charging Bull",
      "area": "downtown",
      "coordinates": [
        -74.0134,
        40.7056
      ],
      "note": "Arturo Di Modica's bronze bull near Bowling Green, still wet from the evening rain.",
      "mapsQuery": "Charging Bull, Bowling Green, New York",
      "source": "manual"
    },
    {
      "id": "soho",
      "name": "SoHo",
      "area": "downtown",
      "coordinates": [
        -74.0001,
        40.7233
      ],
      "note": "The cast-iron blocks south of Houston, walked on the first afternoon and again on the store tour.",
      "mapsQuery": "SoHo, New York",
      "source": "manual"
    }
  ],
  "chapters": [
    {
      "id": "show",
      "label": "01 / At the show",
      "title": "The venue and its neighbours.",
      "description": "The Javits Center and the two blocks around it, where the three working days happened.",
      "placeIds": [
        "javits-center",
        "vessel-hudson-yards"
      ]
    },
    {
      "id": "midtown",
      "label": "02 / Midtown",
      "title": "The grid.",
      "description": "The walkable middle of the trip: the crossings, the lit facades, the shops that stayed open late.",
      "placeIds": [
        "times-square",
        "rockefeller-center",
        "st-patricks-cathedral",
        "empire-state-building",
        "macys-herald-square",
        "moma-design-store",
        "new-york-public-library",
        "chrysler-building",
        "apple-fifth-avenue"
      ]
    },
    {
      "id": "downtown",
      "label": "03 / Downtown",
      "title": "The lower island.",
      "description": "The first afternoon below Houston: lunch, the bull, and the long walk back uptown.",
      "placeIds": [
        "katzs-delicatessen",
        "charging-bull",
        "soho"
      ]
    }
  ]
}
