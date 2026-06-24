import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdatesIndexPage } from "@/components/UpdatesIndexPage";
import { CATEGORIES, type Category } from "@/lib/constants";
import { formatMonthLabel, parseMonthParams } from "@/lib/filters";
import { getAvailableMonths } from "@/lib/updates";

interface PageProps {
  params: Promise<{ category: string; year: string; month: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const params: { category: string; year: string; month: string }[] = [];

  for (const category of Object.keys(CATEGORIES) as Category[]) {
    for (const { year, month } of getAvailableMonths()) {
      params.push({
        category,
        year: String(year),
        month: String(month).padStart(2, "0"),
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, year, month } = await params;
  const config = CATEGORIES[category as Category];
  const parsed = parseMonthParams(year, month);
  if (!config || !parsed) return {};

  return {
    title: `${config.label} — ${formatMonthLabel(parsed.year, parsed.month)}`,
    description: `Actualizaciones de ${config.label} en ${formatMonthLabel(parsed.year, parsed.month)}.`,
  };
}

export default async function CategoryMonthPage({ params }: PageProps) {
  const { category, year, month } = await params;
  const config = CATEGORIES[category as Category];
  const parsed = parseMonthParams(year, month);
  if (!config || !parsed) notFound();

  return (
    <UpdatesIndexPage
      filters={{
        category: category as Category,
        year: parsed.year,
        month: parsed.month,
      }}
      page={1}
    />
  );
}
