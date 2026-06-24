import { CATEGORIES, type Category } from "./constants";

export interface ListFilters {
  category?: Category;
  year?: number;
  month?: number;
}

export function buildListPath(filters: ListFilters, page = 1): string {
  const { category, year, month } = filters;
  let path = "";

  if (category) {
    path = `/categoria/${category}`;
  }

  if (year && month) {
    const monthStr = String(month).padStart(2, "0");
    path = path ? `${path}/mes/${year}/${monthStr}` : `/mes/${year}/${monthStr}`;
  }

  if (!path) {
    path = "/";
  }

  if (page > 1) {
    path = path === "/" ? `/pagina/${page}` : `${path}/pagina/${page}`;
  }

  return path;
}

export function parseMonthParams(
  year: string,
  month: string
): { year: number; month: number } | null {
  const y = Number(year);
  const m = Number(month);
  if (!Number.isInteger(y) || !Number.isInteger(m) || m < 1 || m > 12) {
    return null;
  }
  return { year: y, month: m };
}

export function formatMonthLabel(year: number, month: number): string {
  const label = new Intl.DateTimeFormat("es-DO", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function getListBasePath(filters: ListFilters): string {
  return buildListPath(filters, 1);
}

export function getFilterSummary(filters: ListFilters): string {
  const moduleLabel = filters.category
    ? CATEGORIES[filters.category].label
    : "Todas las aplicaciones";
  const monthLabel =
    filters.year && filters.month
      ? formatMonthLabel(filters.year, filters.month)
      : "Todos los meses";

  return `${moduleLabel} · ${monthLabel}`;
}
