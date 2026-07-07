import Link from "next/link";
import type { ReactNode } from "react";

interface SystemCardProps {
  title: string;
  /** Present for built systems | the card links to its doc page. */
  href?: string;
  /**
   * The blueprint drawing. Every card is a `group`, so the blueprint morphs
   * into its implementation on hover/focus | built and planned alike; only
   * built cards additionally link to a doc page.
   */
  blueprint: ReactNode;
}

const CARD_CLASS = "rounded-2xl bg-muted/40 p-5";

export function SystemCard({ title, href, blueprint }: SystemCardProps) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="min-w-0 truncate font-mono text-xs text-foreground/80">
          {title}
        </span>
        {!href && (
          <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground/70">
            planned
          </span>
        )}
      </div>
      <div className="mt-3 flex min-h-48 items-center justify-center">
        <div className="scale-125">{blueprint}</div>
      </div>
    </>
  );

  if (!href) {
    return <div className={`group ${CARD_CLASS} opacity-80`}>{body}</div>;
  }

  return (
    <Link
      href={href}
      className={`group block ${CARD_CLASS} outline-none transition-all duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:-translate-y-[2px] hover:bg-muted/60 hover:shadow-sm hover:shadow-foreground/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:-translate-y-[2px] motion-reduce:transition-none motion-reduce:transform-none`}
    >
      {body}
    </Link>
  );
}
