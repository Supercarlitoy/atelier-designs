"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, type PropsWithChildren } from "react";

const supportsViewTransition = () =>
  typeof document !== "undefined" && "startViewTransition" in document;

type TransitionLinkProps = PropsWithChildren<LinkProps> & {
  className?: string;
  "aria-label"?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function TransitionLink({ children, onClick, href, ...rest }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
    (event) => {
      onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0 ||
        rest.target === "_blank"
      ) {
        return;
      }

      if (!supportsViewTransition()) {
        return;
      }

      event.preventDefault();
      const navigate = () => {
        const targetHref = typeof href === "string" ? href : href.pathname ?? "/";
        router.push(targetHref);
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - startViewTransition typing not yet in libs
      document.startViewTransition(navigate);
    },
    [href, onClick, rest.target, router]
  );

  return (
    <Link {...rest} href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
