import type { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { SystemsGrid } from "@/components/systems/systems-grid";
import { plannedSystems } from "@/lib/planned-systems";
import { getPrimitiveIndex } from "@/lib/registry-loader";

export const metadata: Metadata = {
  title: "Systems",
  description: "Components built as systems, not widgets.",
  alternates: { canonical: "/systems" },
};

export default function SystemsPage() {
  const built = getPrimitiveIndex();

  return (
    <PageTransition>
      <div className="flex flex-col items-center gap-10 pb-24">
        <header className="flex flex-col items-center gap-2 pt-4 text-center">
          <h1 className="text-3xl font-medium tracking-tight">Systems</h1>
          <p className="text-muted-foreground">
            Components built as systems, not widgets.
          </p>
        </header>
        <SystemsGrid built={built} planned={plannedSystems} />
      </div>
    </PageTransition>
  );
}
