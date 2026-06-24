import type { UpdateMeta } from "./updates";

export const POSTS_PER_PAGE = 12;

export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export function paginate<T>(items: T[], page: number): PaginatedResult<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;

  return {
    items: items.slice(start, start + POSTS_PER_PAGE),
    currentPage,
    totalPages,
    totalItems,
  };
}

export function getPaginationPaths(totalPages: number): number[] {
  if (totalPages <= 1) return [];
  return Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
}

/** Ruta de listado: página 1 = basePath, página 2+ = basePath/pagina/n */
export function getListPagePath(basePath: string, page: number): string {
  const base = basePath || "/";
  if (page <= 1) return base;
  const prefix = base === "/" ? "" : base;
  return `${prefix}/pagina/${page}`;
}

export type PaginatedUpdates = PaginatedResult<UpdateMeta>;
