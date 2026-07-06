import Link from "next/link";
import { Logo } from "@/components/logo/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { getPrimitiveIndex } from "@/lib/registry-loader";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const primitives = getPrimitiveIndex();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6">
      <header className="flex items-center justify-between py-5">
        <Link href="/" aria-label="aster home" className="flex items-center">
          <Logo className="h-6 w-auto dark:invert" />
        </Link>
        <ThemeToggle />
      </header>
      <div className="flex flex-1 gap-10 py-10">
        <aside className="hidden w-44 shrink-0 md:block">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Primitives
          </p>
          <nav className="flex flex-col gap-1">
            {primitives.map((primitive) => (
              <Link
                key={primitive.slug}
                href={`/primitives/${primitive.slug}`}
                className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors duration-(--motion-dur-fast) hover:text-foreground"
              >
                {primitive.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
