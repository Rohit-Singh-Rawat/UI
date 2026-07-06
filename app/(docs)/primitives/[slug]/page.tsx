import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoFrame } from "@/components/docs/demo-frame";
import { InstallCommand } from "@/components/docs/install-command";
import { SourceTabs } from "@/components/docs/source-tabs";
import { demoRegistry } from "@/lib/demos";
import { getPrimitive, getPrimitiveSlugs } from "@/lib/registry-loader";

export function generateStaticParams() {
  return getPrimitiveSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const primitive = await getPrimitive(slug);
  if (!primitive) return { title: "Not found — aster" };
  return {
    title: `${primitive.title} — aster`,
    description: primitive.description,
  };
}

export default async function PrimitivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const primitive = await getPrimitive(slug);
  if (!primitive) notFound();

  const demos = demoRegistry[slug] ?? [];

  return (
    <article className="flex flex-col gap-10 pb-24">
      <header className="flex flex-col gap-3">
        {primitive.category && (
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {primitive.category}
          </p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight">
          {primitive.title}
        </h1>
        <p className="max-w-prose text-muted-foreground">
          {primitive.description}
        </p>
        <InstallCommand name={primitive.slug} />
      </header>

      {demos.map((demo) => {
        const source = primitive.demos.find((file) => file.name === demo.name);
        return (
          <DemoFrame key={demo.name} name={demo.name} code={source?.code ?? ""}>
            <demo.Component />
          </DemoFrame>
        );
      })}

      {primitive.body && <div>{primitive.body}</div>}

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Source</h2>
        <SourceTabs files={primitive.files} />
      </section>
    </article>
  );
}
