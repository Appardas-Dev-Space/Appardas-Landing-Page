import { Container } from '@/components/layout/Container'
import Link from 'next/link'

/** One service card: decorative icon, title, short description, optional CTA. */
interface Service {
  readonly icon: string
  readonly title: string
  readonly description: string
  readonly href?: string
}

/**
 * Services rendered as cards on the LP-06 page. Data-driven by design: adding
 * an entry here renders a new card with no layout change.
 */
const SERVICES: readonly Service[] = [
  {
    icon: '◆',
    title: 'Website Design & Full-Stack Digital Build',
    description:
      'We listen to your story, study your business model, and transform your vision into a distinguished digital presence. We unite strategy, standout design, and senior engineering into one seamless engagement—giving SME owners enterprise-grade results with zero technical headaches.',
    href: '/#contact',
  },
  {
    icon: '✦',
    title: 'Endpoint Services & ERP Automation',
    description:
      'Complex ERP software should not slow down your daily business operations. We build tailored endpoint services and automated data pipelines that eliminate repetitive spreadsheets, streamline inventory reconciliation, and connect your software systems seamlessly.',
    href: '/#contact',
  },
  {
    icon: '★',
    title: 'We Create Useful Apps',
    description:
      'Beyond tailoring custom systems for clients, appardas conceives and develops purposeful applications built to solve genuine everyday challenges for business owners and individuals. Fast, delightful to use, and available on all your devices.',
    href: '/#contact',
  },
]

/**
 * Services section (LP-06).
 *
 * Rendered on the home page (so `/#services` anchors resolve) and reused by
 * the `/services` route for deep links.
 */
export function Services() {
  return (
    <section
      id="services"
      className="border-t border-line bg-canvas py-section-y md:py-section-y-lg"
    >
      <Container className="max-w-prose">
        <h2 className="text-2xl font-bold md:text-3xl">Services</h2>
        <h1 className="mt-4 text-5xl font-bold md:text-6xl">
          Everything your business needs to meet the digital space.
        </h1>
        <p className="mt-4 text-ink-muted">
          Three focused services designed for Small and Medium Enterprises, tech
          businesses, and daily mobile users.
        </p>
        {/* Demo: All-in-One Turnkey Solution (from the wireframe) */}
        <div className="mt-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-link">
            <span aria-hidden="true">◆</span>
            <span>All-in-One Turnkey Solution</span>
          </span>
        </div>
      </Container>

      {/* Services card grid */}
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span aria-hidden="true" className="text-2xl font-bold text-link">
                {service.icon}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                {service.description}
              </p>
              {service.href ? (
                <Link
                  href={service.href}
                  className="focus-ring-inset mt-4 inline-flex rounded-md bg-action px-4 py-2 text-sm font-semibold text-action-text shadow-sm transition-colors hover:bg-action-hover"
                >
                  Start your project
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
