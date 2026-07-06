import Link from "next/link";
import { Logo } from "@/components/logo/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <Link href="/" aria-label="aster home" className="flex items-center">
          <Logo className="h-6 w-auto dark:invert" />
        </Link>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-24 text-center">
        <Logo className="h-24 w-auto dark:invert sm:h-32" />
        <p className="max-w-md text-balance text-muted-foreground">
          Components are easy to copy. Interaction isn&apos;t. Every primitive
          engineered as a system — motion, accessibility, and feel treated as
          first-class.
        </p>
        <Link
          href="/primitives"
          className="rounded-full bg-foreground px-6 py-2.5 font-medium text-background text-sm transition-colors duration-(--motion-dur-fast) hover:bg-foreground/85"
        >
          Explore primitives
        </Link>
      </main>
    </div>
  );
}
