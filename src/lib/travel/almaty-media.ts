import type { TripMedia } from './types'

/**
 * Curated photos for the Almaty trip. Times come from the camera filenames
 * (local Almaty time) and places were matched against the saved 2GIS list,
 * the Strava walks and the frames themselves.
 */
export const almatyMedia: TripMedia = {
  "hero": {
    "src": "/images/travel/almaty/big-almaty-lake-hero",
    "alt": "Adam sitting on a rock overlooking the turquoise water of Big Almaty Lake, surrounded by the Tien Shan mountains.",
    "caption": "Big Almaty Lake",
    "time": "16:16",
    "width": 4000,
    "height": 3000,
    "lqip": "data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAACwBQCdASogABgAPu1mqk6ppaOiKA1RMB2JQBWGd8g1PiqaFGVqH0FtDJ4kGaHJnH7KsVqTyAAA/tNzEFivqIRLyi5hIOJBt3Y6Bslpt80bUBQT+jyFCx2F/EvbJgPB8gDrtUUGhz9SXDXJGlymYukBZY1Zpyh020F9fTAKeq2WIwosQWSkUUkAAAA="
  },
  "days": [
    {
      "id": "day-15",
      "label": "Sat 15 Aug",
      "date": "2026-08-15",
      "title": "Landing, the mosque, and the first plov.",
      "summary": "Touched down early, walked into the centre, and found the Central Mosque before the day really started.",
      "photos": [
        {
          "src": "/images/travel/almaty/day15-mosque",
          "alt": "The white and blue Almaty Central Mosque on a sunny morning.",
          "caption": "Almaty Central Mosque",
          "time": "11:27",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRsoAAABXRUJQVlA4IL4AAABQBgCdASogACsAPuFgpk2opiOiMA1REBwJYgC26OZ1/w5HAlqvETLjzZUzikv7ZxFOwTYGiJz/OZlbgAD+byC3Si4wfrXn7Dytvellf2mYpGjCtKd34DErFGZxb/UZmx1tHB1E7dYKsi9pTUsf8zh7vdtZTxwSjsp0snGuSt9JBgQ04fL9oNsFLwRtpZ+sONDxnFli0w5syi7447NbEwj8Svv4M1iuVuq8J5+ypcvwv25sxh4QjYKnhYT8WAAA"
        },
        {
          "src": "/images/travel/almaty/day15-park",
          "alt": "Sunlit trees and lawns in one of Almaty's central parks.",
          "caption": "A first walk in the park",
          "time": "10:06",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRsgAAABXRUJQVlA4ILwAAACwBgCdASogACsAPu1qqk6ppiOiMBqoATAdiUAXYAJJyHUzN/vXKmB3H1RVELiXasvzgXw5kqpd7etYSXs0uAD+vW9lLXTRIymh61+MJjuZ8r8n//SFACSZ2lF0hfP+HD+2f0wiGmv9qBR5028CK3XSrVYFQfOBb8wTqupPm1O0mIJf/iTI2JC+x4QN1tyYG7jkRMmlRkI5WWvr7U27hMDAOh9AJQxfeIDcbJcp9jMqjC3dQf92nROnDwAAAA=="
        },
        {
          "src": "/images/travel/almaty/day15-plov",
          "alt": "A plate of plov with meat and bread at a restaurant.",
          "caption": "The first plov",
          "time": "21:51",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRhABAABXRUJQVlA4IAQBAAAwBwCdASogACsAPulkqk2pJiQiMAqpIB0JZAC+Ay/Ld518o3znAQOAwuGbJxgai2M/6cDVK7AkU0DICP5WKu5ObQAA/v0TZxRpVXJx8S0pjow9fKqfdPx27M9tOpOQ77nv4L93ARtRoyjY0aLoyEbryThf9+44xUuL3UbQoZWXI8LVSZwz2bMSWiPlRJjEc+tl/fJ2/knfba2cPyk1URVbmyDfRmiwFtqFZ0KK4tHoLgFHx4X+p9xtFrm+RWVzMIMEqAzbUB28t8DPMuVWYuLKmeBB1Rcay+nXUo3EKMLnsgfDe3s85NJwvME2TVWgSLXlHBz9j3CWzsZ/APYrchJ9TgAAAA=="
        }
      ]
    },
    {
      "id": "day-16",
      "label": "Sun 16 Aug",
      "date": "2026-08-16",
      "title": "The park, the zoo, and Kok-Tobe.",
      "summary": "A flat loop through Central Park and the zoo — logged as a 3.1 km walk — then the television tower in the afternoon.",
      "walkId": "19761990960",
      "photos": [
        {
          "src": "/images/travel/almaty/day16-park",
          "alt": "Flowerbeds and a tree-lined path in Central Park.",
          "caption": "Central Park",
          "time": "10:55",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRvIAAABXRUJQVlA4IOYAAAAwBwCdASogACsAPtVWok2oJKMiOrmYAQAaiWIAuzNkDLX+xIR3dpspnpmf8gWBpCQJm9ve50lYW1DH0I3B/lSKoAAA/vt8T12LaQcUJ1RSbawLfwn6OAaxdWRQup0CFtWm1x432Ptpgu4450vzrsVZOTHOYEaKkhhQAN+8CUBI4b7lA7gnM4l0tGsH0y4K2mtYvh6VnSwGIgHIoG3bCwjhsjZlD/JZBggmvyGGYnGlBDBTXU7nbCCicFOwnhyqLUkSffPs19MDWISQ/HxzJLrJQyUH/9Fe9lQaEjfx8WLuK7qNsnAAAA=="
        },
        {
          "src": "/images/travel/almaty/walk-park",
          "alt": "A green river and a railing on the Central Park walk.",
          "caption": "Central Park, on the walk",
          "time": "11:24",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRtIAAABXRUJQVlA4IMYAAAAQBwCdASogACsAPulgq02pJaQiMBVdUSAdCWIAsR8m/c07bvcXqfWjddjzPitfHlZxA074nYIKYI9CotO57hInAAD81pjSZSgsPldPJUAADg+NeDpRaaJjiC3OzEa1EbcR1WOpRMbb5kbVnUQEcQ2/1Ly0KlZWZAuu0jka25Pdqn1+UR2vCgyyFqUVRfP6+rfiAKZQroKW3TON11Z/CJdW0qa8Ykl2demOyefhr6BqGdPf1ej1LL1ma+wh4uuNUst2yDtnAAA="
        },
        {
          "src": "/images/travel/almaty/day16-kok-tobe",
          "alt": "The Kok-Tobe television tower rising above the city on a cloudy afternoon.",
          "caption": "Kok-Tobe TV tower",
          "time": "16:07",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRqQAAABXRUJQVlA4IJgAAABwBQCdASogACsAPuViq02pJaQiKq35IByJYwC2yFDe7jfQ4r6jsS2IhLjUYGVeXMJLGoAAAP7nkTT6ZhYC/nOgWgPuvFW6Ircs2ALoVx1wHjVSocLZBnz5bMkiUt2XteHdyXw22oJ8rlS1B6y1NFGbPjUZUj/PdXncrmI++PYhvsf2R7WZlQp8qKw4ovs5yCoepOl1poAAAA=="
        }
      ]
    },
    {
      "id": "day-17",
      "label": "Mon 17 Aug",
      "date": "2026-08-17",
      "title": "Shymbulak, mostly by cable car.",
      "summary": "The cable car up from Medeu, a short steep walk above it, lunch on the terrace, then back down into the city.",
      "walkId": "19776159195",
      "photos": [
        {
          "src": "/images/travel/almaty/day17-cable-car",
          "alt": "The Shymbulak cable car crossing the valley above Medeu.",
          "caption": "The cable car to Shymbulak",
          "time": "11:24",
          "width": 4000,
          "height": 3000,
          "lqip": "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAACQBQCdASogABgAPuVaqk2pJSQiN/qoASAciWMAsQzQQvUG5vFpebTLn+gUOM+YvMisYmgyAADcbk8LZf9yi+etEZTCDDxHFi5KZdXv1dFrI4YemAMMYy2i0wTbeqG2EIcQJpyqZ4SmukqKUsfh8jRgiCj2blM+MAA="
        },
        {
          "src": "/images/travel/almaty/day17-peak",
          "alt": "Rocks and a long shadow on the trail up to Shymbulachka Peak.",
          "caption": "On the way up",
          "time": "12:31",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRswAAABXRUJQVlA4IMAAAAAwBwCdASogACsAPu1gqk8ppSOiNVQIATAdiWIAuzAG8AAWfQU/fG3wNTwhr+EDi5jnPqryoABtdKUfuhCTm6VnJfgA+q70bTWH5E/+mPQpu2QddX5s+hAJeUnsMptwmupVwypwSPfyCC525PQxSX/G6VMARALhw1yUgGVpxREMitg3SDE+V4mUMp7ciDS4NahYk2FesreOVXSBlk496/whlz5SCSpciDBy49uI0kaKpJMt1CkhUB6ShdNLgfi9AAA="
        },
        {
          "src": "/images/travel/almaty/day17-terrace",
          "alt": "An orange chair on a terrace at Shymbulak.",
          "caption": "Lunch at the resort",
          "time": "13:39",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRsAAAABXRUJQVlA4ILQAAABQBgCdASogACsAPslUn02npSMiOqgA8BkJaACw7Bj/cgO5n1MRPQDa1ii6MmKpICqhqYW05RBrCrgJQAD23GLaIdkNjp1Jm3X3+j/u/i8Y1z+HdzFTl/midPXUy5cTB1DYum4IKWBXkXNO/UyJv1F/+fiMjtTfoB28FP1JAnQ9369UGoy/chdHMT43FzqgOhrmWibtDQeSGutyWVt9512inpK4ycebmbYDzpzjoca9F7rAAAA="
        }
      ]
    },
    {
      "id": "day-18",
      "label": "Tue 18 Aug",
      "date": "2026-08-18",
      "title": "The long day east: Kaindy and Charyn.",
      "summary": "A pre-dawn start, horses and Kaindy Lake in the morning, then Charyn Canyon on the way home.",
      "walkId": "19789670369",
      "photos": [
        {
          "src": "/images/travel/almaty/day18-sunrise",
          "alt": "A pale sky full of clouds before sunrise on the road east.",
          "caption": "On the road at dawn",
          "time": "06:15",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAAAQBwCdASogACsAPulep02pJSOiNVgIASAdCUAU6PFASF8JTyQXyHT0CkLF3SH/Wz6B0jU46+E9TkYXwsD7yFfOgAD+tMliTLJJc6oL9FPR7VuXkcGRmteAWca58uLxt1O88R7WFM0kD+7vUQvlojlVHs/4O8FIcVsNADrBHha45IqEEEWLgB1pt/rw938vuyUvE/9+1IplCa7CAAA="
        },
        {
          "src": "/images/travel/almaty/day18-kaindy",
          "alt": "Horses and a wooden fence above the dark green water of Kaindy Lake.",
          "caption": "Kaindy Lake",
          "time": "13:44",
          "width": 4000,
          "height": 3000,
          "lqip": "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAABQBQCdASogABgAPulgqk2pJaQiN/VYASAdCUAWHY8tdY3g25kVL9uNrcqxUrhh1RkTegAA/u7q4mXerWnwK7ih43gRIUi6DnfcVK4C+Nx1OjfUWR9gMOZGDgAfApAjVHWwnOKUTtKiynyX5GTeX2ZsP1z6DGQhfob8hR7YmAA="
        },
        {
          "src": "/images/travel/almaty/day18-charyn",
          "alt": "Red rock formations of Charyn Canyon lit by the late sun.",
          "caption": "Charyn Canyon",
          "time": "17:58",
          "width": 4000,
          "height": 3000,
          "lqip": "data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAADQBQCdASogABgAPu1erE2ppSSiMBgMATAdiWgAnTKEgr/lAaevTNdARPW864hS02hq2dhc3JoAAP3OPfly4/R0l+NXNr8bxig9U9aU3Cfslq3KOYannO5sJyAaVmsA8D/0QrBceScpu3mR8PPJ6cRRkhE9HfxiPx9dstuuLwIoj5X6OIEtjno0H7ckFSgA"
        }
      ]
    },
    {
      "id": "day-19",
      "label": "Wed 19 Aug",
      "date": "2026-08-19",
      "title": "A city day.",
      "summary": "Lunch, the Central State Museum, and the city from above.",
      "photos": [
        {
          "src": "/images/travel/almaty/day19-city-view",
          "alt": "A wide street in central Almaty with the Tien Shan behind it.",
          "caption": "Almaty, looking south",
          "time": "16:42",
          "width": 4000,
          "height": 3000,
          "lqip": "data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAACQBQCdASogABgAPu1qsFAppiSiqAqpMB2JYgC/cUDg8SBK2UOt0anNS3Nh4wehMtJHqWn5AAD+w4iAnJIIY+EJNCGs4xTuYL/dOeA0mZIN/0qg4FIPH/24tbwuWOPj6NfdsRcO9kfLLqFuSfKuNlD6bW+Yg4UIYCDRwlZIyy0UqTE4yFAAAA=="
        },
        {
          "src": "/images/travel/almaty/day19-museum",
          "alt": "Taxidermy deer, foxes and birds in a forest diorama at the Central State Museum.",
          "caption": "Central State Museum",
          "time": "14:19",
          "width": 4000,
          "height": 3000,
          "lqip": "data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAABQBQCdASogABgAPu1usFKppiSiqAgBMB2JQBUeif+oZ3xhQxvSIP1ya3ASYGVkQiVYIgAA4n+XQKPIB/riUNWQDxjVVSbrPskTM8rLli1o1aw+j8WsdYXYbAe2qzJXtI7yEluMsXO7Yc5SLaSoaY/EegRWdwuohEt3EFSH+/QYYAAA"
        },
        {
          "src": "/images/travel/almaty/day19-lunch",
          "alt": "A bowl of lagman and a glass of tea at a cafe.",
          "caption": "Lagman for lunch",
          "time": "11:46",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRtAAAABXRUJQVlA4IMQAAAAQBwCdASogACsAPt1apU2opSOiOrZoARAbiWQAwQ/ZPsix+yaPY8e6y774Y/m/CdI101CPTaMu6CPXzKwuvTpNQAD+yRZfhlFMICZ59fud9nvxC/vv3v8QThoaElUGy8uCMKEcrs8VjgdDb48/3AI+CVmgjSu07D8pruCaHiXMk7b0z96MVTtryjknTMKBY9Qo5tEqB8HknbcM1riZjyKRO9brJ/jDEZpEmL9frsa+tcSuHPWg2v0EN1NAJ85ZsE2dAAAA"
        }
      ]
    },
    {
      "id": "day-20",
      "label": "Thu 20 Aug",
      "date": "2026-08-20",
      "title": "Big Almaty Lake, on foot.",
      "summary": "The 11 km loop around the lake and up to the ridge above it — the biggest walk of the trip.",
      "walkId": "19823767791",
      "photos": [
        {
          "src": "/images/travel/almaty/day20-valley",
          "alt": "Tall reeds and the valley floor near Big Almaty Lake.",
          "caption": "The valley floor",
          "time": "14:55",
          "width": 4000,
          "height": 3000,
          "lqip": "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAQBQCdASogABgAPtlgpU2oJiOiN/qoAQAbCUAWcAQ66V2vWULymqDRXOv3xi6cx7MAAP7LWqtbTJ1Yfq7YYKG70lj/u7SDHg9W7nh2KQlmOhG3FpoMj3YtHIFLtH278MD4p4SpaqkNEAAA"
        },
        {
          "src": "/images/travel/almaty/day20-trail",
          "alt": "Red trail signs pointing to Big Almaty Lake and the surrounding peaks.",
          "caption": "Trail signs above the lake",
          "time": "15:27",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRtoAAABXRUJQVlA4IM4AAAAwBgCdASogACsAPu1kqk4ppaQiMAgBMB2JZgC3uGttzszXLEKBWYea0jB/8SrPweWeuSfQqq6rw/4AAP71OzADNM6W4T9SUl8LlvX9yozAV+2l+CVJn79G8vIufzDeSAREPT95n8d+RO7RmHTZZSBHPlY7v9JQk7P+HqQoeFtxZyvHayoebYW9cK62GKBCX+cDU6aPH+68TEyqmfaHbXV+BUAE8NIp5O7JEhAq/0ptsvQSryrxM9LrbMvPAw60eMJQSrPtDpMSD85XbpVgAA=="
        },
        {
          "src": "/images/travel/almaty/day20-ridge",
          "alt": "Clouds over the mountains above Big Almaty Lake.",
          "caption": "Above the lake",
          "time": "16:39",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRp4AAABXRUJQVlA4IJIAAADQBQCdASogACsAPs1WoU2npSMiOrzIAPAZiUAVyfYAr2LY8ImBkCSNWBkZzQC6jT/frzp3fTU4AP7thpFLQmWGQ3BS6gpoBR4uk4y6RxanEjDUtrcP62iHBcG9XPaYIMpbkxJN/eZlUrEq4rcrgH1nMltsCvj/U1sQWV3jEY84mjw/+wJtxtQ2ThPAXSIHPJg0AA=="
        }
      ]
    },
    {
      "id": "day-21",
      "label": "Fri 21 Aug",
      "date": "2026-08-21",
      "title": "Departure.",
      "summary": "One last drive through the city, a plane behind the airport fence, and a night flight out.",
      "photos": [
        {
          "src": "/images/travel/almaty/day21-plane",
          "alt": "A plane taking off behind the airport fence on the last afternoon in Almaty.",
          "caption": "Planespotting before the flight",
          "time": "15:12",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAACwBACdASogACsAPuFWoE2+JKMiNVv8A8AcCWIAsswt+dRHLgG/08GITwFS0SQAAP7h6/xAM6Iu7O0XRSM3vS1x/1mO8VghXOJk9RO19hNc+sGwo32VpeDTkbGOzRkA0IY49G5fx6ObjIBRUo+DEJmlIBZP0GPWAAA="
        },
        {
          "src": "/images/travel/almaty/day21-night-flight",
          "alt": "City lights from the window of a night flight out of Almaty.",
          "caption": "Night flight out",
          "time": "23:51",
          "width": 3000,
          "height": 4000,
          "lqip": "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAACwBQCdASogACsAPtFcoU2oJaMiOrmYAQAaCWUAygBdbW9e8rzLeui1bbdLAL7Ij737/H4Lj4AA/vd4QKyGM1kDy6L4E/iFNW4noeOktvLWXwUtLVLTLlmqNHwjr0kSU6HB21c6GI+jY18BNN9AAA=="
        }
      ]
    }
  ],
  "placePhotos": {
    "almaty-central-mosque": {
      "src": "/images/travel/almaty/day15-mosque",
      "alt": "The white and blue Almaty Central Mosque on a sunny morning.",
      "caption": "Almaty Central Mosque",
      "time": "11:27",
      "width": 3000,
      "height": 4000,
      "lqip": "data:image/webp;base64,UklGRsoAAABXRUJQVlA4IL4AAABQBgCdASogACsAPuFgpk2opiOiMA1REBwJYgC26OZ1/w5HAlqvETLjzZUzikv7ZxFOwTYGiJz/OZlbgAD+byC3Si4wfrXn7Dytvellf2mYpGjCtKd34DErFGZxb/UZmx1tHB1E7dYKsi9pTUsf8zh7vdtZTxwSjsp0snGuSt9JBgQ04fL9oNsFLwRtpZ+sONDxnFli0w5syi7447NbEwj8Svv4M1iuVuq8J5+ypcvwv25sxh4QjYKnhYT8WAAA"
    },
    "central-park": {
      "src": "/images/travel/almaty/day16-park",
      "alt": "Flowerbeds and a tree-lined path in Central Park.",
      "caption": "Central Park",
      "time": "10:55",
      "width": 3000,
      "height": 4000,
      "lqip": "data:image/webp;base64,UklGRvIAAABXRUJQVlA4IOYAAAAwBwCdASogACsAPtVWok2oJKMiOrmYAQAaiWIAuzNkDLX+xIR3dpspnpmf8gWBpCQJm9ve50lYW1DH0I3B/lSKoAAA/vt8T12LaQcUJ1RSbawLfwn6OAaxdWRQup0CFtWm1x432Ptpgu4450vzrsVZOTHOYEaKkhhQAN+8CUBI4b7lA7gnM4l0tGsH0y4K2mtYvh6VnSwGIgHIoG3bCwjhsjZlD/JZBggmvyGGYnGlBDBTXU7nbCCicFOwnhyqLUkSffPs19MDWISQ/HxzJLrJQyUH/9Fe9lQaEjfx8WLuK7qNsnAAAA=="
    },
    "kok-tobe": {
      "src": "/images/travel/almaty/day16-kok-tobe",
      "alt": "The Kok-Tobe television tower rising above the city on a cloudy afternoon.",
      "caption": "Kok-Tobe TV tower",
      "time": "16:07",
      "width": 3000,
      "height": 4000,
      "lqip": "data:image/webp;base64,UklGRqQAAABXRUJQVlA4IJgAAABwBQCdASogACsAPuViq02pJaQiKq35IByJYwC2yFDe7jfQ4r6jsS2IhLjUYGVeXMJLGoAAAP7nkTT6ZhYC/nOgWgPuvFW6Ircs2ALoVx1wHjVSocLZBnz5bMkiUt2XteHdyXw22oJ8rlS1B6y1NFGbPjUZUj/PdXncrmI++PYhvsf2R7WZlQp8qKw4ovs5yCoepOl1poAAAA=="
    },
    "medeu-cable-car": {
      "src": "/images/travel/almaty/day17-cable-car",
      "alt": "The Shymbulak cable car crossing the valley above Medeu.",
      "caption": "The cable car to Shymbulak",
      "time": "11:24",
      "width": 4000,
      "height": 3000,
      "lqip": "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAACQBQCdASogABgAPuVaqk2pJSQiN/qoASAciWMAsQzQQvUG5vFpebTLn+gUOM+YvMisYmgyAADcbk8LZf9yi+etEZTCDDxHFi5KZdXv1dFrI4YemAMMYy2i0wTbeqG2EIcQJpyqZ4SmukqKUsfh8jRgiCj2blM+MAA="
    },
    "shymbulak": {
      "src": "/images/travel/almaty/day17-peak",
      "alt": "Rocks and a long shadow on the trail up to Shymbulachka Peak.",
      "caption": "On the way up",
      "time": "12:31",
      "width": 3000,
      "height": 4000,
      "lqip": "data:image/webp;base64,UklGRswAAABXRUJQVlA4IMAAAAAwBwCdASogACsAPu1gqk8ppSOiNVQIATAdiWIAuzAG8AAWfQU/fG3wNTwhr+EDi5jnPqryoABtdKUfuhCTm6VnJfgA+q70bTWH5E/+mPQpu2QddX5s+hAJeUnsMptwmupVwypwSPfyCC525PQxSX/G6VMARALhw1yUgGVpxREMitg3SDE+V4mUMp7ciDS4NahYk2FesreOVXSBlk496/whlz5SCSpciDBy49uI0kaKpJMt1CkhUB6ShdNLgfi9AAA="
    },
    "big-almaty-lake": {
      "src": "/images/travel/almaty/big-almaty-lake-hero",
      "alt": "Adam sitting on a rock overlooking the turquoise water of Big Almaty Lake, surrounded by the Tien Shan mountains.",
      "caption": "Big Almaty Lake",
      "time": "16:16",
      "width": 4000,
      "height": 3000,
      "lqip": "data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAACwBQCdASogABgAPu1mqk6ppaOiKA1RMB2JQBWGd8g1PiqaFGVqH0FtDJ4kGaHJnH7KsVqTyAAA/tNzEFivqIRLyi5hIOJBt3Y6Bslpt80bUBQT+jyFCx2F/EvbJgPB8gDrtUUGhz9SXDXJGlymYukBZY1Zpyh020F9fTAKeq2WIwosQWSkUUkAAAA="
    },
    "kaindy-lake": {
      "src": "/images/travel/almaty/day18-kaindy",
      "alt": "Horses and a wooden fence above the dark green water of Kaindy Lake.",
      "caption": "Kaindy Lake",
      "time": "13:44",
      "width": 4000,
      "height": 3000,
      "lqip": "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAABQBQCdASogABgAPulgqk2pJaQiN/VYASAdCUAWHY8tdY3g25kVL9uNrcqxUrhh1RkTegAA/u7q4mXerWnwK7ih43gRIUi6DnfcVK4C+Nx1OjfUWR9gMOZGDgAfApAjVHWwnOKUTtKiynyX5GTeX2ZsP1z6DGQhfob8hR7YmAA="
    },
    "charyn-canyon": {
      "src": "/images/travel/almaty/day18-charyn",
      "alt": "Red rock formations of Charyn Canyon lit by the late sun.",
      "caption": "Charyn Canyon",
      "time": "17:58",
      "width": 4000,
      "height": 3000,
      "lqip": "data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAADQBQCdASogABgAPu1erE2ppSSiMBgMATAdiWgAnTKEgr/lAaevTNdARPW864hS02hq2dhc3JoAAP3OPfly4/R0l+NXNr8bxig9U9aU3Cfslq3KOYannO5sJyAaVmsA8D/0QrBceScpu3mR8PPJ6cRRkhE9HfxiPx9dstuuLwIoj5X6OIEtjno0H7ckFSgA"
    },
    "central-state-museum": {
      "src": "/images/travel/almaty/day19-museum",
      "alt": "Taxidermy deer, foxes and birds in a forest diorama at the Central State Museum.",
      "caption": "Central State Museum",
      "time": "14:19",
      "width": 4000,
      "height": 3000,
      "lqip": "data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAABQBQCdASogABgAPu1usFKppiSiqAgBMB2JQBUeif+oZ3xhQxvSIP1ya3ASYGVkQiVYIgAA4n+XQKPIB/riUNWQDxjVVSbrPskTM8rLli1o1aw+j8WsdYXYbAe2qzJXtI7yEluMsXO7Yc5SLaSoaY/EegRWdwuohEt3EFSH+/QYYAAA"
    }
  },
  "walkPhotos": {
    "19761990960": {
      "src": "/images/travel/almaty/walk-park",
      "alt": "A green river and a railing on the Central Park walk.",
      "caption": "Central Park, on the walk",
      "time": "11:24",
      "width": 3000,
      "height": 4000,
      "lqip": "data:image/webp;base64,UklGRtIAAABXRUJQVlA4IMYAAAAQBwCdASogACsAPulgq02pJaQiMBVdUSAdCWIAsR8m/c07bvcXqfWjddjzPitfHlZxA074nYIKYI9CotO57hInAAD81pjSZSgsPldPJUAADg+NeDpRaaJjiC3OzEa1EbcR1WOpRMbb5kbVnUQEcQ2/1Ly0KlZWZAuu0jka25Pdqn1+UR2vCgyyFqUVRfP6+rfiAKZQroKW3TON11Z/CJdW0qa8Ykl2demOyefhr6BqGdPf1ej1LL1ma+wh4uuNUst2yDtnAAA="
    },
    "19776159195": {
      "src": "/images/travel/almaty/day17-cable-car",
      "alt": "The Shymbulak cable car crossing the valley above Medeu.",
      "caption": "The cable car to Shymbulak",
      "time": "11:24",
      "width": 4000,
      "height": 3000,
      "lqip": "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAACQBQCdASogABgAPuVaqk2pJSQiN/qoASAciWMAsQzQQvUG5vFpebTLn+gUOM+YvMisYmgyAADcbk8LZf9yi+etEZTCDDxHFi5KZdXv1dFrI4YemAMMYy2i0wTbeqG2EIcQJpyqZ4SmukqKUsfh8jRgiCj2blM+MAA="
    },
    "19789670369": {
      "src": "/images/travel/almaty/day18-kaindy",
      "alt": "Horses and a wooden fence above the dark green water of Kaindy Lake.",
      "caption": "Kaindy Lake",
      "time": "13:44",
      "width": 4000,
      "height": 3000,
      "lqip": "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAABQBQCdASogABgAPulgqk2pJaQiN/VYASAdCUAWHY8tdY3g25kVL9uNrcqxUrhh1RkTegAA/u7q4mXerWnwK7ih43gRIUi6DnfcVK4C+Nx1OjfUWR9gMOZGDgAfApAjVHWwnOKUTtKiynyX5GTeX2ZsP1z6DGQhfob8hR7YmAA="
    },
    "19823767791": {
      "src": "/images/travel/almaty/big-almaty-lake-hero",
      "alt": "Adam sitting on a rock overlooking the turquoise water of Big Almaty Lake, surrounded by the Tien Shan mountains.",
      "caption": "Big Almaty Lake",
      "time": "16:16",
      "width": 4000,
      "height": 3000,
      "lqip": "data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAACwBQCdASogABgAPu1mqk6ppaOiKA1RMB2JQBWGd8g1PiqaFGVqH0FtDJ4kGaHJnH7KsVqTyAAA/tNzEFivqIRLyi5hIOJBt3Y6Bslpt80bUBQT+jyFCx2F/EvbJgPB8gDrtUUGhz9SXDXJGlymYukBZY1Zpyh020F9fTAKeq2WIwosQWSkUUkAAAA="
    }
  }
}
