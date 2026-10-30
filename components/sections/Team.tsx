import { Container } from '@/components/layout/Container'

/**
 * Meet the Team section (LP-07).
 *
 * Placeholder content — the team grid teaser lands with LP-07. Rendered on
 * the home page (so `/#team` anchors resolve) and reused by the `/team`
 * route for deep links.
 */

/**
 *  Team section (LP-07). Based on the wireframe, this section holds the Section with id="team": 
 * heading and a card grid.
 * */
const TEAM: readonly { photo: URL; name: string; role: string; bio: string }[] = [
  {
    photo: new URL('/images/john-doe.jpg', import.meta.url),
    name: 'John Doe',
    role: 'CEO',
    bio: 'John is the founder and CEO of appardas, with over 15 years of experience in digital strategy and innovation.'
  },
  {
    photo: new URL('/images/jane-smith.jpg', import.meta.url),
    name: 'Jane Smith',
    role: 'CTO',
    bio: 'Jane leads our technical development team and is responsible for driving our product vision and engineering excellence.'
  },
  {
    photo: new URL('/images/bob-johnson.jpg', import.meta.url),
    name: 'Bob Johnson',
    role: 'CMO',
    bio: 'Bob is in charge of our marketing efforts and works closely with our sales team to drive growth and brand awareness.'
  }
]

export function Team() {
  return (
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
  )
}
