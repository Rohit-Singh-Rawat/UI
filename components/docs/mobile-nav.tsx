"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav({
  built,
}: {
  built: { slug: string; title: string }[];
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Systems" className="-mx-1 overflow-x-auto">
      <ul className="flex items-center gap-1 px-1">
        <li>
          <Link
            href="/systems"
            className={`block whitespace-nowrap rounded-full px-3 py-1.5 text-xs outline-none transition-colors duration-(--motion-dur-fast) focus-visible:ring-2 focus-visible:ring-ring ${
              pathname === "/systems"
                ? "bg-foreground text-background font-medium hover:bg-foreground/85"
                : "text-foreground/75 hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            All systems
          </Link>
        </li>
        {built.map((entry) => {
          const isActive = pathname === `/systems/${entry.slug}`;
          return (
            <li key={entry.slug}>
              <Link
                href={`/systems/${entry.slug}`}
                className={`block whitespace-nowrap rounded-full px-3 py-1.5 text-xs outline-none transition-colors duration-(--motion-dur-fast) focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "bg-foreground text-background font-medium hover:bg-foreground/85"
                    : "bg-muted/40 text-foreground/75 hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                {entry.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
