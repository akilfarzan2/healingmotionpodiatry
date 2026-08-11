import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getFaqs, getHomePage } from '@/lib/sanity/data'

// Content here is mirrored 1:1 in the FAQPage JSON-LD (see structured-data.tsx)
// so answers stay consistent for both users and AI answer engines.
export async function FaqSection() {
  const homePage = await getHomePage()
  const preview = homePage?.faqPreview
  const featuredFaqs = preview?.faqs
  const faqs = featuredFaqs?.length ? featuredFaqs : await getFaqs()

  if (!faqs.length) return null

  return (
    <section id="faq" className="scroll-mt-16 bg-secondary/40 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
          {preview?.heading ?? 'Frequently asked questions'}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
          Answers to what patients most often ask before their first visit.
        </p>

        <Accordion className="mt-8">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-left font-heading text-base font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
