import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdatesIndexPage } from "@/components/UpdatesIndexPage";
import { CATEGORIES, type Category } from "@/lib/constants";
import { formatMonthLabel, parseMonthParams } from "@/lib/filters";
import { getPaginationPaths, paginate } from "@/lib/pagination";
import { getAvailableMonths, getFilteredUpdates } from "@/lib/updates";

interface PageProps {
  params: Promise<{ category: string; year: string; month: string; page: string }>;
}

export async function generateStaticParams() {
  const params: { category: string; year: string; month: string; page: string }[] =
    [];

  for (const category of Object.keys(CATEGORIES) as Category[]) {
    for (const { year, month } of getAvailableMonths()) {
      const filters = { category, year, month };
      const totalPages = paginate(getFilteredUpdates(filters), 1).totalPages;
      for (const page of getPaginationPaths(totalPages)) {
        params.push({
          category,
          year: String(year),
          month: String(month).padStart(2, "0"),
          page: String(page),
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, year, month, page } = await params;
  const config = CATEGORIES[category as Category];
  const parsed = parseMonthParams(year, month);
  if (!config || !parsed) return {};

  return {
    title: `${config.label} — ${formatMonthLabel(parsed.year, parsed.month)} — Página ${page}`,
    description: `Actualizaciones de ${config.label} en ${formatMonthLabel(parsed.year, parsed.month)}.`,
  };
}

export default async function PaginatedCategoryMonthPage({ params }: PageProps) {
  const { category, year, month, page } = await params;
  const config = CATEGORIES[category as Category];
  const parsed = parseMonthParams(year, month);
  if (!config || !parsed) notFound();

  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

  const filters = {
    category: category as Category,
    year: parsed.year,
    month: parsed.month,
  };
  const result = paginate(getFilteredUpdates(filters), pageNum);
  if (pageNum > result.totalPages) notFound();

  return <UpdatesIndexPage filters={filters} page={pageNum} />;
}
