import type { TravelPhoto } from './types'

const defaultWidths = [360, 720]
const heroWidths = [480, 960, 1600]

export function photoSrc(photo: TravelPhoto, width = 720): string {
  return `${photo.src}-${width}.webp`
}

export function photoSrcSet(photo: TravelPhoto, widths: number[] = defaultWidths): string {
  return widths.map((width) => `${photo.src}-${width}.webp ${width}w`).join(', ')
}

export function heroPhotoSrc(photo: TravelPhoto): string {
  return photoSrc(photo, 960)
}

export function heroPhotoSrcSet(photo: TravelPhoto): string {
  return photoSrcSet(photo, heroWidths)
}
