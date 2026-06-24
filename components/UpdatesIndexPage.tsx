import { FiltersSidebar } from "@/components/FiltersSidebar";
import { UpdatesList } from "@/components/UpdatesList";
import { SiteShell } from "@/components/SiteShell";
import { CATEGORIES, SITE } from "@/lib/constants";
import { formatMonthLabel, getListBasePath, type ListFilters } from "@/lib/filters";
import { paginate } from "@/lib/pagination";
import { getFilteredUpdates } from "@/lib/updates";

function getHeader(
  filters: ListFilters,
  currentPage: number,
  totalPages: number
): { eyebrow: string; title: string; subtitle?: string } {
  if (filters.category && filters.year && filters.month) {
    return {
      eyebrow: CATEGORIES[filters.category].label,
      title: formatMonthLabel(filters.year, filters.month),
      subtitle:
        currentPage > 1 ? `Página ${currentPage} de ${totalPages}` : undefined,
    };
  }

  if (filters.category) {
    return {
      eyebrow: "Aplicación",
      title: CATEGORIES[filters.category].label,
      subtitle:
        currentPage > 1 ? `Página ${currentPage} de ${totalPages}` : undefined,
    };
  }

  if (filters.year && filters.month) {
    return {
      eyebrow: "Período",
      title: formatMonthLabel(filters.year, filters.month),
      subtitle:
        currentPage > 1 ? `Página ${currentPage} de ${totalPages}` : undefined,
    };
  }

  return {
    eyebrow: "Changelog",
    title: `Novedades de ${SITE.brand}`,
    subtitle:
      currentPage > 1
        ? `Página ${currentPage} de ${totalPages}`
        : SITE.description,
  };
}

function getEmptyMessage(filters: ListFilters): string {
  if (filters.category && filters.year && filters.month) {
    return `No hay novedades de ${CATEGORIES[filters.category].label} en ${formatMonthLabel(filters.year, filters.month)}.`;
  }

  if (filters.category) {
    return `No hay novedades de ${CATEGORIES[filters.category].label} todavía.`;
  }

  if (filters.year && filters.month) {
    return `No hay novedades publicadas en ${formatMonthLabel(filters.year, filters.month)}.`;
  }

  return "No hay novedades todavía.";
}

export function UpdatesIndexPage({
  filters,
  page = 1,
}: {
  filters: ListFilters;
  page?: number;
}) {
  const result = paginate(getFilteredUpdates(filters), page);
  const header = getHeader(filters, result.currentPage, result.totalPages);
  const showFeatured =
    page === 1 && !filters.category && !filters.year && !filters.month;

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10 xl:grid-cols-[240px_1fr]">
          <div className="mb-5 lg:mb-0">
            <FiltersSidebar filters={filters} />
          </div>

          <div className="min-w-0">
            <header className="mb-8">
              <p className="text-sm font-semibold tracking-wide text-alante-600 uppercase">
                {header.eyebrow}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {header.title}
              </h1>
              {header.subtitle && (
                <p className="mt-3 text-lg text-muted">{header.subtitle}</p>
              )}
            </header>

            <UpdatesList
              updates={result.items}
              currentPage={result.currentPage}
              totalPages={result.totalPages}
              paginationBasePath={getListBasePath(filters)}
              showFeatured={showFeatured}
              emptyMessage={getEmptyMessage(filters)}
            />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
