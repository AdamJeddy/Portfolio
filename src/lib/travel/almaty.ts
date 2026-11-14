import type { Trip } from './types'

/** Real data from the August 2026 Almaty trip: 2GIS saved places and manual additions. */
export const almatyTrip: Trip = {
  "slug": "almaty",
  "name": "Almaty",
  "country": "Kazakhstan",
  "countryCode": "KZ",
  "flag": "/icons/flags/kazakhstan.svg",
  "coordinates": [
    76.8897,
    43.2389
  ],
  "dates": {
    "from": "2026-08-15",
    "to": "2026-08-21",
    "label": "15–21 August 2026"
  },
  "highestPoint": {
    "name": "Shymbulak Peak",
    "elevationM": 3300
  },
  "summary": "A week in Almaty: the city on foot, the mountains behind it, and a long way east to the lakes and canyons.",
  "intro": [
    "I spent the last week of August 2026 in Almaty. No itinerary beyond a saved list of places; this is what came out of it."
  ],
  "publishedAt": "2026-11-14",
  "updatedAt": "2026-11-14",
  "sourceNote": "Places from my 2GIS list and notes from the trip. Photographs by Adam Ahsan.",
  "places": [
    {
      "id": "panfilov-park",
      "name": "Panfilov Park",
      "area": "city",
      "coordinates": [
        76.9547,
        43.2475
      ],
      "note": "The central park, built around the cathedral and its war memorial.",
      "mapsQuery": "Panfilov Park, Almaty",
      "source": "manual"
    },
    {
      "id": "ascension-cathedral",
      "name": "Ascension Cathedral",
      "area": "city",
      "coordinates": [
        76.9533075,
        43.2588871
      ],
      "note": "A wooden cathedral in Panfilov Park, completed in 1907.",
      "mapsQuery": "Ascension Cathedral, Almaty",
      "source": "2gis"
    },
    {
      "id": "green-bazaar",
      "name": "Green Bazaar",
      "area": "city",
      "coordinates": [
        76.9550765,
        43.263576
      ],
      "note": "The city's main bazaar, on Zhibek Zholy.",
      "mapsQuery": "Green Bazaar, Almaty",
      "source": "2gis"
    },
    {
      "id": "almaty-central-mosque",
      "name": "Almaty Central Mosque",
      "area": "city",
      "coordinates": [
        76.9531587,
        43.2683723
      ],
      "note": "The main mosque, on Pushkin Street.",
      "mapsQuery": "Almaty Central Mosque",
      "source": "2gis"
    },
    {
      "id": "kasteyev-art-museum",
      "name": "Kasteyev Art Museum",
      "area": "city",
      "coordinates": [
        76.9195,
        43.2356
      ],
      "note": "The national art museum in Koktem-3, named after Abilkhan Kasteyev.",
      "mapsQuery": "A. Kasteyev State Museum of Arts, Almaty",
      "source": "manual"
    },
    {
      "id": "central-state-museum",
      "name": "Central State Museum",
      "area": "city",
      "coordinates": [
        76.9504872,
        43.2359332
      ],
      "note": "The country's largest museum, in the Samal-1 district.",
      "mapsQuery": "Central State Museum of the Republic of Kazakhstan, Almaty",
      "source": "2gis"
    },
    {
      "id": "almaty-zoo",
      "name": "Almaty Zoo",
      "area": "city",
      "coordinates": [
        76.9739673,
        43.2634465
      ],
      "note": "The city zoo, north of the centre.",
      "mapsQuery": "Almaty Zoo",
      "source": "2gis"
    },
    {
      "id": "central-park",
      "name": "Central Park",
      "area": "city",
      "coordinates": [
        76.965762,
        43.2613429
      ],
      "note": "Gorky Central Park, north of the centre.",
      "mapsQuery": "Gorky Central Park, Almaty",
      "source": "2gis"
    },
    {
      "id": "medeu",
      "name": "Medeu",
      "area": "mountains",
      "coordinates": [
        77.0594,
        43.1577
      ],
      "note": "The high-altitude skating rink, at 1,690 m.",
      "mapsQuery": "Medeu Skating Rink, Almaty",
      "source": "manual"
    },
    {
      "id": "medeu-cable-car",
      "name": "Medeu cable car",
      "area": "mountains",
      "coordinates": [
        77.0515569,
        43.162764
      ],
      "note": "The gondola that climbs from Medeu to Shymbulak.",
      "mapsQuery": "Medeu-Shymbulak Gondola, Almaty",
      "source": "2gis"
    },
    {
      "id": "shymbulak",
      "name": "Shymbulak",
      "area": "mountains",
      "coordinates": [
        77.0821594,
        43.1277367
      ],
      "note": "The ski resort above Medeu, around 2,200 m.",
      "mapsQuery": "Shymbulak Ski Resort, Almaty",
      "source": "2gis"
    },
    {
      "id": "big-almaty-lake",
      "name": "Big Almaty Lake",
      "area": "mountains",
      "coordinates": [
        76.9861785,
        43.0503553
      ],
      "note": "A turquoise reservoir at roughly 2,500 m, in the Trans-Ili Alatau.",
      "mapsQuery": "Big Almaty Lake, Kazakhstan",
      "source": "2gis"
    },
    {
      "id": "kaindy-lake",
      "name": "Kaindy Lake",
      "area": "east",
      "coordinates": [
        78.463,
        42.9846
      ],
      "note": "A lake in the Tien Shan with drowned spruce trunks standing in the water.",
      "mapsQuery": "Kaindy Lake, Kazakhstan",
      "source": "manual"
    },
    {
      "id": "charyn-canyon",
      "name": "Charyn Canyon",
      "area": "east",
      "coordinates": [
        79.0763712,
        43.351693
      ],
      "note": "The \"Grand Canyon of Kazakhstan\", about 200 km east of Almaty.",
      "mapsQuery": "Charyn Canyon, Kazakhstan",
      "source": "2gis"
    },
    {
      "id": "black-canyon",
      "name": "Black Canyon",
      "area": "east",
      "coordinates": [
        78.896925,
        43.246874
      ],
      "note": "A narrower, darker neighbour of Charyn Canyon.",
      "mapsQuery": "Black Canyon, Kazakhstan",
      "source": "2gis"
    },
    {
      "id": "kolsai-lakes",
      "name": "Kolsai Lakes",
      "area": "east",
      "coordinates": [
        78.471,
        42.951
      ],
      "note": "The lowest of the three Kolsai lakes, in a spruce valley off the Kaindy road.",
      "mapsQuery": "Kolsai Lakes, Kazakhstan",
      "source": "manual"
    }
  ],
  "chapters": [
    {
      "id": "city",
      "label": "01 / The city",
      "title": "The city, on foot.",
      "description": "From the bazaar and the cathedral to the parks and the river — the part of the trip done on foot.",
      "placeIds": [
        "panfilov-park",
        "ascension-cathedral",
        "green-bazaar",
        "almaty-central-mosque",
        "kasteyev-art-museum",
        "central-state-museum",
        "almaty-zoo",
        "central-park"
      ]
    },
    {
      "id": "mountains",
      "label": "02 / The mountains",
      "title": "The mountains behind it.",
      "description": "The Tien Shan starts at the edge of the city: Medeu, Shymbulak, and the lake above them.",
      "placeIds": [
        "medeu",
        "medeu-cable-car",
        "shymbulak",
        "big-almaty-lake"
      ]
    },
    {
      "id": "east",
      "label": "03 / The east",
      "title": "The long way east.",
      "description": "A long day east: Black Canyon first, then Kolsai and Kaindy lakes, and Charyn on the way home.",
      "placeIds": [
        "kolsai-lakes",
        "kaindy-lake",
        "charyn-canyon",
        "black-canyon"
      ]
    }
  ]
}
