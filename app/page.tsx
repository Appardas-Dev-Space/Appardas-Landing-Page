import { Container } from "@/components/layout/Container";
import { siteConfig } from "./site.config";

/**
 * Home page.
 *
 * LP-04 provides the sticky navigation bar and section targets (#about,
 * #services, #team, #contact) so smooth scrolling, scroll-offset, and active
 * link highlight can be verified end-to-end. Full section content lands in
 * LP-05 to LP-08.
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

      {/* About Section Target (LP-05) */}
      <section
        id="about"
        className="border-t border-line bg-surface py-section-y md:py-section-y-lg"
      >
        <Container className="max-w-prose">
          <h2 className="text-2xl font-bold md:text-3xl">About Us</h2>
          <p className="mt-4 text-ink-muted">
            About section placeholder (scheduled for LP-05). Explains the
            company mission, story, and values for SME digitalization.
          </p>
        </Container>
      </section>

      {/* Services Section Target (LP-06) */}
      <section
        id="services"
        className="border-t border-line bg-canvas py-section-y md:py-section-y-lg"
      >
        <Container className="max-w-prose">
          <h2 className="text-2xl font-bold md:text-3xl">Services</h2>
          <p className="mt-4 text-ink-muted">
            Services grid placeholder (scheduled for LP-06). Covers digital
            transformation, software engineering, and automation solutions.
          </p>
        </Container>
      </section>

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
