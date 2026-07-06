"use client";

import { useEffect, useRef, useState } from "react";

export function InstallCommand({ name }: { name: string }) {
  const command = `bunx shadcn@latest add @aster/${name}`;
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 self-start rounded-lg border border-border bg-muted px-3 py-2 font-mono text-xs">
      <span>{command}</span>
      <button
        type="button"
        aria-label="Copy install command"
        onClick={async () => {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setCopied(false), 1500);
        }}
        className="text-muted-foreground transition-colors duration-(--motion-dur-fast) hover:text-foreground"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
