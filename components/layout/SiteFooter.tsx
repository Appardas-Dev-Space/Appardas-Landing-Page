import Link from "next/link";

import { siteConfig } from "@/app/site.config";
import { Container } from "./Container";
import { SocialIcon } from "./SocialIcon";

/**
 * Page footer — copyright, Privacy Notice, and social links.
 *
 * Stacks to a single column at 360px and lays out horizontally from `sm` up.
 *
 * `--color-focus` is re-pointed for this subtree via an arbitrary property, so
 * the focus ring stays visible on the inverted background. That is the only
 * place the page needs a theme override for focus.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-surface-inverse [--color-focus:var(--color-focus-inverse)]">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:py-12">
        <p className="text-sm text-ink-inverse-muted">
          &copy; {year} {siteConfig.legalName}. All rights reserved.
        </p>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          <Link
            href={siteConfig.privacy.href}
            className="w-fit text-sm font-medium text-ink-inverse underline underline-offset-4 hover:decoration-2"
          >
            {siteConfig.privacy.label}
          </Link>

          <ul className="flex items-center gap-4">
            {siteConfig.social.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-sm text-ink-inverse-muted transition-colors hover:text-ink-inverse"
                >
                  <SocialIcon platform={link.platform} />
                  <span className="sr-only">
                    {link.label} (opens in a new tab)
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
