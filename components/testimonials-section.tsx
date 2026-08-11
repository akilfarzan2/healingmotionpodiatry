import Image from 'next/image'
import { Star } from 'lucide-react'
import { getHomePage, getTestimonials } from '@/lib/sanity/data'
import { urlForImage } from '@/lib/sanity/image'

export async function TestimonialsSection() {
  const homePage = await getHomePage()
  const section = homePage?.testimonialsSection
  const featured = section?.testimonials
  const testimonials = featured?.length ? featured : await getTestimonials()

  if (!testimonials.length) return null

  return (
    <section id="testimonials" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
        {section?.heading ?? 'What our patients say'}
      </h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 6).map((testimonial) => {
          const photoUrl = urlForImage(testimonial.photo)?.width(96).height(96).fit('crop').url()

          return (
            <figure
              key={testimonial.authorName}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
            >
              {testimonial.rating && (
                <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating! ? 'fill-primary text-primary' : 'fill-none text-border'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              )}
              <blockquote className="text-sm leading-relaxed text-muted-foreground text-pretty">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt={testimonial.authorName}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {testimonial.authorName.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">
                    {testimonial.authorName}
                  </p>
                  {testimonial.authorRole && (
                    <p className="text-xs text-muted-foreground">{testimonial.authorRole}</p>
                  )}
                </div>
              </figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}
