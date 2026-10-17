import type { ReactNode } from "react";

/**
 * Centres content and applies the page's horizontal gutter.
 *
 * The gutter is the token pair `section-x` / `section-x-lg`, which switches at
 * the md breakpoint. Sections that need to span the full width should not use
 * this component — use `max-w-content` on their own inner element instead.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-content px-section-x md:px-section-x-lg ${className}`.trim()}
    >
      {children}
    </div>
  );
}
