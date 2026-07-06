import type { Metadata } from "next";
import Link from "next/link";
import { getPrimitiveIndex } from "@/lib/registry-loader";

export const metadata: Metadata = {
  title: "Primitives — aster",
};

export default function PrimitivesPage() {
  const primitives = getPrimitiveIndex();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">Primitives</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {primitives.map((primitive) => (
          <Link
            key={primitive.slug}
            href={`/primitives/${primitive.slug}`}
            className="rounded-xl border border-border p-5 transition-colors duration-(--motion-dur-fast) hover:bg-muted/50"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {primitive.category ?? "primitive"}
            </p>
            <h2 className="mt-2 text-lg font-semibold">{primitive.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {primitive.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
