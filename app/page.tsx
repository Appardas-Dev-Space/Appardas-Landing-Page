import { siteConfig } from "./site.config";

/**
 * Home page placeholder.
 *
 * Section layouts are out of scope for LP-02 and land in LP-05 to LP-08. This
 * exists so the shell renders something reviewable and so the token layer can
 * be verified: type scale, colour roles, spacing rhythm, and focus rings.
 *
 * Everything below is built from tokens only. If a value here needs a raw hex
 * or a magic number, the token set is missing something — add it to
 * app/theme.css rather than reaching past the layer.
 */
export default function HomePage() {
  return (
    <div className="py-section-y md:py-section-y-lg">
      <div className="mx-auto w-full max-w-prose px-section-x md:px-section-x-lg">
        <p className="text-sm font-semibold uppercase tracking-wide text-link">
          SME Digitalization
        </p>

        <h1 className="mt-4 text-3xl font-bold md:text-4xl">
          {siteConfig.tagline}
        </h1>

        <p className="mt-4 text-ink-muted">
          The design token layer and page shell are in place. Sections arrive in
          LP-05 to LP-08 and are expected to reference these tokens rather than
          raw values.
        </p>

        {/* Focus-ring verification: tab through these and confirm the ring is
            visible on both the light and inverted surfaces. */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#main"
            className="focus-ring-inset rounded-md bg-action px-5 py-3 text-sm font-semibold text-action-text shadow-sm transition-colors hover:bg-action-hover"
          >
            Primary action
          </a>
          <a
            href="/privacy"
            className="rounded-md border border-line-strong px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted"
          >
            Secondary action
          </a>
        </div>
      </div>
    </div>
  );
}
