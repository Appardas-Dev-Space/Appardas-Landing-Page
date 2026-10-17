import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { siteConfig } from "@/app/site.config";
import { Container } from "./Container";

/**
 * Page header — the shell's header slot.
 *
 * `children` is the nav slot: LP-05 onwards pass their links in as children.
 * Until then the slot renders nothing, and the `<nav>` landmark is omitted
 * entirely rather than emitted empty, which would be noise in the
 * accessibility tree.
 *
 * Wrapping is allowed at 360px, so a future multi-item nav degrades to two
 * rows instead of overflowing.
 */
export function SiteHeader({ children }: { children?: ReactNode }) {
  return (
    <header className="border-b border-line bg-surface">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 md:py-5">
        <Link href="/" className="flex items-center gap-3">
          {/* Decorative: the link's accessible name comes from the wordmark
              beside it, so an alt description here would only duplicate it. */}
          <Image
            src="/appardas-logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
          <span className="font-display text-xl font-bold lowercase tracking-tight text-ink">
            {siteConfig.name}
          </span>
        </Link>

        {children ? (
          <nav
            aria-label="Main"
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {children}
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
