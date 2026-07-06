"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div aria-hidden className="h-8 w-8" />;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-xs text-muted-foreground transition-colors duration-(--motion-dur-fast) hover:text-foreground"
    >
      {resolvedTheme === "dark" ? "☾" : "☀"}
    </button>
  );
}
