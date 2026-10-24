"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

import { siteConfig } from "@/app/site.config";
import { Container } from "./Container";

interface NavItem {
  readonly label: string;
  /** Route plus section anchor, e.g. "/services#services". */
  readonly href: string;
}

// Each section lives on its own page, so nav links route to the page and
// target the section anchor on it (the "#" is kept for deep-link scrolling).
const NAV_ITEMS: readonly NavItem[] = [
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/services#services" },
  { label: "Meet the Team", href: "/team#team" },
  { label: "Contact Us", href: "/contact#contact" },
];

/** Section anchor of a nav href ("#..."), or "" if it has none. */
const anchorOf = (href: string): string => href.split("#")[1] ?? "";

/** Route part of a nav href (everything before "#"). */
const routeOf = (href: string): string => href.split("#")[0];

/**
 * Sticky Page Header with Section Anchor Navigation (LP-04).
 *
 * Provides:
 * - Sticky top positioning with zero layout shift on load.
 * - Section anchor links for single-page table-of-contents navigation.
 * - IntersectionObserver scrollspy highlighting the active section link.
 * - Accessible mobile disclosure menu:
 *   - aria-expanded and descriptive aria-label on the toggle.
 *   - Dismisses on mouse/touch click, anchor link activation, or Escape key.
 *   - Auto-resets if viewport expands to tablet/desktop (md) breakpoint.
 */
export function SiteHeader({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Scrollspy: update active link as sections intersect near the top.
  // Re-runs on route change because every page renders a different section.
  useEffect(() => {
    setActiveSection(window.location.hash.slice(1));

    const sectionIds = NAV_ITEMS.map((item) => anchorOf(item.href));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          // Sort by intersection ratio to pick the section with greatest prominence
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Keyboard accessibility: close mobile menu when pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Viewport resize guard: close mobile drawer when crossing into desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick =
    (item: { readonly href: string }) =>
    (event: MouseEvent<HTMLAnchorElement>) => {
      setIsOpen(false);
      setActiveSection(anchorOf(item.href));

      // When already on the target route with the same hash, the browser
      // performs no scroll; re-scroll to the section so repeat clicks work.
      if (
        pathname === routeOf(item.href) &&
        window.location.hash === `#${anchorOf(item.href)}`
      ) {
        event.preventDefault();
        document
          .getElementById(anchorOf(item.href))
          ?.scrollIntoView({ behavior: "smooth" });
      }
    };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <Container className="flex items-center justify-between py-4 md:py-5">
        {/* Brand Wordmark & Emblem */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          {/* Decorative: accessible name comes from the wordmark text beside it */}
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

        {/* Custom nav slot override if children passed; otherwise default LP-04 nav */}
        {children ? (
          <nav
            aria-label="Main"
            className="hidden md:flex md:items-center md:gap-x-6"
          >
            {children}
          </nav>
        ) : (
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav
              aria-label="Main"
              className="hidden md:flex md:items-center md:gap-x-8"
            >
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === routeOf(item.href) &&
                  activeSection === anchorOf(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick(item)}
                    className={`text-sm transition-colors ${
                      isActive
                        ? "font-semibold text-link"
                        : "font-medium text-ink-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Desktop Contact CTA Button */}
              <Link
                href="/contact#contact"
                onClick={handleNavClick({ href: "/contact#contact" })}
                className="focus-ring-inset rounded-md bg-action px-4 py-2 text-sm font-semibold text-action-text shadow-sm transition-colors hover:bg-action-hover"
              >
                Get in Touch
              </Link>
            </nav>

            {/* Mobile Hamburger / Dismiss Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
              className="inline-flex items-center justify-center rounded-md p-2 text-ink transition-colors hover:bg-surface-muted md:hidden"
            >
              {isOpen ? (
                // Dismiss icon (X)
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        )}
      </Container>

      {/* Mobile Drawer Menu (Collapses below md breakpoint) */}
      {isOpen && !children ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-surface md:hidden"
        >
          <Container className="flex flex-col gap-y-3 py-4">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === routeOf(item.href) &&
                activeSection === anchorOf(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick(item)}
                  className={`rounded-md px-3 py-2 text-base transition-colors ${
                    isActive
                      ? "bg-surface-muted font-semibold text-link"
                      : "font-medium text-ink hover:bg-surface-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-2 border-t border-line pt-3">
              <Link
                href="/contact#contact"
                onClick={handleNavClick({ href: "/contact#contact" })}
                className="focus-ring-inset block w-full rounded-md bg-action px-4 py-2.5 text-center text-sm font-semibold text-action-text shadow-sm transition-colors hover:bg-action-hover"
              >
                Get in Touch
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
