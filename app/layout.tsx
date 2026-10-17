import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

import { siteConfig } from "./site.config";
import "./theme.css";
import "./globals.css";

/**
 * Fonts are self-hosted via next/font, which emits `--font-inter` and
 * `--font-space-grotesk` at build time. app/theme.css composes those into the
 * `--font-sans` / `--font-display` tokens, so components never name a font
 * family directly and there is no third-party request at runtime.
 *
 * To change the brand typeface, swap the family here and update the two token
 * declarations in app/theme.css.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.tagline,
};

/**
 * The page shell: skip link, header slot, main content area, footer.
 *
 * `flex min-h-dvh flex-col` with `flex-1` on <main> pins the footer to the
 * bottom of the viewport on short pages without pinning it over the content on
 * long ones. `min-h-screen` is kept ahead of `min-h-dvh` so browsers without
 * `dvh` support still get full-height.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-screen min-h-dvh flex-col bg-canvas font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-action focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-action-text focus:shadow-md"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
