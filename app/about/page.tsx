import { AboutUs } from '@/components/sections/AboutUs'

/**
 * About Us page.
 *
 * About Us lives on its own route at `/about` (unlike the services, team and
 * contact sections, which are rendered together on the home page where their
 * `/#<section>` anchors resolve).
 */
export default function AboutPage() {
  return <AboutUs />
}
