import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdatesIndexPage } from "@/components/UpdatesIndexPage";
import { formatMonthLabel, parseMonthParams } from "@/lib/filters";
import { getPaginationPaths, paginate } from "@/lib/pagination";
import { getAvailableMonths, getFilteredUpdates } from "@/lib/updates";

interface PageProps {
  params: Promise<{ year: string; month: string; page: string }>;
}

export async function generateStaticParams() {
  const params: { year: string; month: string; page: string }[] = [];

  for (const { year, month } of getAvailableMonths()) {
    const filters = { year, month };
    const totalPages = paginate(getFilteredUpdates(filters), 1).totalPages;
    for (const page of getPaginationPaths(totalPages)) {
      params.push({
        year: String(year),
        month: String(month).padStart(2, "0"),
        page: String(page),
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, month, page } = await params;
  const parsed = parseMonthParams(year, month);
  if (!parsed) return {};

  return {
    title: `${formatMonthLabel(parsed.year, parsed.month)} — Página ${page}`,
    description: `Actualizaciones de Alante Digital publicadas en ${formatMonthLabel(parsed.year, parsed.month)}.`,
  };
}

export default async function PaginatedMonthPage({ params }: PageProps) {
  const { year, month, page } = await params;
  const parsed = parseMonthParams(year, month);
  if (!parsed) notFound();

  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

  const filters = { year: parsed.year, month: parsed.month };
  const result = paginate(getFilteredUpdates(filters), pageNum);
  if (pageNum > result.totalPages) notFound();

  return <UpdatesIndexPage filters={filters} page={pageNum} />;
}
