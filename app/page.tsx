import { Container } from '@/components/layout/Container'
import { ContactUs } from '@/components/sections/ContactUs'
import { Services } from '@/components/sections/Services'
import { Team } from '@/components/sections/Team'
import Link from 'next/link'
import { siteConfig } from './site.config'

/**
 * Home page.
 *
 * Renders the intro followed by the Services (LP-06), team (LP-07) and
 * contact (LP-08) sections, all on one page so the `/#<section>` nav hrefs
 * resolve natively. About Us lives on its own route at `/about`, and the
 * privacy notice at `/privacy`.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Intro */}
      <section className="py-section-y md:py-section-y-lg">
        <Container className="max-w-prose">
          <p className="text-sm font-semibold uppercase tracking-wide text-link">
            SME Digitalization
          </p>

          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            {siteConfig.tagline}
          </h1>

          <p className="mt-4 text-ink-muted">
            The design token layer, page shell, and sticky navigation (LP-04)
            are in place. Use the navigation links above to jump to sections and
            observe the active highlight.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="focus-ring-inset rounded-md bg-action px-5 py-3 text-sm font-semibold text-action-text shadow-sm transition-colors hover:bg-action-hover"
            >
              Get in Touch
            </Link>
            <Link
              href="/#services"
              className="rounded-md border border-line-strong px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted"
            >
              Explore Services
            </Link>
          </div>
        </Container>
      </section>

      {/* Services, Team and Contact sections rendered together (LP-06/07/08). */}
      <Services />
      <Team />
      <ContactUs />
    </div>
  )
}
