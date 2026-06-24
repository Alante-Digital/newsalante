import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { BadgePill } from "@/components/BadgePill";
import { CategoryPill } from "@/components/CategoryPill";
import { PocketChange } from "@/components/PocketChange";
import { SiteShell } from "@/components/SiteShell";
import { UpdateImage } from "@/components/UpdateImage";
import { MDXContent } from "@/lib/mdx";
import { SITE } from "@/lib/constants";
import { hasCustomImage } from "@/lib/images";
import { formatDate, getAllSlugs, getUpdateBySlug } from "@/lib/updates";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const update = getUpdateBySlug(slug);
  if (!update) return {};

  return {
    title: update.title,
    description: update.excerpt,
    openGraph: {
      title: update.title,
      description: update.excerpt,
      type: "article",
      publishedTime: update.date,
      url: `${SITE.url}/novedades/${slug}`,
      ...(hasCustomImage(update.image) ? { images: [{ url: update.image! }] } : {}),
    },
  };
}

export default async function UpdatePage({ params }: PageProps) {
  const { slug } = await params;
  const update = getUpdateBySlug(slug);
  if (!update) notFound();

  return (
    <SiteShell>
      <article>
        {hasCustomImage(update.image) && (
          <div className="border-b border-border bg-surface">
            <div className="mx-auto max-w-4xl">
              <UpdateImage
                src={update.image!}
                alt={update.imageAlt ?? update.title}
                priority
              />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
          <Link
            href="/"
            className="text-sm font-medium text-muted transition hover:text-alante-600"
          >
            ← Todas las novedades
          </Link>

          <header className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <BadgePill badge={update.badge} />
              <CategoryPill category={update.category} linked />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {update.title}
            </h1>
            <div className="mt-6 flex items-center gap-3 border-b border-border pb-8">
              <AuthorAvatar name={update.author} />
              <div className="text-sm">
                <p className="font-medium text-foreground">Publicado por {update.author}</p>
                <p className="text-muted">
                  {formatDate(update.date)} · {update.readingMinutes} min de lectura
                </p>
              </div>
            </div>
          </header>

          <div className="prose-update mt-8">
            <MDXContent source={update.content} />
          </div>

          {update.pocketChange && update.pocketChange.length > 0 && (
            <PocketChange items={update.pocketChange} />
          )}

          <div className="mt-12 rounded-xl bg-alante-500 px-6 py-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-6">
            <p className="font-medium">
              Prueba {SITE.brand} gratis 14 días, sin tarjeta de crédito.
            </p>
            <a
              href={SITE.demoUrl}
              className="mt-4 inline-flex shrink-0 rounded-lg bg-surface px-5 py-2.5 text-sm font-semibold text-alante-700 transition hover:bg-alante-50 sm:mt-0 dark:text-alante-200 dark:hover:bg-alante-700/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              Crear cuenta gratis
            </a>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
