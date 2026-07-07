import Link from "next/link";
import { SidebarNav } from "@/components/docs/sidebar-nav";
import { MobileNav } from "@/components/docs/mobile-nav";
import { Logo } from "@/components/logo/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { plannedSystems } from "@/lib/planned-systems";
import { getPrimitiveIndex } from "@/lib/registry-loader";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const built = getPrimitiveIndex();

  return (
    <div className="flex min-h-dvh w-full flex-col gap-4 p-4 md:flex-row">
      {/* mobile top bar */}
      <header className="flex flex-col gap-3 rounded-2xl bg-muted/20 px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="aster home" className="flex items-center">
            <Logo className="h-5 w-auto dark:invert" />
          </Link>
          <ThemeToggle />
        </div>
        {/* the sidebar is desktop-only | give mobile a way between systems */}
        <MobileNav built={built} />
      </header>

      {/* left sidebar panel */}
      <aside className="sticky top-4 hidden h-[calc(100dvh-2rem)] w-64 shrink-0 flex-col gap-6 rounded-2xl bg-muted/40 p-6 md:flex">
        <Link
          href="/"
          aria-label="aster home"
          className="flex items-center px-2 pt-1"
        >
          <Logo className="h-7 w-auto dark:invert" />
        </Link>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <SidebarNav built={built} planned={plannedSystems} />
        </div>
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </aside>

      {/* main content area */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
