import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdatesIndexPage } from "@/components/UpdatesIndexPage";
import { CATEGORIES, type Category } from "@/lib/constants";
import { getPaginationPaths, paginate } from "@/lib/pagination";
import { getFilteredUpdates } from "@/lib/updates";

interface PageProps {
  params: Promise<{ category: string; page: string }>;
}

export async function generateStaticParams() {
  const params: { category: string; page: string }[] = [];

  for (const category of Object.keys(CATEGORIES)) {
    const filters = { category: category as Category };
    const totalPages = paginate(getFilteredUpdates(filters), 1).totalPages;
    for (const page of getPaginationPaths(totalPages)) {
      params.push({ category, page: String(page) });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, page } = await params;
  const config = CATEGORIES[category as Category];
  if (!config) return {};

  return {
    title: `${config.label} — Página ${page}`,
    description: `Últimas actualizaciones de ${config.label} en Alante Digital.`,
  };
}

export default async function PaginatedCategoryPage({ params }: PageProps) {
  const { category, page } = await params;
  const config = CATEGORIES[category as Category];
  if (!config) notFound();

  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

  const filters = { category: category as Category };
  const result = paginate(getFilteredUpdates(filters), pageNum);
  if (pageNum > result.totalPages) notFound();

  return <UpdatesIndexPage filters={filters} page={pageNum} />;
}
