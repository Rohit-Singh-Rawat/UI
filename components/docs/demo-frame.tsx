"use client";

import { type ReactNode, useState } from "react";
import { CodeBlock } from "./code-block";

export function DemoFrame({
  name,
  code,
  children,
}: {
  name: string;
  code: string;
  children: ReactNode;
}) {
  const [showCode, setShowCode] = useState(false);
  return (
    <section className="overflow-hidden rounded-xl border border-border">
      <header className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">{name}</span>
        {code.length > 0 && (
          <button
            type="button"
            onClick={() => setShowCode((value) => !value)}
            className="text-xs text-muted-foreground transition-colors duration-(--motion-dur-fast) hover:text-foreground"
          >
            {showCode ? "Preview" : "Code"}
          </button>
        )}
      </header>
      {showCode ? (
        <div className="p-2">
          <CodeBlock code={code} />
        </div>
      ) : (
        <div className="flex min-h-40 items-center justify-center p-8">
          {children}
        </div>
      )}
    </section>
  );
}
