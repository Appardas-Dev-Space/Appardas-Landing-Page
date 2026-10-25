import { Team } from '@/components/sections/Team'

/**
 * Standalone `/team` route, rendering the same section component as the home
 * page so deep links like `/team#team` keep working.
 */
export default function TeamPage() {
  return <Team />
}
