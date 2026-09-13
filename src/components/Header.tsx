"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/my-work", label: "My Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "CV / Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-ink/10 bg-bg/90 backdrop-blur-[8px]">
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.96px] text-ink"
        >
          Luigi De Giorgi
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.96px] transition-colors ${
                  isActive
                    ? "bg-ink text-bg"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-5 bg-ink transition-transform ${
                isOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-ink transition-opacity ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-5 bg-ink transition-transform ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>
    </header>

    {/* Mobile drawer overlay — rendered as a sibling of <header>, not a
        descendant: header's backdrop-blur creates a containing block for
        `fixed` descendants, which would trap this overlay to header's own
        (small) box instead of the viewport. */}
    {isOpen && (
      <div className="fixed inset-0 top-[69px] z-40 flex flex-col bg-bg md:hidden">
        <nav className="flex flex-col items-start gap-2 px-5 py-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`w-full rounded-lg px-3 py-4 font-mono text-[16px] font-medium uppercase tracking-[0.96px] ${
                  isActive ? "bg-ink text-bg" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    )}
    </>
  );
}
