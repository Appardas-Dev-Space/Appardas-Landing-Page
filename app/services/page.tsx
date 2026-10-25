/* Services section page (LP-06).*/

import { Services } from '@/components/sections/Services'

/**
 * Standalone `/services` route, rendering the same section component as the
 * home page so deep links like `/services#services` keep working.
 */
export default function ServicesPage() {
  return <Services />
}
