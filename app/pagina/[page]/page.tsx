import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdatesIndexPage } from "@/components/UpdatesIndexPage";
import { SITE } from "@/lib/constants";
import { getPaginationPaths, paginate } from "@/lib/pagination";
import { getFilteredUpdates } from "@/lib/updates";

interface PageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const totalPages = paginate(getFilteredUpdates({}), 1).totalPages;
  return getPaginationPaths(totalPages).map((page) => ({ page: String(page) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) return {};

  return {
    title: `Novedades — Página ${pageNum}`,
    description: SITE.description,
  };
}

export default async function PaginatedHomePage({ params }: PageProps) {
  const { page } = await params;
  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

  const result = paginate(getFilteredUpdates({}), pageNum);
  if (pageNum > result.totalPages) notFound();

  return <UpdatesIndexPage filters={{}} page={pageNum} />;
}
