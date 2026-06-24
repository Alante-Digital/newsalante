import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdatesIndexPage } from "@/components/UpdatesIndexPage";
import { CATEGORIES, type Category } from "@/lib/constants";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const config = CATEGORIES[category as Category];
  if (!config) return {};

  return {
    title: `Novedades de ${config.label}`,
    description: `Últimas actualizaciones de ${config.label} en Alante Digital.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const config = CATEGORIES[category as Category];
  if (!config) notFound();

  const filters = { category: category as Category };

  return <UpdatesIndexPage filters={filters} page={1} />;
}
