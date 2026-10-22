import { AboutUs } from "@/components/sections/AboutUs";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "./site.config";

/**
 * Home page.
 *
 * page.tsx serves as a template for the "About Us" landing page (LP-05) and 
 * the subsequent sections (LP-06, LP-07, LP-08). The content is loaded from
 * `@/content/about.json` for the About Us section, while the other sections
 * currently contain placeholder content.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Intro / Hero Area */}
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
            <a
              href="#contact"
              className="focus-ring-inset rounded-md bg-action px-5 py-3 text-sm font-semibold text-action-text shadow-sm transition-colors hover:bg-action-hover"
            >
              Get in Touch
            </a>
            <a
              href="#services"
              className="rounded-md border border-line-strong px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted"
            >
              Explore Services
            </a>
          </div>
        </Container>
      </section>

      {/* About Section (LP-05) */}
      <AboutUs />

      {/* Meet the Team Section Target (LP-07) */}
      <section
        id="team"
        className="border-t border-line bg-surface py-section-y md:py-section-y-lg"
      >
        <Container className="max-w-prose">
          <h2 className="text-2xl font-bold md:text-3xl">Meet the Team</h2>
          <p className="mt-4 text-ink-muted">
            Team and staff digital ID teaser placeholder (scheduled for LP-07).
          </p>
        </Container>
      </section>

      {/* Contact Us Section moved to /contact (LP-08) — placeholder lives there. */}

      {/* Contact Us Section Target (LP-08) */}
      <section
        id="contact"
        className="border-t border-line bg-canvas py-section-y md:py-section-y-lg"
      >
        <Container className="max-w-prose">
          <h2 className="text-2xl font-bold md:text-3xl">Contact Us</h2>
          <p className="mt-4 text-ink-muted">
            Inquiry and project kickoff placeholder (scheduled for LP-08).
          </p>
          <div className="mt-6">
            <a
              href="mailto:contact@appardas.com"
              className="focus-ring-inset inline-flex rounded-md bg-action px-5 py-3 text-sm font-semibold text-action-text shadow-sm transition-colors hover:bg-action-hover"
            >
              Send an Inquiry
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
