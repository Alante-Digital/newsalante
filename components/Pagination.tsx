import Link from "next/link";
import { getListPagePath } from "@/lib/pagination";

export function Pagination({
  currentPage,
  totalPages,
  basePath = "",
}: {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-6 border-t border-border pt-8"
      aria-label="Paginación"
    >
      {prevPage ? (
        <Link
          href={getListPagePath(basePath, prevPage)}
          className="text-sm font-medium text-muted transition hover:text-alante-600"
        >
          ‹ Anterior
        </Link>
      ) : (
        <span className="text-sm text-border">‹ Anterior</span>
      )}

      <span className="text-sm font-medium text-foreground">
        {currentPage} de {totalPages}
      </span>

      {nextPage ? (
        <Link
          href={getListPagePath(basePath, nextPage)}
          className="text-sm font-medium text-muted transition hover:text-alante-600"
        >
          Siguiente ›
        </Link>
      ) : (
        <span className="text-sm text-border">Siguiente ›</span>
      )}
    </nav>
  );
}
