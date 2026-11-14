import type { TravelPhoto } from '@/lib/travel/types'
import { heroPhotoSrc, heroPhotoSrcSet, photoSrc, photoSrcSet } from '@/lib/travel/photo'

interface TravelImageProps {
  photo: TravelPhoto
  /** Responsive sizes attribute for the layout this image sits in. */
  sizes?: string
  className?: string
  /** Use the wider hero variant set and eager loading. */
  priority?: boolean
  /** Use the wider hero variant set while keeping lazy loading. */
  wide?: boolean
}

export default function TravelImage({
  photo,
  sizes = '(max-width: 1000px) 100vw, 33vw',
  className,
  priority = false,
  wide = false,
}: TravelImageProps) {
  const useWideVariants = priority || wide

  return (
    // The build is a static export with pre-generated WebP variants, so a plain
    // <img> with a hand-written srcSet is intentional rather than next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={useWideVariants ? heroPhotoSrc(photo) : photoSrc(photo)}
      srcSet={useWideVariants ? heroPhotoSrcSet(photo) : photoSrcSet(photo)}
      sizes={sizes}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      style={photo.lqip ? { backgroundImage: `url(${photo.lqip})` } : undefined}
    />
  )
}
