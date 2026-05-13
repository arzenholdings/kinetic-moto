"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@vercel/analytics";

type TrackedLinkProps = {
  href: string;
  eventName: string;
  eventProperties?: Record<string, string | number | boolean>;
  className?: string;
  children: ReactNode;
};

export function TrackedLink({ href, eventName, eventProperties, className, children }: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        track(eventName, eventProperties);
      }}
    >
      {children}
    </Link>
  );
}
