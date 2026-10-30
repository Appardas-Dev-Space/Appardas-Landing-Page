import { ContactUs } from '@/components/sections/ContactUs'

/**
 * Standalone `/contact` route, rendering the same section component as the
 * home page so deep links like `/contact#contact` keep working.
 */
export default function ContactPage() {
  return <ContactUs />
}
