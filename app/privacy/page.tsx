import type { Metadata } from 'next'

import { siteConfig } from '@/app/site.config'

export const metadata: Metadata = {
  title: `Privacy Notice — ${siteConfig.name}`,
  description: `How ${siteConfig.legalName} collects and uses personal data.`,
}

/**
 * Privacy Notice stub.
 *
 * LP-02 puts the footer link in place; the copy itself is owned elsewhere. A
 * stub is here rather than a dead link because the footer link is part of the
 * keyboard-navigation acceptance criteria — a 404 would make it untestable.
 *
 * Replace the body below with the real policy before launch.
 */
export default function PrivacyPage() {
  return (
    <div className="py-section-y md:py-section-y-lg">
      <div className="mx-auto w-full max-w-prose px-section-x md:px-section-x-lg">
        <h1 className="text-3xl font-bold md:text-4xl">Privacy Notice</h1>

        <p className="mt-4 text-ink-muted">
          This page is a placeholder. The full privacy policy for{' '}
          {siteConfig.legalName} has not been published yet.
        </p>

        <p className="mt-4 text-ink-muted">
          To be replaced with the approved policy copy, including the data
          {siteConfig.legalName} collects, the lawful basis for processing,
          retention periods, and the contact route for access or deletion
          requests.
        </p>
      </div>
    </div>
  )
}
