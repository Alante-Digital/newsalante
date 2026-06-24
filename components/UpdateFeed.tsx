import Link from "next/link";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { BadgePill } from "@/components/BadgePill";
import { CategoryPill } from "@/components/CategoryPill";
import { UpdateImage } from "@/components/UpdateImage";
import { getUpdateImageSrc } from "@/lib/images";
import { formatDate, type UpdateMeta } from "@/lib/updates";

function UpdateCard({
  update,
  featured = false,
  priority = false,
}: {
  update: UpdateMeta;
  featured?: boolean;
  priority?: boolean;
}) {
  const imageSrc = getUpdateImageSrc(update.image);
  const imageAlt = update.imageAlt ?? update.title;

  if (featured) {
    return (
      <article className="overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border">
        <div className="grid md:grid-cols-2 md:items-stretch">
          <Link
            href={`/novedades/${update.slug}`}
            className="relative block h-full min-h-[220px] overflow-hidden bg-image-bg"
          >
            <UpdateImage src={imageSrc} alt={imageAlt} priority={priority} fill />
          </Link>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <BadgePill badge={update.badge} />
              <CategoryPill category={update.category} linked />
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <Link href={`/novedades/${update.slug}`} className="transition hover:text-alante-600">
                {update.title}
              </Link>
            </h2>
            <p className="mt-4 line-clamp-4 text-base leading-7 text-muted">{update.excerpt}</p>
            <div className="mt-6 flex items-center gap-3">
              <AuthorAvatar name={update.author} />
              <div className="text-sm">
                <p className="font-medium text-foreground">{update.author}</p>
                <time dateTime={update.date} className="text-muted">
                  {formatDate(update.date)}
                </time>
              </div>
            </div>
            <Link
              href={`/novedades/${update.slug}`}
              className="mt-6 inline-flex text-sm font-semibold text-alante-600 transition hover:text-alante-700"
            >
              Leer novedad →
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border transition hover:shadow-md">
      <Link href={`/novedades/${update.slug}`} className="block">
        <UpdateImage src={imageSrc} alt={imageAlt} priority={priority} />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <BadgePill badge={update.badge} />
          <CategoryPill category={update.category} linked />
        </div>
        <h2 className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          <Link href={`/novedades/${update.slug}`} className="transition hover:text-alante-600">
            {update.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 flex-1 text-base leading-7 text-muted">{update.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AuthorAvatar name={update.author} />
            <div className="text-sm">
              <p className="font-medium text-foreground">{update.author}</p>
              <time dateTime={update.date} className="text-muted">
                {formatDate(update.date)}
              </time>
            </div>
          </div>
          <Link
            href={`/novedades/${update.slug}`}
            className="shrink-0 text-sm font-semibold text-alante-600 transition hover:text-alante-700"
          >
            Leer más
          </Link>
        </div>
      </div>
    </article>
  );
}

export function UpdateFeed({
  updates,
  showFeatured = true,
  emptyMessage = "No hay novedades en esta categoría todavía.",
}: {
  updates: UpdateMeta[];
  showFeatured?: boolean;
  emptyMessage?: string;
}) {
  if (updates.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
        <p className="text-muted">{emptyMessage}</p>
      </div>
    );
  }

  if (showFeatured) {
    const [featured, ...rest] = updates;
    return (
      <div className="space-y-6">
        <UpdateCard update={featured} featured priority />
        {rest.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((update) => (
              <UpdateCard key={update.slug} update={update} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {updates.map((update) => (
        <UpdateCard key={update.slug} update={update} />
      ))}
    </div>
  );
}
