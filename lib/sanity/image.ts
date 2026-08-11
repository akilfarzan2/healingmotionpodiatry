import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from './env'

const imageBuilder = createImageUrlBuilder({ projectId, dataset })

type SanityImage = SanityImageSource & { asset?: { _ref?: string } }

export function urlForImage(source: SanityImage | undefined) {
  if (!source?.asset?._ref) {
    return undefined
  }
  return imageBuilder.image(source)
}
