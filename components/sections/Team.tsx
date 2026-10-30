import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import team from '@/content/team.json'

/** One team card: photo, name, role, focus, short description and an
 * optional external profile link (LinkedIn or portfolio). */
interface TeamMember {
  /** Public path to the member's photo (served optimised + resized by
   * next/image), or null to render the neutral placeholder avatar.
   * Photos stay null until the CONTENT-03 consent & asset pass lands. */
  readonly photo: string | null
  readonly name: string
  readonly role: string
  /** Specialty line shown under the role. */
  readonly focus: string
  readonly description: string
  /** Optional external profile URL (LinkedIn or portfolio). Rendered as a
   * card CTA opening in a new tab. */
  readonly profileUrl?: string
}

/** Neutral standing-person mark used for members without a photo yet. */
function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12 12a4.5 4.5 0 1 1 4.5-4.5A4.5 4.5 0 0 1 12 12Zm0 2c-4 0-9 2-9 5.5v1.5h18v-1.5c0-3.5-5-5.5-9-5.5Z" />
    </svg>
  )
}

/**
 * Meet the Team section (LP-07).
 *
 * Heading plus a data-driven card grid loaded from `@/content/team.json`,
 * so adding or removing a member is a content-file edit only. Cards expose
 * photo, name, role, focus line, short description and an optional external
 * profile link.
 *
 * Rendered on the home page (so `/#team` anchors resolve) and reused by the
 * `/team` route for deep links.
 */
export function Team() {
  return (
    <section
      id="team"
      className="border-t border-line bg-surface py-section-y md:py-section-y-lg"
    >
      <Container className="max-w-prose">
        <p className="text-sm font-semibold uppercase tracking-wide text-link">
          {team.eyebrow}
        </p>
        <h2 className="mt-4 text-2xl font-bold md:text-3xl">{team.heading}</h2>
        <p className="mt-4 text-ink-muted">
          {team.intro}{' '}
          <Link
            href="/privacy/"
            className="font-medium text-link underline-offset-2 hover:underline"
          >
            privacy notice
          </Link>
          .
        </p>
      </Container>

      {/* Team card grid — order follows @/content/team.json. */}
      <Container>
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member: TeamMember) => (
            <li key={member.name}>
              <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
                {/* Portrait, cropped to a single square aspect ratio. A
                    missing photo renders the neutral placeholder avatar,
                    never a broken image. */}
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-square w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center rounded-md border border-line bg-surface-muted text-line-strong">
                    <PersonIcon className="h-16 w-16" />
                    <span className="sr-only">
                      {member.name} — photo coming soon
                    </span>
                  </div>
                )}

                <h3 className="mt-4 font-display text-xl font-bold text-ink">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-link">
                  {member.role}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-line-strong">
                  {member.focus}
                </p>
                <p className="mt-2 text-sm text-ink-muted">
                  {member.description}
                </p>

                {member.profileUrl ? (
                  <a
                    href={member.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 rounded-md pt-4 text-sm font-semibold text-link underline-offset-2 hover:underline focus-ring-inset"
                  >
                    View profile
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span aria-hidden="true" className="mt-auto pt-4" />
                )}
              </article>
            </li>
          ))}
        </ul>
      </Container>

      {/* Section footer CTA (from the wireframe). */}
      <Container className="max-w-prose">
        <div className="mt-12 grid gap-4 rounded-lg border border-line bg-surface-muted p-6 md:flex md:items-center md:justify-between">
          <p className="text-ink-muted">
            Senior engineers and specialist practitioners collaborate directly
            with clients during active engagements.
          </p>
          <Link
            href="/#contact"
            className="focus-ring-inset inline-flex shrink-0 items-center gap-1 rounded-md bg-action px-4 py-2 text-sm font-semibold text-action-text shadow-sm transition-colors hover:bg-action-hover"
          >
            Talk with our team
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  )
}
