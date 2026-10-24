import { Container } from '@/components/layout/Container'

/**
 * Services section page (LP-06).
 *
 * Placeholder content — the real services grid lands with LP-06. Lives at
 * `/services` so the home page stays focused on the intro + About story.
 */
export default function ServicesPage() {
  return (
    <section
      id="services"
      className="border-t border-line bg-canvas py-section-y md:py-section-y-lg"
    >
      <Container className="max-w-prose">
        <h4 className="text-2xl font-bold md:text-3xl">Services</h4>
        <h1>Everything your business needs to meet the digital space.</h1>
        <p className="mt-4 text-ink-muted">
          Three focused services designed for Small and Medium Enterprises, tech
          businesses, and daily mobile users.
        </p>
      </Container>
    </section>
  )
}
