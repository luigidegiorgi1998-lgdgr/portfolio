"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnchorHTMLAttributes, ReactNode } from "react";

type ViewTransitionLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  href: string;
  children: ReactNode;
};

/**
 * Link that wraps navigation in the native View Transitions API when
 * available. Used for shared-element transitions (Home card title ->
 * My Work case study headline). Falls back to a plain client navigation
 * everywhere else.
 */
export default function ViewTransitionLink({
  href,
  children,
  onClick,
  ...rest
}: ViewTransitionLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (typeof document === "undefined" || !("startViewTransition" in document)) {
          return;
        }
        e.preventDefault();
        const target = href;
        const transition = (
          document as Document & {
            startViewTransition: (cb: () => void) => {
              ready: Promise<void>;
              finished: Promise<void>;
              updateCallbackDone: Promise<void>;
            };
          }
        ).startViewTransition(() => {
          router.push(target);
        });
        // A transition can be aborted (a second navigation starts, the target
        // has a #hash and the browser scrolls mid-transition, reduced-motion
        // skips it, etc.) — that rejection is expected, not an error, on all
        // three of its promises, so swallow each rather than letting it
        // surface as an unhandled rejection.
        transition.ready.catch(() => {});
        transition.finished.catch(() => {});
        transition.updateCallbackDone.catch(() => {});
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
